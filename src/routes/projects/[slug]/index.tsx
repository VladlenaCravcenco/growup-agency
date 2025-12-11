import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import '../../../styles/projects.css';

/* -----------------------------
   TYPES
------------------------------ */

type SectionKind = 'goals' | 'solution' | 'results';

type ProjectImage = {
  src: string;
  alt: string;
};

type ProjectSection = {
  kind: SectionKind;
  title?: string;
  text: string;
  gallery?: ProjectImage[];
};

type ProjectDetails = {
  heroTitle: string;
  heroSubtitle: string;
  client: string;
  role: string;
  period: string;
  product: string;
  cover: string;
  sections: ProjectSection[];
};

/* -----------------------------
   ДЕМO-ПРОЕКТ (КОСТЯК)
------------------------------ */

const PROJECT: ProjectDetails = {
  heroTitle: 'Not an idol — Germany Tour',
  heroSubtitle: 'Полный sold-out тура по Германии за три недели кампаний',
  client: 'Not an idol',
  role: 'Стратегия, креатив, performance-маркетинг',
  period: '30 дней',
  product: 'Продажа билетов на тур по 6 городам Германии',
  cover: '/media/projects/not-an-idol/cover.jpg',
  sections: [
    {
      kind: 'goals',
      title: 'Маркетинговая задача и цели',
      text: `
Главная задача — продать все билеты на тур в шести городах Германии за ограниченный срок.

Мы работали с аудиторией, которая ещё не была знакома с группой, и делали фокус на русскоязычные и румыноязычные сегменты, которые активно ходят на концерты и культурные события в Германии.

Ключевые цели кампании:
— продать 2150 билетов;
— поддерживать стабильный темп продаж без «пожаров» в конце;
— сформировать узнаваемость и эмоциональный контакт с новой аудиторией.
      `.trim(),
      // для задачи фотография НЕ используется в лейауте
      gallery: [],
    },
    {
      kind: 'solution',
      title: 'Стратегия и реализация кампании',
      text: `
Мы выстроили кампанию как единую систему, где каждый шаг пользователя — от первого касания до покупки билета — был продуман.

Стратегия:
— разделили города по приоритету и разработали отдельный темп прогрева и продаж;
— подготовили связки под русскоязычную и румыноязычную аудитории с адаптированными сообщениями;
— построили путь: знакомство с группой → вовлечение контентом → ретаргетинг → покупка билета.

Реализация:
— основным каналом стала реклама в Meta с акцентом на видео, Stories и живые фрагменты выступлений;
— тестировали несколько креативных линий: атмосфера концерта, ограниченный билетный фонд, эмоциональные отзывы;
— ежедневно оптимизировали кампании: перераспределяли бюджеты между городами, корректировали аудитории, следили за частотой и темпом продаж.
      `.trim(),
      gallery: [
        {
          src: '/media/projects/not-an-idol/solution-ads-manager.jpg',
          alt: 'Группы объявлений и показатели в Meta Ads',
        },

      ],
    },
    {
      kind: 'results',
      title: 'Результаты и выводы',
      text: `
Тур был закрыт по продажам в полном объёме.

Основные результаты:
— 2150 проданных билетов;
— Бикенбах и Дортмунд — sold out за неделю до концертов;
— концертные залы были заполнены во всех шести городах;
— ключевой объём продаж достигнут за три недели работы кампаний Meta.

Что получил клиент:
— рабочую модель продвижения тура, которую можно масштабировать на следующие города и страны;
— новую аудиторию в Германии, которая познакомилась с группой через рекламную кампанию и живой концерт;
— рост узнаваемости и позитивный опыт, подтверждённый отзывами и повторными контактами.
      `.trim(),
      gallery: [
        {
          src: '/media/projects/not-an-idol/results-hall.jpg',
          alt: 'Полный зал на одном из концертов Not an idol',
        },

      ],
    },
  ],
};

/* -----------------------------
   КОМПОНЕНТ СТРАНИЦЫ
------------------------------ */

export default component$(() => {
  const project = PROJECT;

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
              <h1 class="project-hero__title">{project.heroTitle}</h1>

              {/* Подзаголовок */}
              <p class="project-hero__subtitle">{project.heroSubtitle}</p>

              {/* Блок "задача" как в макете */}
              <div class="project-hero__task">
                <span class="project-hero__task-label">задача</span>
                <p class="project-hero__task-text">{project.product}</p>
              </div>

              {/* Мета-информация: 3 колонки */}
              <dl class="project-hero__meta">
                <div>
                  <dt>Клиент</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt>Роль команды</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Период</dt>
                  <dd>{project.period}</dd>
                </div>
              </dl>
            </div>

            <div class="project-hero__image-wrap">
              <div class="project-hero__image-placeholder">
                {/* потом сюда поставишь реальное изображение или скрин */}
                {/* <img src={project.cover} alt={project.heroTitle} class="project-hero__image" /> */}
              </div>
            </div>
          </header>

         
          {/* Блоки: Задача / Реализация / Результаты */}
          <div class="project-layout">
            {project.sections.map((section, index) => {
              const gallery = section.gallery ?? [];
              const sideImage = gallery[0];
              const extraImages = gallery.slice(1);

              // -------- ЗАДАЧА: только текст, на всю ширину --------
              if (section.kind === 'goals') {
                return (
                  <section
                    key={index}
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

              // -------- РЕАЛИЗАЦИЯ: 1 фотка слева, текст справа, доп. фотки снизу --------
              if (section.kind === 'solution') {
                return (
                  <section
                    key={index}
                    class="project-section project-section--solution"
                  >
                    <div class="project-section__content">
                      {/* левая большая плашка под фото */}
                      <div class="project-section__media project-section__media--left">
                        {sideImage && (
                          <img
                            src={sideImage.src}
                            alt={sideImage.alt || section.title || ''}
                            class="project-section__image"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* текст справа */}
                      <div class="project-section__text">
                        <h2 class="project-section__title">
                          {section.title ?? 'Стратегия и реализация кампании'}
                        </h2>
                        <p class="project-section__body">{section.text}</p>
                      </div>
                    </div>

                    {/* если фоток больше одной — остальные идут снизу */}
                    {extraImages.length > 0 && (
                      <div class="project-section__gallery project-section__gallery--below">
                        {extraImages.map((img) => (
                          <div
                            key={img.src}
                            class="project-section__gallery-item"
                          >
                            <img
                              src={img.src}
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

              // -------- РЕЗУЛЬТАТЫ: текст слева, 1 фотка справа, доп. фотки снизу --------
              if (section.kind === 'results') {
                return (
                  <section
                    key={index}
                    class="project-section project-section--results"
                  >
                    <div class="project-section__content">
                      {/* текст слева */}
                      <div class="project-section__text">
                        <h2 class="project-section__title">
                          {section.title ?? 'Результаты и выводы'}
                        </h2>
                        <p class="project-section__body">{section.text}</p>
                      </div>

                      {/* правая большая плашка под фото */}
                      <div class="project-section__media project-section__media--right">
                        {sideImage && (
                          <img
                            src={sideImage.src}
                            alt={sideImage.alt || section.title || ''}
                            class="project-section__image"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>

                    {/* дополнительные фото под блоком */}
                    {extraImages.length > 0 && (
                      <div class="project-section__gallery project-section__gallery--below">
                        {extraImages.map((img) => (
                          <div
                            key={img.src}
                            class="project-section__gallery-item"
                          >
                            <img
                              src={img.src}
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

      {/* CTA под кейсом — возвращаем призыв */}
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