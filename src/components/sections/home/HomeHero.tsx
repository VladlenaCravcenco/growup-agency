import { component$ } from '@builder.io/qwik';


export const HomeHero = component$(() => {
  return (
    <section class="hero">
      <div class="hero__inner">
        <div class="hero__content">
          <h1 class="hero__title">Performance Marketing</h1>
          <p class="hero__subtitle">Рост и развитие вашего бизнеса.</p>
          <p class="hero__text">
            Разрабатываем эффективные стратегии масштабирования бизнеса с использованием
            инструментов перформанс-маркетинга.
          </p>
          <div class="hero__actions">
            <a href="#consult" class="btn btn--primary">Получить предложение</a>
            <a href="/portfolio" class="btn btn--ghost">Посмотреть кейсы</a>
          </div>
        </div>

        <div class="hero__visual">
          {/* здесь потом 3D-шэйп / картинка */}
        </div>
      </div>
    </section>
  );
});