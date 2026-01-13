// src/components/service-page/service-page.tsx
import { component$, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from '~/styles/service-page.css?inline';
import type { ServicePageData } from '~/components/service-page/types';
import { ServiceOffersStack } from './ServiceOffersStack';

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
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.service-offer-card'));
    if (!cards.length) return;

    const setStates = (activeIndex: number) => {
      cards.forEach((card, i) => {
        card.classList.remove('service-offer-card--current', 'service-offer-card--stacked');

        if (i < activeIndex) card.classList.add('service-offer-card--stacked');
        else if (i === activeIndex) card.classList.add('service-offer-card--current');
      });
    };

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
      { threshold: 0.6, rootMargin: '-20% 0px -40% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  });

  const hasSanity = projectsFromSanity !== undefined; // важно: не length
  const items = hasSanity ? projectsFromSanity : data?.projects?.items ?? [];

  // ✅ защита от null/undefined, чтобы страница не падала, пока Sanity не заполнен
  const process = data?.process ?? {
    label: '',
    titleLine1: '',
    titleLine2: '',
    steps: [],
  };
  const processSteps = Array.isArray((process as any).steps) ? (process as any).steps : [];

  const faq = data?.faq ?? { titleLine1: '', titleLine2: '', items: [] as any[] };
  const faqItems = Array.isArray((faq as any).items) ? (faq as any).items : [];

  const offers = Array.isArray((data as any)?.offers) ? (data as any).offers : [];

  const projects = data?.projects ?? { label: '', title: '', allLink: '', items: [] as any[] };

  const brief = data?.brief ?? { title: '', text: '', button: '' };

  return (
    <main class="service-page">
      {/* 1. Hero */}
      <section class="service-hero">
        <div class="service-hero__text">
          <p class="service-hero__badge">{data?.badge ?? ''}</p>
          <h1 class="service-hero__title">
            {data?.titleLine1 ?? ''} <span>{data?.titleLine2 ?? ''}</span>
          </h1>
          <p class="service-hero__subtitle">{data?.subtitle ?? ''}</p>
          <p class="service-hero__description">{data?.description ?? ''}</p>

          <div class="service-hero__cta">
            <a href="/contact" class="btn btn--primary">
              {data?.ctaPrimary ?? ''}
            </a>
            <a href={data?.ctaSecondaryLink ?? '#'} class="btn btn--ghost">
              {data?.ctaSecondary ?? ''}
            </a>
          </div>
        </div>

        <div class="service-hero__image">
          {data?.heroImage ? (
            <img src={data.heroImage} alt={data?.heroImageAlt ?? ''} loading="lazy" />
          ) : (
            <div class="service-hero__image-ph" />
          )}
        </div>
      </section>

      {/* 2. Projects auto-scroll */}
      <section class="service-projects" id="projects">
        <div class="service-section-header">
          <p class="service-section-label">{projects.label}</p>
          <h2 class="service-section-title">{projects.title}</h2>
          <a href={projects.allLink || '#'} class="service-section-link">
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
          <header class="service-process__header">
            <p class="service-section-label">{process.label}</p>
            <h2 class="service-section-title">
              {process.titleLine1} <span>{process.titleLine2}</span>
            </h2>

            <a href={projects.allLink || '#'} class="service-section-link">
              View all projects ↗
            </a>
          </header>

          <div class="service-process__timeline">
            {processSteps.length === 0 ? (
              <div class="service-process__empty">Пока нет шагов процесса</div>
            ) : (
              processSteps.map((step: any, index: number) => (
                <article
                  class="service-process-step"
                  key={`${step?.title ?? 'step'}-${index}`}
                >
                  <div class="service-process-step__indicator">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div class="service-process-step__content">
                    <h3 class="service-process-step__title">{step?.title ?? ''}</h3>
                    <p class="service-process-step__text">{step?.text ?? ''}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Offers */}
      <ServiceOffersStack offers={offers} />

      {/* 5. FAQ */}
      <section class="service-faq" id="faq">
        <div class="service-faq__layout">
          <div class="service-faq__intro">
            <p class="service-section-label">FAQs</p>
            <h2 class="service-section-title">
              {faq.titleLine1} <span>{faq.titleLine2}</span>
            </h2>
          </div>

          <div class="service-faq__list">
            {faqItems.length === 0 ? (
              <div class="service-faq__empty">Пока нет вопросов</div>
            ) : (
              faqItems.map((item: any, idx: number) => (
                <details class="faq-item" key={`${item?.question ?? 'q'}-${idx}`}>
                  <summary>{item?.question ?? ''}</summary>
                  <p>{item?.answer ?? ''}</p>
                </details>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. Brief CTA */}
      <section class="service-brief-cta" id="brief">
        <div class="service-brief-cta__inner">
          <div>
            <h2>{brief.title}</h2>
            <p>{brief.text}</p>
          </div>
          <a href="/contact" class="btn btn--light">
            {brief.button}
          </a>
        </div>
      </section>
    </main>
  );
});