// src/components/service-page/service-page.tsx
import { component$, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from '~/styles/service-page.css?inline';
import type { ServicePageData } from '~/components/service-page/types';
import { ServiceOffersStack } from './ServiceOffersStack';
import { Link } from '@builder.io/qwik-city';

type SanityProject = {
  slug: string;
  title: string;
  tagline?: string;
  client?: string;
  image?: string;
};
interface ServicePageProps {
  data: ServicePageData;
  projectsFromSanity?: SanityProject[];
}

export const ServicePage = component$<ServicePageProps>(({ data, projectsFromSanity }) => {
  useStylesScoped$(styles);

  // стек карточек: какая активная, какие уже "улетели назад"
  useVisibleTask$(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('.service-offer-card')
    );
    if (!cards.length) return;

    const setStates = (activeIndex: number) => {
      cards.forEach((card, i) => {
        card.classList.remove(
          'service-offer-card--current',
          'service-offer-card--stacked'
        );

        if (i < activeIndex) {
          card.classList.add('service-offer-card--stacked');
        } else if (i === activeIndex) {
          card.classList.add('service-offer-card--current');
        }
      });
    };

    // по умолчанию активна первая
    setStates(0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const idx = Number(el.dataset.index ?? 0);
          setStates(idx);
        });
      },
      {
        threshold: 0.6,
        // чтобы "переключение" происходило чуть выше центра экрана
        rootMargin: '-20% 0px -40% 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  });


  const hasSanity = projectsFromSanity !== undefined; // важно: не length

  const items = hasSanity
    ? projectsFromSanity
    : data.projects.items;

  return (
    <main class="service-page">
      {/* 1. Hero */}
      <section class="service-hero">
        <div class="service-hero__text">
          <p class="service-hero__badge">{data.badge}</p>
          <h1 class="service-hero__title">
            {data.titleLine1} <span>{data.titleLine2}</span>
          </h1>
          <p class="service-hero__subtitle">{data.subtitle}</p>
          <p class="service-hero__description">{data.description}</p>

          <div class="service-hero__cta">
            <a href="#brief" class="btn btn--primary">
              {data.ctaPrimary}
            </a>
            <a href={data.ctaSecondaryLink} class="btn btn--ghost">
              {data.ctaSecondary}
            </a>
          </div>
        </div>

        <div class="service-hero__image">
          <img
            src={data.heroImage}
            alt={data.heroImageAlt}
            loading="lazy"
          />
        </div>
      </section>

      {/* 2. Projects auto-scroll */}
      <section class="service-projects" id="projects">
        <div class="service-section-header">
          <p class="service-section-label">{data.projects.label}</p>
          <h2 class="service-section-title">{data.projects.title}</h2>
          <a href={data.projects.allLink} class="service-section-link">
            Посмотреть все кейсы ↗
          </a>
        </div>

        {items.length === 0 ? (
          <div class="service-projects__empty">Пока нет кейсов по этой услуге</div>
        ) : (
          <div class="service-projects__marquee">
            <div class="service-projects__track">
              {[...items, ...items].map((project, idx) => (
                <article class="service-project-card" key={`${project.slug}-${idx}`}>
                  <Link href={`/projects/${project.slug}`}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" />
                    ) : (
                      <div class="service-project-card__ph" />
                    )}
                    <h3>{project.title}</h3>
                    {project.tagline && <p>{project.tagline}</p>}
                    {project.client && (
                      <p class="service-project-card__client">Client: {project.client}</p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. Process */}
      <section class="service-process" id="process">
        <div class="service-process__inner">
          {/* ЛЕВАЯ КОЛОНКА: заголовок */}
          <header class="service-process__header">
            <p class="service-section-label">{data.process.label}</p>
            <h2 class="service-section-title">
              {data.process.titleLine1}{' '}
              <span>{data.process.titleLine2}</span>
            </h2>

            <a href={data.projects.allLink} class="service-section-link">
              View all projects ↗
            </a>
          </header>

          {/* ПРАВАЯ КОЛОНКА: линия + кружочки + текст шагов */}
          <div class="service-process__timeline">
            {data.process.steps.map((step, index) => (
              <article class="service-process-step" key={step.title}>
                <div class="service-process-step__indicator">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div class="service-process-step__content">
                  <h3 class="service-process-step__title">{step.title}</h3>
                  <p class="service-process-step__text">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceOffersStack offers={data.offers} />

      {/* 5. FAQ */}
      <section class="service-faq" id="faq">
        <div class="service-faq__layout">
          <div class="service-faq__intro">
            <p class="service-section-label">FAQs</p>
            <h2 class="service-section-title">
              {data.faq.titleLine1}{' '}
              <span>{data.faq.titleLine2}</span>
            </h2>
          </div>
          <div class="service-faq__list">
            {data.faq.items.map((item) => (
              <details class="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brief CTA */}
      <section class="service-brief-cta" id="brief">
        <div class="service-brief-cta__inner">
          <div>
            <h2>{data.brief.title}</h2>
            <p>{data.brief.text}</p>
          </div>
          <a href={data.brief.link} class="btn btn--light">
            {data.brief.button}
          </a>
        </div>
      </section>
    </main>
  );
});