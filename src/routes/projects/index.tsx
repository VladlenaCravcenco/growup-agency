import { component$, useSignal } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import '../../styles/projects.css';
import { sanityClient } from '~/sanity/client';
import { HomeClients } from '../../components/sections/home/HomeClients'

import { HomeCTA } from '../../components/sections/home/HomeCTA'

export type CategoryId = 'ads' | 'smm' | 'branding' | 'web';

export type Project = {
  slug: string;
  categories: CategoryId[];
  title: string;
  subtitle: string;
  cover: string;
  client: string;
};


export const useProjects = routeLoader$<Project[]>(async () => {
  const projects = await sanityClient.fetch<Project[]>(
    `*[_type == "project"] | order(_createdAt desc){
      "slug": slug.current,
      "categories": coalesce(categories, []),
      title,
      "subtitle": heroSubtitle,
      client,
      "cover": cover.asset->url
    }`
  );
  return projects || [];
});



const CATEGORIES: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'Все проекты' },
  { id: 'ads', label: 'Paid Ads' },
  { id: 'smm', label: 'SMM' },
  { id: 'branding', label: 'Branding' },
  { id: 'web', label: 'WEB' },
];

export default component$(() => {
  const activeCategory = useSignal<CategoryId | 'all'>('all');
  const projects = useProjects().value;

 const filteredProjects = () =>
  activeCategory.value === 'all'
    ? projects
    : projects.filter((p) => p.categories?.includes(activeCategory.value as CategoryId));


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
                onClick$={() => (activeCategory.value = cat.id as CategoryId | 'all')}
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
                <Link
                  href={`/projects/${project.slug}`}
                  class="project-card__link"
                >
                  <div class="project-card__image-wrap">
                    {project.cover ? (
                      <img
                        src={project.cover}
                        alt={project.title}
                        class="project-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <div class="project-card__image-placeholder" />
                    )}
                  </div>
                  <div class="project-card__body">
                    {project.client && (
                      <div class="project-card__client">{project.client}</div>
                    )}
                    <h2 class="project-card__title">{project.title}</h2>
                    {project.subtitle && (
                      <p class="project-card__subtitle">
                        {project.subtitle}
                      </p>
                    )}
                    <span class="project-card__more">Смотреть кейс →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeClients />
      <HomeCTA />
    </main>
  );
});