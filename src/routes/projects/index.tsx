import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import '../../styles/projects.css';

export type CategoryId = 'ads' | 'smm' | 'branding';

export type Project = {
  slug: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  cover: string;
  client: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'aqua-terra-ads',
    category: 'ads',
    title: 'Aqua Terra Fitness',
    subtitle: 'Перфоманс-реклама для сети фитнес-клубов',
    cover: '/media/projects/aqua-terra-cover.jpg',
    client: 'Aqua Terra',
  },
  {
    slug: 'ciao-bella-ads',
    category: 'ads',
    title: 'Ciao Bella Pinsa',
    subtitle: 'Продвижение доставки в социальных сетях',
    cover: '/media/projects/ciao-bella-cover.jpg',
    client: 'Ciao Bella',
  },
  {
    slug: 'hanna-smm',
    category: 'smm',
    title: 'Hanna Aesthetic Center',
    subtitle: 'SMM-стратегия и контент для клиники эстетики',
    cover: '/media/projects/hanna-cover.jpg',
    client: 'Hanna Aesthetic Center',
  },
  {
    slug: 'lash-store-smm',
    category: 'smm',
    title: 'Lash Store',
    subtitle: 'Визуальный стиль и продажи через Stories',
    cover: '/media/projects/lash-store-cover.jpg',
    client: 'Lash Store',
  },
  {
    slug: 'straus-branding',
    category: 'branding',
    title: 'Straus Delivery',
    subtitle: 'Ребрендинг сервиса доставки',
    cover: '/media/projects/straus-cover.jpg',
    client: 'Straus',
  },
  {
    slug: 'moft-branding',
    category: 'branding',
    title: 'Moft',
    subtitle: 'Айдентика для косметологического бренда',
    cover: '/media/projects/moft-cover.jpg',
    client: 'Moft',
  },
];

const CATEGORIES: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'Все проекты' },
  { id: 'ads', label: 'Paid Ads' },
  { id: 'smm', label: 'SMM' },
  { id: 'branding', label: 'Branding' },
];

export default component$(() => {
  const activeCategory = useSignal<CategoryId | 'all'>('all');

  const filteredProjects = () =>
    activeCategory.value === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory.value);

  return (
    <main class="page page--projects">
      <section class="projects">
        <div class="projects__inner">
          {/* Табы */}
          <div class="projects-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                class={{
                  'projects-tabs__btn': true,
                  'projects-tabs__btn--active':
                    activeCategory.value === cat.id,
                }}
                onClick$={() => (activeCategory.value = cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Заголовок */}
          <header class="projects-header">
            <h1 class="section-title section-title--center">
              Реализованные проекты
            </h1>
            <p class="section-subtitle section-subtitle--center">
              Маркетинг, который работает в реальном бизнесе.
            </p>
          </header>

          {/* Сетка проектов */}
          <div class="projects-grid">
            {filteredProjects().map((project) => (
              <article key={project.slug} class="project-card">
                <Link href={`/projects/${project.slug}`} class="project-card__link">
                  <div class="project-card__image-wrap">
                    <img
                      src={project.cover}
                      alt={project.title}
                      class="project-card__image"
                      loading="lazy"
                    />
                  </div>
                  <div class="project-card__body">
                    <div class="project-card__client">{project.client}</div>
                    <h2 class="project-card__title">{project.title}</h2>
                    <p class="project-card__subtitle">{project.subtitle}</p>
                    <span class="project-card__more">Смотреть кейс →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Нам доверяют */}
      <section class="trust">
        <div class="trust__inner">
          <h2 class="section-title section-title--center">Нам доверяют</h2>
          <p class="section-subtitle section-subtitle--center">
            Работали с брендами из красоты, спорта, food, доставки и не только.
          </p>

          <div class="trust-logos">
            <span class="trust-logo">Aqua Terra</span>
            <span class="trust-logo">Hanna</span>
            <span class="trust-logo">Ciao Bella</span>
            <span class="trust-logo">Lash Store</span>
            <span class="trust-logo">Moft</span>
            <span class="trust-logo">Straus</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="cta cta--projects">
        <div class="cta__inner">
          <h2 class="section-title section-title--center">
            Хотите похожий результат?
          </h2>
          <p class="section-subtitle section-subtitle--center">
            Расскажите о своём проекте — предложим формат работы и бюджет.
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
              Обсудить проект
            </button>
          </form>
        </div>
      </section>
    </main>
  );
});