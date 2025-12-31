import { component$, useSignal, $ } from '@builder.io/qwik';
import '../../styles/header.css';

export const Header = component$(() => {
  const isLangOpen = useSignal(false);
  const isMenuOpen = useSignal(false);

  const toggleLang$ = $(() => (isLangOpen.value = !isLangOpen.value));
  const toggleMenu$ = $(() => (isMenuOpen.value = !isMenuOpen.value));
  const closeMenu$ = $(() => (isMenuOpen.value = false));

  const isServicesOpen = useSignal(false);

  const toggleServices$ = $(() => {
    isServicesOpen.value = !isServicesOpen.value;
  });
  return (
    <header class="header">
      <div class="header__inner">

        {/* LOGO */}
        <a href="/" class="header__logo">Grow Up</a>

        {/* DESKTOP NAVIGATION */}
        <nav class="header__nav header__nav--desktop">
          <div class="header__nav-item header__nav-item--services">
            {/* КЛИК → скролл к секции #services на главной */}
            <a href="/#services" class="header__link">
              Услуги
            </a>

            {/* HOVER → выпадающий список отдельных страниц услуг */}
            <div class="header__dropdown">
              <a href="/services/performance-ads" class="header__dropdown-link">
                Платная реклама
              </a>
              <a href="/services/social-media-marketing" class="header__dropdown-link">
                SMM / соцсети
              </a>
              <a href="/services/design" class="header__dropdown-link">
                Дизайн и креатив
              </a>
              <a href="/services/web" class="header__dropdown-link">
                Web-разработка
              </a>
            </div>
          </div>

          {/* Остальные пункты как были */}
          <a href="/pricing" class="header__link">Цены</a>
          <a href="/#consult" class="header__link">Консультация</a>
          <a href="/projects" class="header__link">Портфолио</a>
          {/* <a href="/blog" class="header__link">Блог</a> */}
          <a href="/contact" class="header__link">Контакты</a>

          <a href="/contact" class="hero-btn">
              Получить предложение
            </a>

          {/* DESKTOP LANGUAGE SWITCHER */}
          <div class="lang">
            <button class="lang__button" onClick$={toggleLang$}>
              RU ▾
            </button>

            {isLangOpen.value && (
              <div class="lang__dropdown">
                <a class="lang__item" href="/">RU</a>
                <a class="lang__item" href="/en">EN</a>
                <a class="lang__item" href="/ro">RO</a>
              </div>
            )}
          </div>
        </nav>

        {/* BURGER BUTTON */}
        <button
          class="header__burger"
          onClick$={toggleMenu$}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* MOBILE MENU */}
      <nav
        class={`header__nav-mobile ${isMenuOpen.value ? 'header__nav-mobile--open' : ''
          }`}
      >
        <button class="header__nav-mobile-close" onClick$={closeMenu$}>
          ✕
        </button>

        {/* Услуги с тоглом */}
        <div class="header__nav-item">

          <button class="header__link header__link--toggle" onClick$={toggleServices$}>
            Услуги
            <span class="header__link-arrow">{isServicesOpen.value ? '▴' : '▾'}</span>
          </button>

          {isServicesOpen.value && (
            <div class="header__dropdown--mobile">
              <a href="/services/performance-ads" class="header__dropdown-link">Платная реклама</a>
              <a href="/services/social-media-marketing" class="header__dropdown-link">SMM / соцсети</a>
              <a href="/services/design" class="header__dropdown-link">Дизайн и креатив</a>
              <a href="/services/web" class="header__dropdown-link">Web-разработка</a>
            </div>
          )}
        </div>

        {/* Остальные пункты как были */}
        <a href="/pricing" class="header__link">
          Цены
        </a>
        <a href="/#consult" class="header__link">
          Консультация
        </a>
        <a href="/projects" class="header__link">
          Портфолио
        </a>
        {/* <a href="/blog" class="header__link">
          Блог
        </a> */}
        <a href="/contact" class="header__link">
          Контакты
        </a>
        <a href="/contact" class="hero-btn">
              Получить предложение
            </a>

        {/* MOBILE LANGUAGE SWITCHER */}
        <div class="header__mobile-langs">
          <div class="lang">
            <button class="lang__button" onClick$={toggleLang$}>
              RU ▾
            </button>

            {isLangOpen.value && (
              <div class="lang__dropdown lang__dropdown--mobile">
                <a class="lang__item" href="/">
                  RU
                </a>
                <a class="lang__item" href="/en">
                  EN
                </a>
                <a class="lang__item" href="/ro">
                  RO
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});