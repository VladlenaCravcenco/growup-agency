import {
  component$,
  useSignal,
  useVisibleTask$,
  $
} from '@builder.io/qwik';

export const GlobalDiscount = component$(() => {
  const show = useSignal(false);

  // ОТКРЫТЬ попап
  const open$ = $(() => {
    show.value = true;
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('growup_discount_closed');
    }
  });

  // ЗАКРЫТЬ попап
  const close$ = $(() => {
    show.value = false;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('growup_discount_closed', '1');
    }
  });

  // Таймер + слушатель "подарочка"
  useVisibleTask$(() => {
    if (typeof window === 'undefined') return;

    const closed = window.localStorage.getItem('growup_discount_closed');

    // авто-показ через 2 секунды, если ещё не закрывали
    let timerId: number | undefined;
    if (!closed) {
      timerId = window.setTimeout(() => {
        open$();
      }, 2000); // тут можно поставить 15000 для 15 сек и т.д.
    }

    // подарочек: по кастомному событию открываем снова
    const handler = () => open$();
    window.addEventListener('growup-open-discount', handler);

    // cleanup
    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener('growup-open-discount', handler);
    };
  });

  return (
    <>
      {show.value && (
        <div class="modal">
          <div class="modal__backdrop" onClick$={close$} />
          <div class="modal__card modal__card--narrow">
            <button class="modal__close" type="button" onClick$={close$}>
              ✕
            </button>

            <div class="discount-headline">50%</div>
            <p class="discount-subtitle">Для твоего первого заказа!</p>

            <form class="modal-form" preventdefault:submit>
              <label class="modal-form__field">
                <span class="modal-form__label">Ваше имя</span>
                <input
                  class="modal-form__input"
                  type="text"
                  name="name"
                  placeholder="Введите имя"
                />
              </label>

              <label class="modal-form__field">
                <span class="modal-form__label">Телефон</span>
                <input
                  class="modal-form__input"
                  type="tel"
                  name="phone"
                  placeholder="+373 (__) ___-____"
                />
              </label>

              <button class="btn btn--primary modal-form__submit" type="submit">
                Забрать скидку
              </button>
            </form>

            <button
              type="button"
              class="discount-link"
              onClick$={close$}
            >
              мне не нужна скидка
            </button>
          </div>
        </div>
      )}
    </>
  );
});