import { component$, useStore, $ } from '@builder.io/qwik';

export const HomeCTA = component$(() => {
  const form = useStore({
    name: '',
    phone: '',
    email: '',
    sent: false,
    error: '',
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    // простая валидация: имя + хотя бы один способ связи
    if (!name || (!phone && !email)) {
      form.error = 'Введите имя и хотя бы телефон или email';
      form.sent = false;
      return;
    }

    let page = '';
    if (typeof window !== 'undefined') {
      page = window.location.pathname;
    }

    try {
      form.error = '';
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          page,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        form.error =
          (data as any)?.error || 'Ошибка при отправке. Попробуйте ещё раз.';
        form.sent = false;
        return;
      }

      form.sent = true;
      form.name = '';
      form.phone = '';
      form.email = '';
      target.reset();
    } catch {
      form.error = 'Сервер недоступен. Попробуйте ещё раз позже.';
      form.sent = false;
    }
  });

  return (
    <section class="cta" id="consult">
      <div class="cta__inner">
        <h2 class="section-title section-title--center">
          Бесплатная консультация
        </h2>
        <p class="section-subtitle section-subtitle--center">
          Заполните форму, и мы предложим стратегию под ваши задачи и бюджет.
        </p>

        <form class="cta__form" onSubmit$={handleSubmit}>
          <div class="cta__fields">
            <input
              class="cta__input"
              type="text"
              name="name"
              placeholder="Как вас зовут?"
              value={form.name}
              onInput$={(e) =>
                (form.name = (e.target as HTMLInputElement).value)
              }
              required
            />
            <input
              class="cta__input"
              type="text"
              name="phone"
              placeholder="+373 (__) ___-___ (телефон)"
              value={form.phone}
              onInput$={(e) =>
                (form.phone = (e.target as HTMLInputElement).value)
              }
            />
            <input
              class="cta__input"
              type="email"
              name="email"
              placeholder="name@company.com (email)"
              value={form.email}
              onInput$={(e) =>
                (form.email = (e.target as HTMLInputElement).value)
              }
            />
          </div>

          <button class="btn btn--primary" type="submit">
            Отправить
          </button>
        </form>

        <p class="cta__note">
          Мы свяжемся с вами в течение 24 часов в рабочие дни.
        </p>

        {form.error && (
          <p class="cta__message cta__message--error">{form.error}</p>
        )}

        {form.sent && !form.error && (
          <p class="cta__message cta__message--success">
            Заявка отправлена. Спасибо! Мы скоро с вами свяжемся.
          </p>
        )}
      </div>
    </section>
  );
});