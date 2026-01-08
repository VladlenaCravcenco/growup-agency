import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import '~/styles/header.css';

type Locale = 'ru' | 'en' | 'ro';
const LOCALES: Locale[] = ['ru', 'en', 'ro'];

const I18N: Record<Locale, {
  services: string;
  pricing: string;
  consult: string;
  portfolio: string;
  contacts: string;
  getProposal: string;

  paidAds: string;
  smm: string;
  design: string;
  web: string;
}> = {
  ru: {
    services: 'Услуги',
    pricing: 'Цены',
    consult: 'Консультация',
    portfolio: 'Портфолио',
    contacts: 'Контакты',
    getProposal: 'Получить предложение',
    paidAds: 'Платная реклама',
    smm: 'SMM / соцсети',
    design: 'Дизайн и креатив',
    web: 'Web-разработка',
  },
  en: {
    services: 'Services',
    pricing: 'Pricing',
    consult: 'Consultation',
    portfolio: 'Portfolio',
    contacts: 'Contacts',
    getProposal: 'Get a proposal',
    paidAds: 'Paid advertising',
    smm: 'SMM / Social media',
    design: 'Design & Creative',
    web: 'Web development',
  },
  ro: {
    services: 'Servicii',
    pricing: 'Prețuri',
    consult: 'Consultație',
    portfolio: 'Portofoliu',
    contacts: 'Contacte',
    getProposal: 'Cere o ofertă',
    paidAds: 'Publicitate plătită',
    smm: 'SMM / Social media',
    design: 'Design & creație',
    web: 'Dezvoltare web',
  },
};

export const Header = component$(() => {
  const loc = useLocation();

  const isLangOpen = useSignal(false);
  const isMenuOpen = useSignal(false);
  const isServicesOpen = useSignal(false);

  const toggleLang$ = $(() => (isLangOpen.value = !isLangOpen.value));
  const toggleMenu$ = $(() => (isMenuOpen.value = !isMenuOpen.value));
  const closeMenu$ = $(() => (isMenuOpen.value = false));
  const toggleServices$ = $(() => (isServicesOpen.value = !isServicesOpen.value));

  // ✅ текущий язык
  const raw = loc.params.lang as string | undefined;
  const lang: Locale = raw && LOCALES.includes(raw as Locale) ? (raw as Locale) : 'ru';
  const t = I18N[lang];

  // ✅ текущий путь БЕЗ префикса языка
  const pathWithoutLang =
    loc.url.pathname.replace(/^\/(ru|en|ro)(?=\/|$)/, '') || '/';

  const search = loc.url.search || '';
  const hash = loc.url.hash || '';

  // ✅ на ту же страницу, но с другим языком
  const switchTo = (next: Locale) => `/${next}${pathWithoutLang}${search}${hash}`;

  // ✅ helper для внутренних ссылок с языком
  const href = (path: string) => `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;

  // ✅ якоря на главной (важно: всегда ведём на /{lang}/#anchor)
  const home = `/${lang}`;
  const homeAnchor = (id: string) => `${home}#${id}`;

  return (
    <header class="header">
      <div class="header__inner">
        {/* LOGO */}
        <Link href={home} class="header__logo">
          Grow Up
        </Link>

        {/* DESKTOP NAV */}
        <nav class="header__nav header__nav--desktop">
          <div class="header__nav-item header__nav-item--services">
            <Link href={homeAnchor('services')} class="header__link">
              {t.services}
            </Link>

            <div class="header__dropdown">
              <Link href={href('/services/performance-ads')} class="header__dropdown-link">
                {t.paidAds}
              </Link>
              <Link href={href('/services/social-media-marketing')} class="header__dropdown-link">
                {t.smm}
              </Link>
              <Link href={href('/services/design')} class="header__dropdown-link">
                {t.design}
              </Link>
              <Link href={href('/services/web')} class="header__dropdown-link">
                {t.web}
              </Link>
            </div>
          </div>

          <Link href={href('/pricing')} class="header__link">{t.pricing}</Link>
          <Link href={homeAnchor('consult')} class="header__link">{t.consult}</Link>
          <Link href={href('/projects')} class="header__link">{t.portfolio}</Link>
          <Link href={href('/contact')} class="header__link">{t.contacts}</Link>

          <Link href={href('/contact')} class="hero-btn">
            {t.getProposal}
          </Link>

          {/* LANG */}
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

        {/* BURGER */}
        <button class="header__burger" onClick$={toggleMenu$} type="button" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <nav class={`header__nav-mobile ${isMenuOpen.value ? 'header__nav-mobile--open' : ''}`}>
        <button class="header__nav-mobile-close" onClick$={closeMenu$} type="button" aria-label="Close">
          ✕
        </button>

        <div class="header__nav-item">
          <button
            class="header__link header__link--toggle"
            onClick$={toggleServices$}
            type="button"
          >
            {t.services}
            <span class="header__link-arrow">{isServicesOpen.value ? '▴' : '▾'}</span>
          </button>

          {isServicesOpen.value && (
            <div class="header__dropdown--mobile">
              <Link href={href('/services/performance-ads')} class="header__dropdown-link" onClick$={closeMenu$}>
                {t.paidAds}
              </Link>
              <Link href={href('/services/social-media-marketing')} class="header__dropdown-link" onClick$={closeMenu$}>
                {t.smm}
              </Link>
              <Link href={href('/services/design')} class="header__dropdown-link" onClick$={closeMenu$}>
                {t.design}
              </Link>
              <Link href={href('/services/web')} class="header__dropdown-link" onClick$={closeMenu$}>
                {t.web}
              </Link>
            </div>
          )}
        </div>

        <Link href={href('/pricing')} class="header__link" onClick$={closeMenu$}>{t.pricing}</Link>
        <Link href={homeAnchor('consult')} class="header__link" onClick$={closeMenu$}>{t.consult}</Link>
        <Link href={href('/projects')} class="header__link" onClick$={closeMenu$}>{t.portfolio}</Link>
        <Link href={href('/contact')} class="header__link" onClick$={closeMenu$}>{t.contacts}</Link>

        <Link href={href('/contact')} class="hero-btn" onClick$={closeMenu$}>
          {t.getProposal}
        </Link>

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