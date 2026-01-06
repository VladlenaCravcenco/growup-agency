import { component$ } from '@builder.io/qwik';
import { useHomePage } from '~/routes/[lang]/layout';

export const HomeServices = component$(() => {
  const { services } = useHomePage().value;

  return (
    <section class="services" id="services">
      <div class="services__head">
        <h2 class="section-title">
          Что мы делаем для роста вашего бизнеса
        </h2>
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
                <li class="services__item" key={item.text}>
                  {item.text}
                </li>
              ))}
            </ul>

            <a href={service.link} class="services__link">
              {service.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
});