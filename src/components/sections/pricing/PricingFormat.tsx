import { component$ } from '@builder.io/qwik';

export const PricingFormat = component$(() => {
  return (
    <section class="pricing-format" id="format">
      <div class="pricing-format__inner">
        <header class="pricing-format__header">
          <p class="section-label">Формат работы</p>
          <h2 class="section-title">
            Как мы ведём проект
          </h2>
          <p class="section-subtitle">
            Чтобы вы точно понимали, за что платите, мы не скрываем процесс.
            На любой услуге — реклама, SMM, брендинг или сайт — структура работы
            остаётся одинаковой.
          </p>
        </header>

        <div class="pricing-format__grid">
          <article class="format-card">
            <div class="format-card__badge">01</div>
            <h3 class="format-card__title">Аудит и стратегия</h3>
            <p class="format-card__text">
              Погружаемся в продукт, нишу и цифры. Формируем цели и гипотезы.
            </p>
            <ul class="format-card__list">
              <li>Интервью с вами и сбор вводных</li>
              <li>Анализ ниши и конкурентов</li>
              <li>Определяем KPI и бюджет</li>
            </ul>
          </article>

          <article class="format-card">
            <div class="format-card__badge">02</div>
            <h3 class="format-card__title">Подготовка</h3>
            <p class="format-card__text">
              Собираем фундамент — в зависимости от выбранной услуги.
            </p>
            <ul class="format-card__list">
              <li>Медиаплан, креативы, аудитории (Paid Ads)</li>
              <li>Контент-стратегия и визуал (SMM)</li>
              <li>Концепция, логотип, фирстиль (Branding)</li>
              <li>Структура, UX, дизайн, верстка (Web)</li>
            </ul>
          </article>

          <article class="format-card">
            <div class="format-card__badge">03</div>
            <h3 class="format-card__title">Запуск</h3>
            <p class="format-card__text">
              Запускаем кампании, публикуем контент или выводим сайт в продакшн.
            </p>
            <ul class="format-card__list">
              <li>Запуск рекламных кампаний / активаций</li>
              <li>Публикация контента по плану</li>
              <li>Релиз сайта и подключение аналитики</li>
            </ul>
          </article>

          <article class="format-card">
            <div class="format-card__badge">04</div>
            <h3 class="format-card__title">Оптимизация и рост</h3>
            <p class="format-card__text">
              Смотрим в цифры и докручиваем связки, пока это даёт рост.
            </p>
            <ul class="format-card__list">
              <li>А/В тесты креативов и посадочных</li>
              <li>Перераспределение бюджета</li>
              <li>Улучшения сайта и визуала</li>
            </ul>
          </article>

          <article class="format-card">
            <div class="format-card__badge">05</div>
            <h3 class="format-card__title">Отчётность и планы</h3>
            <p class="format-card__text">
              Регулярно показываем, что происходит, и куда двигаемся дальше.
            </p>
            <ul class="format-card__list">
              <li>Еженедельные апдейты в удобном формате</li>
              <li>Ежемесячный отчёт с цифрами и выводами</li>
              <li>План задач на следующий период</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
});