import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { useHomePage, useServicesFromSanity } from '~/routes/[lang]/layout';

export const HomeServices = component$(() => {
  const loc = useLocation();
  const lang = (loc.params.lang as 'ru' | 'en' | 'ro') || 'ru';

  const { servicesTitle, servicesSubtitle, servicesCta } = useHomePage().value;
  const services = useServicesFromSanity().value;

  const withLang = (path: string) => {
    const p = path.startsWith('/') ? path : `/${path}`;
    return /^\/(ru|en|ro)(\/|$)/.test(p) ? p : `/${lang}${p}`;
  };

  return (
    <section class="services" id="services">
      <div class="services__head">
        <h2 class="section-title">{servicesTitle}</h2>
        <p class="section-subtitle">{servicesSubtitle}</p>
      </div>

      <div class="services__grid">
        {services.map((s) => (
          <article class="services__card" key={s.slug}>
            <div class="services__tag">{s.tag}</div>
            <h3 class="services__title">{s.title}</h3>

            <ul class="services__list">
              {(s.bullets ?? []).map((b, idx) => (
                <li class="services__item" key={`${s.slug}-${idx}`}>
                  {b.text}
                </li>
              ))}
            </ul>

            <a href={withLang(s.link || `/services/${s.slug}`)} class="services__link">
              {servicesCta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
});