// src/components/service-page/service-page.tsx
import { component$, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from '~/styles/service-page.css?inline';
import type { ServicePageData } from '~/components/service-page/types';

interface ServicePageProps {
  data: ServicePageData;
}

export const ServicePage = component$<ServicePageProps>(({ data }) => {
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
            View all projects ↗
          </a>
        </div>

        <div class="service-projects__marquee">
          <div class="service-projects__track">
            {data.projects.items.map((project) => (
              <article class="service-project-card" key={project.slug}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <h3>{project.title}</h3>
                <p>{project.tagline}</p>
                <p class="service-project-card__client">
                  Client: {project.client}
                </p>
              </article>
            ))}
            {data.projects.items.map((project) => (
              <article
                class="service-project-card"
                key={project.slug + '-dup'}
              >
                <img src={project.image} alt={project.title} loading="lazy" />
                <h3>{project.title}</h3>
                <p>{project.tagline}</p>
                <p class="service-project-card__client">
                  Client: {project.client}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process */}
      <section class="service-process" id="process">
        <div class="service-process__header">
          <p class="service-section-label">{data.process.label}</p>
          <h2 class="service-section-title">
            {data.process.titleLine1}{' '}
            <span>{data.process.titleLine2}</span>
          </h2>
          <a href={data.projects.allLink} class="service-section-link">
            View all projects ↗
          </a>
        </div>

        <div class="service-process__timeline">
          {data.process.steps.map((step, index) => (
            <div class="service-process-step" key={step.title}>
              <div class="service-process-step__indicator">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <div class="service-process-step__content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stacked offers */}
      <section class="service-offers" id="offers">
        {data.offers.map((offer, index) => (
          <article
            key={offer.title}
            data-index={index}
            class={
              'service-offer-card' +
              (index === 0 ? ' service-offer-card--top' : '')
            }
            style={{ zIndex: String(index + 1) }}
          >
            <div class="service-offer-card__text">
              <p class="service-section-label">{offer.label}</p>
              <h2 class="service-section-title">{offer.title}</h2>
              <p class="service-offer-card__subtitle">{offer.subtitle}</p>

              <ul>
                {offer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div class="service-offer-card__media">
              <img src={offer.image} alt={offer.imageAlt} loading="lazy" />
            </div>
          </article>
        ))}
      </section>

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