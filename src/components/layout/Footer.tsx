import { component$ } from '@builder.io/qwik';
import '../../styles/footer.css';

export const Footer = component$(() => {
  const year = new Date().getFullYear();

  return (
    <footer class="footer">
      <div class="footer__inner">
        {/* Левая колонка — о компании */}
        <div class="footer__col footer__col--brand">
          <h3 class="footer__logo">GrowUp Agency</h3>
          <p class="footer__text">
            Маркетинг, сайты и визуал для тех, кто хочет расти быстрее конкурентов —
            без лишней воды и сложностей.
          </p>
        </div>

        {/* Середина — быстрые ссылки */}
        <div class="footer__col">
          <h4 class="footer__heading">Навигация</h4>
          <ul class="footer__links">
            <li><a href="/">Главная</a></li>
            <li><a href="/services">Услуги</a></li>
            <li><a href="/projects">Кейсы</a></li>
            <li><a href="/contact">Контакты</a></li>
          </ul>
        </div>

        {/* Правая колонка — контакты + соцсети */}
        <div class="footer__col footer__col--contact">
          <h4 class="footer__heading">Свяжитесь с нами</h4>

          <div class="footer__contact-row">
            <span class="footer__contact-label">Телефон</span>
            <a href="tel:+37300000000" class="footer__contact-value">
              +373&nbsp;00&nbsp;000&nbsp;000
            </a>
          </div>

          <div class="footer__contact-row">
            <span class="footer__contact-label">Email</span>
            <a
              href="mailto:hello@growup.agency"
              class="footer__contact-value"
            >
              hello@growup.agency
            </a>
          </div>

          <div class="footer__social-wrap">
            <span class="footer__social-label">Мы в соцсетях</span>
            <div class="footer__social-list">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="footer__social-btn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 8.98h4v12H3v-12zm6.5 0h3.8v1.64h.05c.53-.98 1.82-2.02 3.75-2.02 4 0 4.75 2.63 4.75 6.05v6.33h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.46-2.17 2.96v5.7h-4v-12z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                class="footer__social-btn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.28 2 11.62c0 3.93 2.53 7.29 6.11 8.51-.08-.72-.15-1.82.03-2.6.17-.73 1.11-4.67 1.11-4.67s-.28-.57-.28-1.41c0-1.32.77-2.31 1.72-2.31.81 0 1.21.61 1.21 1.34 0 .82-.52 2.06-.79 3.2-.22.95.46 1.72 1.37 1.72 1.64 0 2.9-1.73 2.9-4.22 0-2.21-1.59-3.75-3.85-3.75-2.62 0-4.16 1.97-4.16 4 0 .79.3 1.64.68 2.1a.27.27 0 01.06.26c-.06.29-.2.95-.23 1.08-.04.17-.14.21-.32.13-1.19-.55-1.93-2.27-1.93-3.65 0-2.97 2.16-5.7 6.23-5.7 3.27 0 5.82 2.33 5.82 5.45 0 3.25-2.05 5.87-4.9 5.87-.96 0-1.86-.5-2.17-1.09l-.59 2.24c-.21.82-.78 1.85-1.16 2.48.87.27 1.79.42 2.74.42 5.52 0 10-4.28 10-9.62C22 6.28 17.52 2 12 2z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/growupagency/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="footer__social-btn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                class="footer__social-btn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23 7.2s-.2-1.65-.85-2.4A3.07 3.07 0 0020 3.9C17.6 3.7 12 3.7 12 3.7s-5.6 0-8 .2a3.07 3.07 0 00-2.15.9C1.2 5.6 1 7.2 1 7.2S.8 9.05.8 10.9v2.2C.8 14.95 1 16.8 1 16.8s.2 1.65.85 2.4c.55.65 1.3 1.1 2.15 1.2 2.4.2 8 .2 8 .2s5.6 0 8-.2a3.07 3.07 0 002.15-.9c.65-.75.85-2.4.85-2.4s.2-1.85.2-3.7v-2.2c0-1.85-.2-3.7-.2-3.7zM10 15.2V8.8l6 3.2-6 3.2z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@growupagencyy?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                class="footer__social-btn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 7.5a5.5 5.5 0 01-4-1.6v8.3a6.9 6.9 0 11-6.9-6.9c.4 0 .7 0 1 .1v3.7a3.2 3.2 0 103.2 3.2V2h3a5.5 5.5 0 005.5 5.5h-.9z" />
                </svg>
              </a>

              {/* Google Business / Google Maps */}
              <a
                href="https://maps.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Business"
                class="footer__social-btn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a7 7 0 00-7 7c0 4.2 5.6 10.3 6.3 11 .2.2.5.3.7.3s.5-.1.7-.3C13.4 19.3 19 13.2 19 9a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119 9a2.5 2.5 0 013 2.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {year} GrowUp Agency. Все права защищены.</p>
      </div>
    </footer>
  );
});