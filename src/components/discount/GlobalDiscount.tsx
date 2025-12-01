import {
  component$,
  useSignal,
  useVisibleTask$,
  $
} from '@builder.io/qwik';

const WEBHOOK_URL =
  'https://hook.eu1.make.com/2e67noqsch8igp0kb6jsna02fnlpxf97';

export const GlobalDiscount = component$(() => {
  const show = useSignal(false);
  const sending = useSignal(false);
  const sent = useSignal(false);

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

  // Таймер + подарочек
  useVisibleTask$(() => {
    if (typeof window === 'undefined') return;

    const closed = window.localStorage.getItem('growup_discount_closed');

    let timerId: number | undefined;
    if (!closed) {
      timerId = window.setTimeout(() => {
        open$();
      }, 2000); // потом можно вернуть 15_000
    }

    const handler = () => open$();
    window.addEventListener('growup-open-discount', handler);

    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener('growup-open-discount', handler);
    };
  });

  // Отправка формы в Make → Notion
  const handleSubmit$ = $(async (_event: SubmitEvent, form: HTMLFormElement) => {
    if (sending.value) return;
    sending.value = true;
    sent.value = false;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();

    if (!name || !phone) {
      sending.value = false;
      return;
    }

    let page = '';
    if (typeof window !== 'undefined') {
      page = window.location.pathname;
    }

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        service,
        source: 'discount_popup',
        discount: '50%',
        page,
        comment: 'Скидка 50% на первый заказ',
      }),
    }).catch(() => {});

    sending.value = false;
    sent.value = true;
    form.reset();
    close$();
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

            <form
              class="modal-form"
              preventdefault:submit
              onSubmit$={handleSubmit$}
            >
              <label class="modal-form__field">
                <span class="modal-form__label">Услуга</span>
                <select
                  class="modal-form__select"
                  name="service"
                >
                  <option value="Paid Ads">Платная реклама</option>
                  <option value="SMM">Social Media Marketing</option>
                  <option value="Branding">Branding</option>
                  <option value="WEB">WEB-разработка</option>
                </select>
              </label>

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

              <button
                class="btn btn--primary modal-form__submit"
                type="submit"
                disabled={sending.value}
              >
                {sending.value ? 'Отправляем…' : 'Забрать скидку'}
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