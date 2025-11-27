import { component$ } from '@builder.io/qwik';

export const HomeProcess = component$(() => {
  const steps = [
    {
      title: 'Диагностика и стратегия',
      text: 'Разбираем вашу нишу, аудитории и текущие точки входа. Формируем стратегию и медиаплан под цели бизнеса.',
    },
    {
      title: 'Запуск кампаний',
      text: 'Собираем рекламные связки, настраиваем отслеживание, запускаем тестовые кампании и первые гипотезы.',
    },
    {
      title: 'Оптимизация и масштабирование',
      text: 'Отсекаем слабые связки, усиливаем сильные. Масштабируем то, что приносит заявки и продажи с нужной экономикой.',
    },
    {
      title: 'Отчётность и развитие',
      text: 'Регулярно показываем цифры и инсайты, предлагаем новые точки роста: продукты, воронки, креативы.',
    },
  ];

  return (
    <section class="process">
      <div class="process__inner">
        <h2 class="section-title">Как мы работаем</h2>

        <div class="process__list">
          {steps.map((step, index) => (
            <div class="process__item" key={step.title}>
              <div class="process__number">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>
              <div class="process__content">
                <h3 class="process__title">{step.title}</h3>
                <p class="process__text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});