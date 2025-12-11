import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import '../../../styles/projects.css';
import { sanityClient } from '~/sanity/client';

/* -----------------------------
   TYPES
------------------------------ */

type SectionKind = 'goals' | 'solution' | 'results';

type SectionImage = {
  url: string;
  alt?: string;
};

type ProjectSection = {
  kind: SectionKind;
  title?: string;
  text?: string;
  gallery?: SectionImage[];
};

type ProjectPageData = {
  slug: string;
  heroTitle: string;
  heroSubtitle?: string;
  task?: string;
  client?: string;
  role?: string;
  period?: string;
  cover?: string;
  sections: ProjectSection[];
};

/* -----------------------------
   Fallback-проект
------------------------------ */

const DEMO_PROJECT: ProjectPageData = {
  slug: 'not-an-idol',
  heroTitle: 'Полный  тура по Германии за три недели кампаний',
  heroSubtitle:
    'Кейс музыкальной группы Not an idol: тур по шести городам Германии с акцентом на русскоязычную и румыноязычную аудиторию.',
  task: 'Продать все билеты на тур в шести городах Германии за ограниченный срок, работая с новой аудиторией.',
  client: 'Not an idol',
  role: 'Стратегия, креатив, performance-маркетинг',
  period: '30 дней',
  cover: '',
  sections: [],
};

/* -----------------------------
   LOADER ИЗ SANITY
------------------------------ */

export const useProject = routeLoader$<ProjectPageData | null>(async (ev: any) => {
  const { slug } = ev.params as { slug: string };

  const project = await sanityClient.fetch<ProjectPageData | null>(
    `*[_type == "project" && slug.current == $slug][0]{
      "slug": slug.current,
      "heroTitle": title,
      heroSubtitle,
      task,
      client,
      role,
      period,
      "cover": cover.asset->url,
      sections[]{
        kind,
        title,
        text,
        gallery[]{
          "url": asset->url,
          alt
        }
      }
    }`,
    { slug }
  );

  return project;
});

/* -----------------------------
   КОМПОНЕНТ СТРАНИЦЫ
------------------------------ */

export default component$(() => {
  const projectResource = useProject();
  const data = projectResource.value ?? DEMO_PROJECT;

  const sections: ProjectSection[] = data.sections ?? [];

  return (
    <main class="page page--project">
      <section class="project">
        <div class="project__inner">
          <Link href="/projects" class="project__back-link">
            ← Все проекты
          </Link>

          {/* HERO: исходные данные */}
          <header class="project-hero">
            <div class="project-hero__text">
              {/* Заголовок кейса */}
              <h1 class="project-hero__title">{data.heroTitle}</h1>

              {/* Подзаголовок */}
              {data.heroSubtitle && (
                <p class="project-hero__subtitle">{data.heroSubtitle}</p>
              )}

              {/* Блок "задача" */}
              {data.task && (
                <div class="project-hero__task">
                  <span class="project-hero__task-label">задача</span>
                  <p class="project-hero__task-text">{data.task}</p>
                </div>
              )}

              {/* Мета-информация: 3 колонки */}
              <dl class="project-hero__meta">
                <div>
                  <dt>Клиент</dt>
                  <dd>{data.client}</dd>
                </div>
                <div>
                  <dt>Роль команды</dt>
                  <dd>{data.role}</dd>
                </div>
                <div>
                  <dt>Период</dt>
                  <dd>{data.period}</dd>
                </div>
              </dl>
            </div>

            <div class="project-hero__image-wrap">
              <div class="project-hero__image-placeholder">
                {data.cover && (
                  <img
                    src={data.cover}
                    alt={data.heroTitle}
                    class="project-hero__image"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </header>

          {/* Блоки: Цели / Реализация / Результаты */}
          <div class="project-layout">
            {sections.map((section: ProjectSection, index: number) => {
              const gallery = section.gallery ?? [];
              const sideImage = gallery[0];
              const extraImages = gallery.slice(1);

              // -------- ЦЕЛИ / KPI: только текст, на всю ширину --------
              if (section.kind === 'goals') {
                return (
                  <section
                    key={`goals-${index}`}
                    class="project-section project-section--goals"
                  >
                    <div class="project-section__text project-section__text--full">
                      <h2 class="project-section__title">
                        {section.title ?? 'Маркетинговая задача и цели'}
                      </h2>
                      <p class="project-section__body">{section.text}</p>
                    </div>
                  </section>
                );
              }

              // -------- РЕАЛИЗАЦИЯ: фото слева, текст справа, доп. фото снизу --------
              if (section.kind === 'solution') {
                return (
                  <section
                    key={`solution-${index}`}
                    class="project-section project-section--solution"
                  >
                    <div class="project-section__content">
                      <div class="project-section__media project-section__media--left">
                        {sideImage && (
                          <img
                            src={sideImage.url}
                            alt={sideImage.alt || section.title || ''}
                            class="project-section__image"
                            loading="lazy"
                          />
                        )}
                      </div>

                      <div class="project-section__text">
                        <h2 class="project-section__title">
                          {section.title ?? 'Стратегия и реализация кампании'}
                        </h2>
                        <p class="project-section__body">{section.text}</p>
                      </div>
                    </div>

                    {extraImages.length > 0 && (
                      <div class="project-section__gallery project-section__gallery--below">
                        {extraImages.map((img: SectionImage, imgIndex: number) => (
                          <div
                            key={`solution-extra-${index}-${imgIndex}`}
                            class="project-section__gallery-item"
                          >
                            <img
                              src={img.url}
                              alt={img.alt || ''}
                              class="project-section__gallery-image"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              // -------- РЕЗУЛЬТАТЫ: текст слева, фото справа, доп. фото снизу --------
              if (section.kind === 'results') {
                return (
                  <section
                    key={`results-${index}`}
                    class="project-section project-section--results"
                  >
                    <div class="project-section__content">
                      <div class="project-section__text">
                        <h2 class="project-section__title">
                          {section.title ?? 'Результаты и выводы'}
                        </h2>
                        <p class="project-section__body">{section.text}</p>
                      </div>

                      <div class="project-section__media project-section__media--right">
                        {sideImage && (
                          <img
                            src={sideImage.url}
                            alt={sideImage.alt || section.title || ''}
                            class="project-section__image"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>

                    {extraImages.length > 0 && (
                      <div class="project-section__gallery project-section__gallery--below">
                        {extraImages.map((img: SectionImage, imgIndex: number) => (
                          <div
                            key={`results-extra-${index}-${imgIndex}`}
                            class="project-section__gallery-item"
                          >
                            <img
                              src={img.url}
                              alt={img.alt || ''}
                              class="project-section__gallery-image"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              return null;
            })}
          </div>
        </div>
      </section>

      {/* CTA под кейсом */}
      <section class="cta cta--project">
        <div class="cta__inner">
          <h2 class="section-title section-title--center">
            Хотите такой же результат для своего проекта?
          </h2>
          <p class="section-subtitle section-subtitle--center">
            Напишите пару строк о задаче — вернусь с идеями и примерным бюджетом.
          </p>

          <form class="cta__form" preventdefault:submit>
            <div class="cta__fields">
              <input
                class="cta__input"
                type="text"
                name="name"
                placeholder="Как к вам обращаться"
              />
            <input
                class="cta__input"
                type="text"
                name="project"
                placeholder="Кратко опишите проект"
              />
            </div>
            <button class="btn btn--primary" type="submit">
              Обсудить проект
            </button>
          </form>
        </div>
      </section>
    </main>
  );
});