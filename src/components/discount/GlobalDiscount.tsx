// src/components/discount/GlobalDiscount.tsx
import {
  component$,
  useSignal,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const MAKE_WEBHOOK_URL =
  'https://hook.eu1.make.com/2e67noqsch8igp0kb6jsna02fnlpxf97';

export const GlobalDiscount = component$(() => {
  const show = useSignal(false);
  const name = useSignal('');
  const phone = useSignal('');
  const service = useSignal('Paid Ads');
  const isSubmitting = useSignal(false);
  const isSubmitted = useSignal(false);

  const loc = useLocation();

  const open$ = $(() => {
    show.value = true;
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('growup_discount_closed');
    }
  });

  const close$ = $(() => {
    show.value = false;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('growup_discount_closed', '1');
    }
  });

  const handleSubmit$ = $(async () => {
    if (!name.value || !phone.value) return;
    isSubmitting.value = true;
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value,
          phone: phone.value,
          service: service.value,
          source: 'popup_discount',
          discount: '50%',
          page: loc.url.pathname,
          comment: 'Скидка 50% из глобальной модалки',
        }),
      });

      isSubmitted.value = true;
      name.value = '';
      phone.value = '';
    } catch (err) {
      console.error('Error sending discount lead', err);
    } finally {
      isSubmitting.value = false;
    }
  });

  // Таймер + слушатель события "growup-open-discount"
  useVisibleTask$(() => {
    if (typeof window === 'undefined') return;

    // если уже закрыли раньше — не показываем авто
    if (window.localStorage.getItem('growup_discount_closed')) return;

    const timer = window.setTimeout(() => {
      show.value = true;
    }, 2000); // 8 секунд на любом экране

    const handler = (event: Event) => {
      // можно, если нужно, смотреть detail у кастомного события
      show.value = true;
    };

    window.addEventListener('growup-open-discount', handler);

    return () => {
      clearTimeout(timer);
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

            <form
              class="modal-form"
              preventdefault:submit
              onSubmit$={handleSubmit$}
            >
              <label class="modal-form__field">
                <span class="modal-form__label">Тип услуги</span>
                <select
                  class="modal-form__select"
                  bind:value={service}
                >
                  <option value="Paid Ads">Платная реклама</option>
                  <option value="SMM">SMM</option>
                  <option value="Branding">Branding</option>
                  <option value="Web">Web development</option>
                </select>
              </label>

              <label class="modal-form__field">
                <span class="modal-form__label">Ваше имя</span>
                <input
                  class="modal-form__input"
                  type="text"
                  name="name"
                  placeholder="Введите имя"
                  bind:value={name}
                />
              </label>

              <label class="modal-form__field">
                <span class="modal-form__label">Телефон</span>
                <input
                  class="modal-form__input"
                  type="tel"
                  name="phone"
                  placeholder="+373 (__) ___-____"
                  bind:value={phone}
                />
              </label>

              <button
                class="btn btn--primary modal-form__submit"
                type="submit"
                disabled={isSubmitting.value}
              >
                {isSubmitting.value ? 'Отправляем...' : 'Забрать скидку'}
              </button>

              {isSubmitted.value && (
                <p class="discount-success">
                  Заявка отправлена 💌 Мы свяжемся с вами в течение рабочего дня.
                </p>
              )}
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