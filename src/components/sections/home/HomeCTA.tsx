import { component$, useStore, $ } from '@builder.io/qwik';

export const HomeCTA = component$(() => {
  const form = useStore({
    name: '',
    contact: '',
    sent: false,
  });

  const handleSubmit = $( (event: Event) => {
    event.preventDefault();
    // Тут потом подключим реальный обработчик (EmailJS, API и т.д.)
    form.sent = true;
  });

  return (
    <section class="cta" id="consult">
      <div class="cta__inner">
        <h2 class="section-title section-title--center">Бесплатная консультация</h2>
        <p class="section-subtitle section-subtitle--center">
          Заполните форму, и мы предложим стратегию под ваши задачи и бюджет.
        </p>

        <form class="cta__form" onSubmit$={handleSubmit}>
          <div class="cta__fields">
            <input
              class="cta__input"
              type="text"
              placeholder="Как вас зовут?"
              value={form.name}
              onInput$={(e) => (form.name = (e.target as HTMLInputElement).value)}
              required
            />
            <input
              class="cta__input"
              type="text"
              placeholder="+373 (__) ___-___ или email"
              value={form.contact}
              onInput$={(e) => (form.contact = (e.target as HTMLInputElement).value)}
              required
            />
          </div>
          <button class="btn btn--primary" type="submit">
            Отправить
          </button>
        </form>

        <p class="cta__note">
          Мы свяжемся с вами в течение 24 часов.
        </p>

        {form.sent && (
          <p class="cta__success">
            Заявка отправлена. Спасибо! Мы скоро с вами свяжемся.
          </p>
        )}
      </div>
    </section>
  );
});