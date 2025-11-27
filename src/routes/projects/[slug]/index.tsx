import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import type { Project } from '../index';
import { PROJECTS } from '../index';
import '../../../styles/projects.css';

type ProjectSection = {
  title: string;
  text: string;
  image?: string;
};

type ProjectDetails = {
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  role: string;
  period: string;
  sections: ProjectSection[];
};

const PROJECT_DETAILS: ProjectDetails[] = [
  {
    slug: 'aqua-terra-ads',
    heroTitle: 'Aqua Terra Fitness',
    heroSubtitle: 'Рост записей в премиальный фитнес-клуб',
    role: 'Performance Marketing, Paid Social',
    period: '3 месяца',
    sections: [
      {
        title: 'Задача',
        text: 'Увеличить количество заявок на абонементы при сохранении стоимости лида и премиального позиционирования бренда.',
        image: '/media/projects/aqua-terra-1.jpg',
      },
      {
        title: 'Решение',
        text: 'Собрали сегменты аудитории по интересам к спорту и wellness, протестировали несколько креативных концепций, усилили оффером с ограниченным предложением по времени.',
        image: '/media/projects/aqua-terra-2.jpg',
      },
      {
        title: 'Результат',
        text: 'Количество лидов выросло на 47%, при этом стоимость заявки снизилась на 23% по сравнению с предыдущим периодом.',
      },
    ],
  },
  // здесь по аналогии добавишь другие кейсы
];

export default component$(() => {
  const loc = useLocation();
  const slug = loc.params.slug;

  const projectBase: Project | undefined = PROJECTS.find(
    (p) => p.slug === slug
  );
  const projectDetails = PROJECT_DETAILS.find((p) => p.slug === slug);

  if (!projectBase || !projectDetails) {
    return (
      <main class="page page--project">
        <section class="project">
          <div class="project__inner">
            <p>Кейс не найден.</p>
            <Link href="/projects" class="project__back-link">
              ← Вернуться к проектам
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main class="page page--project">
      <section class="project">
        <div class="project__inner">
          <Link href="/projects" class="project__back-link">
            ← Все проекты
          </Link>

          {/* Hero */}
          <header class="project-hero">
            <div class="project-hero__text">
              <h1 class="project-hero__title">{projectDetails.heroTitle}</h1>
              <p class="project-hero__subtitle">
                {projectDetails.heroSubtitle}
              </p>

              <dl class="project-hero__meta">
                <div>
                  <dt>Клиент</dt>
                  <dd>{projectBase.client}</dd>
                </div>
                <div>
                  <dt>Роль команды</dt>
                  <dd>{projectDetails.role}</dd>
                </div>
                <div>
                  <dt>Период работы</dt>
                  <dd>{projectDetails.period}</dd>
                </div>
              </dl>
            </div>

            <div class="project-hero__image-wrap">
              <img
                src={projectBase.cover}
                alt={projectBase.title}
                class="project-hero__image"
              />
            </div>
          </header>

          {/* Секции с описанием */}
          <div class="project-layout">
            {projectDetails.sections.map((section) => (
              <article
                key={section.title}
                class={{
                  'project-section': true,
                  'project-section--with-image': !!section.image,
                }}
              >
                <div class="project-section__text">
                  <h2 class="project-section__title">{section.title}</h2>
                  <p class="project-section__body">{section.text}</p>
                </div>
                {section.image && (
                  <div class="project-section__image-wrap">
                    <img
                      src={section.image}
                      alt={section.title}
                      class="project-section__image"
                      loading="lazy"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA под кейсом */}
      <section class="cta cta--project">
        <div class="cta__inner">
          <h2 class="section-title section-title--center">
            Хотите обсудить похожий проект?
          </h2>
          <p class="section-subtitle section-subtitle--center">
            Оставьте контакты — вернёмся с идеями и примерным бюджетом.
          </p>

          <form class="cta__form" preventdefault:submit>
            <div class="cta__fields">
              <input
                class="cta__input"
                type="text"
                name="name"
                placeholder="Ваше имя"
              />
              <input
                class="cta__input"
                type="tel"
                name="phone"
                placeholder="+373 (__) ___-____"
              />
            </div>
            <button class="btn btn--primary" type="submit">
              Обсудить задачу
            </button>
          </form>
        </div>
      </section>
    </main>
  );
});