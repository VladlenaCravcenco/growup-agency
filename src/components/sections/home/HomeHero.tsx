import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import '../../../styles/home.css'

export const HomeHero = component$(() => {
  const ready = useSignal(false);

  useVisibleTask$(() => {
    // грузим spline-viewer один раз
    if (!customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src =
        'https://unpkg.com/@splinetool/viewer@1.12.28/build/spline-viewer.js';
      document.head.appendChild(script);
    }

  });

  return (
    <section class={`hero ${ready.value ? 'is-ready' : ''}`}>
      <div class="hero__bg" aria-hidden="true">
        <spline-viewer url="https://prod.spline.design/9O71k9-PdFCjz4QQ/scene.splinecode"
         render-fps="30"></spline-viewer>
      </div>

      <div class="hero__overlay" aria-hidden="true"></div>

      <div class="hero__inner">
        <div class="hero__content">
          <h1 class="visually-hidden">Performance Marketing</h1>
          <p class="visually-hidden">Рост и развитие вашего бизнеса.</p>
          <p class="visually-hidden">
            Разрабатываем эффективные стратегии масштабирования бизнеса с использованием
            инструментов перформанс-маркетинга.
          </p>

          <div class="hero__actions">
            <a href="/contact" class="btn btn--primary">
              Получить предложение
            </a>
            <a href="/projects" class="btn btn--ghost">
              Посмотреть кейсы
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});