import { component$ } from '@builder.io/qwik';

export const HomeServices = component$(() => {
  const services = [
    {
      tag: 'Performance',
      title: 'Платная реклама',
      bullets: [
        'Стратегия и медиаплан',
        'Запуск и оптимизация кампаний',
        'Масштабирование прибыльных связок',
      ],
    },
    {
      tag: 'Social Media',
      title: 'SMM',
      bullets: [
        'Контент-стратегия и визуал',
        'Ведение аккаунтов и сторис',
        'Рекламные интеграции и спецпроекты',
      ],
    },
    {
      tag: 'Branding & Creative',
      title: 'Дизайн',
      bullets: [
        'Айдентика и соцсети',
        'Креативы для рекламы',
        'Лендинги и посадочные страницы',
      ],
    },
  ];

  return (
    <section class="services" id="services">
      <div class="services__head">
        <h2 class="section-title">Что мы делаем для роста вашего бизнеса</h2>
        <p class="section-subtitle">
          Собираем работающий маркетинг из платной рекламы, соцсетей и дизайна — без воды и лишних движений.
        </p>
      </div>

      <div class="services__grid">
        {services.map((service) => (
          <article class="services__card" key={service.title}>
            <div class="services__tag">{service.tag}</div>
            <h3 class="services__title">{service.title}</h3>
            <ul class="services__list">
              {service.bullets.map((item) => (
                <li class="services__item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#pricing" class="services__link">
              Подробнее о формате работы
            </a>
          </article>
        ))}
      </div>
    </section>
  );
});