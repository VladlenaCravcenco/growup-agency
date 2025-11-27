import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <header class="header">
      <div class="header__inner">
        <a href="/" class="header__logo">Grow Up</a>

        <nav class="header__nav">
          <a href="/pricing" class="header__link">Цены</a>
          <a href="/#consult" class="header__link">Консультация</a>
          <a href="/portfolio" class="header__link">Портфолио</a>
          <a href="/#contacts" class="header__link">Контакты</a>
        </nav>

        <div class="header__lang">
          <a href="/" class="header__lang-item header__lang-item--active">RU</a>
          <a href="/en" class="header__lang-item">EN</a>
          <a href="/ro" class="header__lang-item">RO</a>
        </div>
      </div>
    </header>
  );
});