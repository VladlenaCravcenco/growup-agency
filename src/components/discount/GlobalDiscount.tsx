import {
  component$,
  useSignal,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';

const WEBHOOK_URL =
  'https://hook.eu1.make.com/2e67noqsch8igp0kb6jsna02fnlpxf97';

/**
 * Маски телефонов по коду страны
 */
const PHONE_MASKS: Record<string, string> = {
  '+373': '+373 (XX) XXX-XXX',    // Молдова
  '+40': '+40 (XXX) XXX-XXX',     // Румыния
  '+380': '+380 (XX) XXX-XX-XX',  // Украина
};

/**
 * Накладываем маску на цифры (без кода страны)
 */
function applyMaskToLocalDigits(localDigits: string, mask: string): string {
  let i = 0;
  let res = '';

  for (const ch of mask) {
    if (ch === 'X') {
      res += localDigits[i] ?? '';
      i++;
    } else {
      res += ch;
    }
  }

  return res;
}

/**
 * Подготовка телефона:
 * - чистим ввод
 * - определяем код страны
 * - накладываем нужную маску
 * Возвращаем:
 *   view — то, что показываем в инпуте
 *   raw  — только цифры (для отправки в Notion)
 */
function formatPhone(value: string): { view: string; raw: string } {
  // оставляем только цифры и плюс
  let v = value.replace(/[^\d+]/g, '');

  // если начали без "+", добавим
  if (v && v[0] !== '+') v = '+' + v;

  // только цифры (без плюса)
  const digitsOnly = v.replace(/\D/g, '');

  // определяем код страны
  let code = '';
  if (digitsOnly.startsWith('373')) code = '+373';
  else if (digitsOnly.startsWith('40')) code = '+40';
  else if (digitsOnly.startsWith('380')) code = '+380';

  let view = v;

  if (code) {
    const mask = PHONE_MASKS[code];
    const codeDigitsLen = code.replace('+', '').length;
    const localDigits = digitsOnly.slice(codeDigitsLen); // цифры после кода
    view = applyMaskToLocalDigits(localDigits, mask);
  }

  return { view, raw: digitsOnly };
}

export const GlobalDiscount = component$(() => {
  const show = useSignal(false);
  const sending = useSignal(false);
  const sent = useSignal(false);
  const phoneRaw = useSignal('');   // только цифры
  const phoneView = useSignal('');  // отформатированная строка

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

  // Таймер + реакция на "подарочек"
  useVisibleTask$(() => {
    if (typeof window === 'undefined') return;

    const closed = window.localStorage.getItem('growup_discount_closed');

    let timerId: number | undefined;
    if (!closed) {
      timerId = window.setTimeout(() => {
        open$();
      }, 15000); // можно временно ставить 2000 для теста
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
    const service = String(formData.get('service') ?? '').trim();

    // Берём именно "сырые" цифры, а не маску
    const phone = phoneRaw.value.trim();

    if (!name || !phone) {
      sending.value = false;
      return;
    }

    let page = '';
    if (typeof window !== 'undefined') {
      page = window.location.pathname;
    }

    try {
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
          discount: '10%',
          page,
          comment: 'Скидка 10% на первый заказ',
        }),
      });
      sent.value = true;
      form.reset();
      phoneView.value = '';
      phoneRaw.value = '';
      close$();
    } catch (e) {
      console.error('Discount form send error', e);
    } finally {
      sending.value = false;
    }
  });

  // Обработчик ввода телефона
  const handlePhoneInput$ = $((event: Event) => {
    const input = event.target as HTMLInputElement;
    const { view, raw } = formatPhone(input.value);

    input.value = view;
    phoneView.value = view;
    phoneRaw.value = raw;
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

            <div class="discount-headline">10%</div>
            <p class="discount-subtitle">Для твоего первого заказа!</p>

            <form
              class="modal-form"
              preventdefault:submit
              onSubmit$={handleSubmit$}
            >
              <label class="modal-form__field">
                <span class="modal-form__label">Услуга</span>
                <select class="modal-form__select" name="service">
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
                  required
                />
              </label>

              <label class="modal-form__field">
                <span class="modal-form__label">Телефон</span>
                <input
                  class="modal-form__input"
                  type="tel"
                  name="phone"
                  placeholder="+373 (__) ___-___"
                  value={phoneView.value}
                  onInput$={handlePhoneInput$}
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