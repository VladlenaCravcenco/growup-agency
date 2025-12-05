import { component$, useSignal, $ } from '@builder.io/qwik';
import '../../styles/header.css';

export const Header = component$(() => {
  const isLangOpen = useSignal(false);
  const isMenuOpen = useSignal(false);

  const toggleLang$ = $(() => (isLangOpen.value = !isLangOpen.value));
  const toggleMenu$ = $(() => (isMenuOpen.value = !isMenuOpen.value));
  const closeMenu$ = $(() => (isMenuOpen.value = false));

  return (
    <header class="header">
      <div class="header__inner">

        {/* LOGO */}
        <a href="/" class="header__logo">Grow Up</a>

        {/* DESKTOP NAVIGATION */}
        <nav class="header__nav header__nav--desktop">
          <a href="/pricing" class="header__link">Цены</a>
          <a href="/#consult" class="header__link">Консультация</a>
          <a href="/projects" class="header__link">Портфолио</a>
          <a href="/blog" class="header__link">Блог</a>
          <a href="/contact" class="header__link">Контакты</a>

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
      <nav class={`header__nav-mobile ${isMenuOpen.value ? 'header__nav-mobile--open' : ''}`}>
        
        <button class="header__nav-mobile-close" onClick$={closeMenu$}>✕</button>

        <a href="/pricing" class="header__mobile-link" onClick$={closeMenu$}>Цены</a>
        <a href="/#consult" class="header__mobile-link" onClick$={closeMenu$}>Консультация</a>
        <a href="/projects" class="header__mobile-link" onClick$={closeMenu$}>Портфолио</a>
        <a href="/blog" class="header__mobile-link" onClick$={closeMenu$}>Блог</a>
        <a href="/contact" class="header__mobile-link" onClick$={closeMenu$}>Контакты</a>

        {/* MOBILE LANGUAGE SWITCHER */}
        <div class="header__mobile-langs">
          <div class="lang">
            <button class="lang__button" onClick$={toggleLang$}>
              RU ▾
            </button>

            {isLangOpen.value && (
              <div class="lang__dropdown lang__dropdown--mobile">
                <a class="lang__item" href="/">RU</a>
                <a class="lang__item" href="/en">EN</a>
                <a class="lang__item" href="/ro">RO</a>
              </div>
            )}
          </div>
        </div>

      </nav>
    </header>
  );
});