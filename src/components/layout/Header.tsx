import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import '../../styles/header.css';

type Locale = 'ru' | 'en' | 'ro';
const LOCALES: Locale[] = ['ru', 'en', 'ro'];

export const Header = component$(() => {
  const loc = useLocation();

  const isLangOpen = useSignal(false);
  const isMenuOpen = useSignal(false);
  const isServicesOpen = useSignal(false);

  const toggleLang$ = $(() => (isLangOpen.value = !isLangOpen.value));
  const toggleMenu$ = $(() => (isMenuOpen.value = !isMenuOpen.value));
  const closeMenu$ = $(() => (isMenuOpen.value = false));
  const toggleServices$ = $(() => (isServicesOpen.value = !isServicesOpen.value));

  // ✅ безопасно определяем текущий язык
  const raw = loc.params.lang as string | undefined;
  const lang: Locale = raw && LOCALES.includes(raw as Locale) ? (raw as Locale) : 'ru';

  // ✅ текущий путь БЕЗ префикса языка (/ru, /en, /ro)
  const pathWithoutLang =
    loc.url.pathname.replace(/^\/(ru|en|ro)(?=\/|$)/, '') || '/';

  const search = loc.url.search || '';
  const hash = loc.url.hash || '';

  // ✅ ссылка на текущую страницу в другом языке
  const switchTo = (next: Locale) => `/${next}${pathWithoutLang}${search}${hash}`;

  // ✅ быстрый хелпер для внутренних ссылок (чтобы не писать руками `/${lang}`)
  const href = (path: string) => `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;

  return (
    <header class="header">
      <div class="header__inner">
        {/* LOGO */}
        <Link href={`/${lang}`} class="header__logo">
          Grow Up
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav class="header__nav header__nav--desktop">
          <div class="header__nav-item header__nav-item--services">
            {/* ✅ якорь на главной */}
            <Link href={`/${lang}#services`} class="header__link">
              Услуги
            </Link>

            {/* dropdown услуг */}
            <div class="header__dropdown">
              <Link href={href('/services/performance-ads')} class="header__dropdown-link">
                Платная реклама
              </Link>
              <Link href={href('/services/social-media-marketing')} class="header__dropdown-link">
                SMM / соцсети
              </Link>
              <Link href={href('/services/design')} class="header__dropdown-link">
                Дизайн и креатив
              </Link>
              <Link href={href('/services/web')} class="header__dropdown-link">
                Web-разработка
              </Link>
            </div>
          </div>

          {/* Остальные пункты */}
          <Link href={href('/pricing')} class="header__link">Цены</Link>
          <Link href={`/${lang}#consult`} class="header__link">Консультация</Link>
          <Link href={href('/projects')} class="header__link">Портфолио</Link>
          <Link href={href('/contact')} class="header__link">Контакты</Link>

          <Link href={href('/contact')} class="hero-btn">
            Получить предложение
          </Link>

          {/* DESKTOP LANGUAGE SWITCHER */}
          <div class="lang">
            <button class="lang__button" onClick$={toggleLang$} type="button">
              {lang.toUpperCase()} ▾
            </button>

            {isLangOpen.value && (
              <div class="lang__dropdown">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    class="lang__item"
                    href={switchTo(l)}
                    onClick$={() => (isLangOpen.value = false)}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* BURGER BUTTON */}
        <button class="header__burger" onClick$={toggleMenu$} type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <nav class={`header__nav-mobile ${isMenuOpen.value ? 'header__nav-mobile--open' : ''}`}>
        <button class="header__nav-mobile-close" onClick$={closeMenu$} type="button">
          ✕
        </button>

        {/* Услуги с тоглом */}
        <div class="header__nav-item">
          <button
            class="header__link header__link--toggle"
            onClick$={toggleServices$}
            type="button"
          >
            Услуги
            <span class="header__link-arrow">{isServicesOpen.value ? '▴' : '▾'}</span>
          </button>

          {isServicesOpen.value && (
            <div class="header__dropdown--mobile">
              <Link href={href('/services/performance-ads')} class="header__dropdown-link" onClick$={closeMenu$}>
                Платная реклама
              </Link>
              <Link href={href('/services/social-media-marketing')} class="header__dropdown-link" onClick$={closeMenu$}>
                SMM / соцсети
              </Link>
              <Link href={href('/services/design')} class="header__dropdown-link" onClick$={closeMenu$}>
                Дизайн и креатив
              </Link>
              <Link href={href('/services/web')} class="header__dropdown-link" onClick$={closeMenu$}>
                Web-разработка
              </Link>
            </div>
          )}
        </div>

        {/* Остальные пункты */}
        <Link href={href('/pricing')} class="header__link" onClick$={closeMenu$}>Цены</Link>
        <Link href={`/${lang}#consult`} class="header__link" onClick$={closeMenu$}>Консультация</Link>
        <Link href={href('/projects')} class="header__link" onClick$={closeMenu$}>Портфолио</Link>
        <Link href={href('/contact')} class="header__link" onClick$={closeMenu$}>Контакты</Link>

        <Link href={href('/contact')} class="hero-btn" onClick$={closeMenu$}>
          Получить предложение
        </Link>

        {/* MOBILE LANGUAGE SWITCHER */}
        <div class="header__mobile-langs">
          <div class="lang">
            <button class="lang__button" onClick$={toggleLang$} type="button">
              {lang.toUpperCase()} ▾
            </button>

            {isLangOpen.value && (
              <div class="lang__dropdown lang__dropdown--mobile">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    class="lang__item"
                    href={switchTo(l)}
                    onClick$={() => {
                      isLangOpen.value = false;
                      closeMenu$();
                    }}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});