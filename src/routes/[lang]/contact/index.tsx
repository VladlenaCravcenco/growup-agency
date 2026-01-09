import { component$, useSignal, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import '~/styles/contact.css';

const WEBHOOK_URL =
  'https://hook.eu1.make.com/2aqkgzjmg8c4lkew52heipg2qi144kl8';

type Lang = 'ru' | 'en' | 'ro';
const LOCALES: Lang[] = ['ru', 'en', 'ro'];

const T: Record<Lang, any> = {
  ru: {
    heroTitle: 'Свяжитесь с GrowUp Agency',
    heroSubtitle:
      'Расскажите пару ключевых вещей о бизнесе — мы вернёмся с идеями и предложением в течение 24 часов в рабочие дни.',
    contactsTitle: 'Контакты',
    emailLabel: 'Email',
    telegramLabel: 'Телеграм',
    instagramLabel: 'Instagram',
    onlineMeetings: 'Онлайн-встречи для клиентов из любой страны.',
    formTitle: 'Короткий мини-бриф для первого контакта',
    formSubtitle: 'Обязательные поля — только самое важное. Это займет около минуты.',

    nameLabel: 'Ваше имя*',
    namePlaceholder: 'Как к вам обращаться',

    phoneLabel: 'Ваш номер телефона*',
    phonePlaceholder: '+373(00)000-000',

    emailFieldLabel: 'Email*',
    emailPlaceholder: 'name@company.com',

    nicheLabel: 'Ниша / сфера деятельности*',
    nichePlaceholder: 'Кофейня, салон красоты, онлайн-курсы, стоматология...',

    serviceLabel: 'Какой формат работы вас интересует?*',
    servicePlaceholder: 'Выберите вариант',
    services: [
      { value: 'Paid Ads', label: 'Платная реклама (Meta/Google/TikTok)' },
      { value: 'SMM', label: 'SMM / ведение соцсетей' },
      { value: 'Design', label: 'Дизайн / креативы / айдентика' },
      { value: 'Web', label: 'Web-разработка' },
      { value: 'Complex', label: 'Комплекс: реклама + соцсети + дизайн' },
      { value: 'Other', label: 'Другое' },
    ],

    budgetLabel: 'Примерный бюджет в месяц / на проект*',
    budgetPlaceholder: 'Выберите диапазон',
    budgets: [
      { value: '<300', label: 'До 300 €' },
      { value: '300-500', label: '300–500 €' },
      { value: '500-1000', label: '500–1000 €' },
      { value: '1000-2000', label: '1000–2000 €' },
      { value: '2000+', label: '2000+ €' },
      { value: 'not-sure', label: 'Пока не определился' },
    ],

    goalLabel: 'Какой результат хотите получить?*',
    goalPlaceholder:
      'Например: увеличить количество заявок, запустить рекламу нового продукта, обновить сайт, упаковать бренд...',

    websiteLabel: 'Ваш сайт (если есть)',
    websitePlaceholder: 'https://',

    startWhenLabel: 'Когда планируете старт?',
    startWhenPlaceholder: 'Не выбрано',
    startWhen: [
      { value: 'asap', label: 'Как можно скорее' },
      { value: 'week', label: 'В течение недели' },
      { value: 'month', label: 'В течение месяца' },
      { value: 'just-asking', label: 'Пока уточняю стоимость / формат' },
    ],

    commentLabel: 'Комментарий (по желанию)',
    commentPlaceholder: 'Любые детали, ссылки, вопросы. Это поле можно не заполнять.',

    errorRequired: 'Пожалуйста, заполните все обязательные поля.',
    errorSend: 'Что-то пошло не так при отправке. Попробуйте ещё раз.',
    successMsg:
      'Заявка отправлена. Мы вернёмся к вам в течение 24 часов в рабочие дни.',

    btnSending: 'Отправляем…',
    btnSubmit: 'Отправить заявку',

    note: 'Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных.',
  },

  en: {
    heroTitle: 'Contact GrowUp Agency',
    heroSubtitle:
      'Share a few key details about your business — we’ll get back with ideas and a proposal within 24 business hours.',
    contactsTitle: 'Contacts',
    emailLabel: 'Email',
    telegramLabel: 'Telegram',
    instagramLabel: 'Instagram',
    onlineMeetings: 'Online meetings for clients worldwide.',
    formTitle: 'Quick mini-brief for the first contact',
    formSubtitle: 'Required fields — only the essentials. Takes about a minute.',

    nameLabel: 'Your name*',
    namePlaceholder: 'How should we address you?',

    phoneLabel: 'Your phone number*',
    phonePlaceholder: '+373(00)000-000',

    emailFieldLabel: 'Email*',
    emailPlaceholder: 'name@company.com',

    nicheLabel: 'Niche / business area*',
    nichePlaceholder: 'Coffee shop, beauty salon, online courses, dentistry...',

    serviceLabel: 'Which service are you interested in?*',
    servicePlaceholder: 'Choose an option',
    services: [
      { value: 'Paid Ads', label: 'Paid advertising (Meta/Google/TikTok)' },
      { value: 'SMM', label: 'SMM / social media management' },
      { value: 'Design', label: 'Design / creatives / identity' },
      { value: 'Web', label: 'Web development' },
      { value: 'Complex', label: 'Bundle: ads + social + design' },
      { value: 'Other', label: 'Other' },
    ],

    budgetLabel: 'Approx. monthly budget / project budget*',
    budgetPlaceholder: 'Choose a range',
    budgets: [
      { value: '<300', label: 'Up to 300 €' },
      { value: '300-500', label: '300–500 €' },
      { value: '500-1000', label: '500–1000 €' },
      { value: '1000-2000', label: '1000–2000 €' },
      { value: '2000+', label: '2000+ €' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],

    goalLabel: 'What outcome do you want?*',
    goalPlaceholder:
      'For example: increase leads, launch ads for a new product, update the website, build the brand...',

    websiteLabel: 'Your website (if any)',
    websitePlaceholder: 'https://',

    startWhenLabel: 'When do you plan to start?',
    startWhenPlaceholder: 'Not selected',
    startWhen: [
      { value: 'asap', label: 'As soon as possible' },
      { value: 'week', label: 'Within a week' },
      { value: 'month', label: 'Within a month' },
      { value: 'just-asking', label: 'Just checking price / format' },
    ],

    commentLabel: 'Comment (optional)',
    commentPlaceholder: 'Any details, links, questions. You may leave this blank.',

    errorRequired: 'Please fill in all required fields.',
    errorSend: 'Something went wrong while sending. Please try again.',
    successMsg:
      'Sent! We’ll get back to you within 24 business hours.',

    btnSending: 'Sending…',
    btnSubmit: 'Send request',

    note: 'By clicking the button, you agree to personal data processing.',
  },

  ro: {
    heroTitle: 'Contactează GrowUp Agency',
    heroSubtitle:
      'Spune-ne câteva lucruri cheie despre business — revenim cu idei și o ofertă în 24 de ore în zilele lucrătoare.',
    contactsTitle: 'Contacte',
    emailLabel: 'Email',
    telegramLabel: 'Telegram',
    instagramLabel: 'Instagram',
    onlineMeetings: 'Întâlniri online pentru clienți din orice țară.',
    formTitle: 'Mini-brief scurt pentru primul contact',
    formSubtitle: 'Câmpuri obligatorii — doar esențialul. Durează ~1 minut.',

    nameLabel: 'Numele tău*',
    namePlaceholder: 'Cum să te apelăm',

    phoneLabel: 'Numărul tău de telefon*',
    phonePlaceholder: '+373(00)000-000',

    emailFieldLabel: 'Email*',
    emailPlaceholder: 'name@company.com',

    nicheLabel: 'Nișă / domeniu de activitate*',
    nichePlaceholder: 'Cafenea, salon, cursuri online, stomatologie...',

    serviceLabel: 'Ce format de colaborare te interesează?*',
    servicePlaceholder: 'Alege o opțiune',
    services: [
      { value: 'Paid Ads', label: 'Publicitate plătită (Meta/Google/TikTok)' },
      { value: 'SMM', label: 'SMM / administrare social media' },
      { value: 'Design', label: 'Design / creativ / identitate' },
      { value: 'Web', label: 'Dezvoltare web' },
      { value: 'Complex', label: 'Pachet: ads + social + design' },
      { value: 'Other', label: 'Altceva' },
    ],

    budgetLabel: 'Buget estimativ lunar / pe proiect*',
    budgetPlaceholder: 'Alege un interval',
    budgets: [
      { value: '<300', label: 'Până la 300 €' },
      { value: '300-500', label: '300–500 €' },
      { value: '500-1000', label: '500–1000 €' },
      { value: '1000-2000', label: '1000–2000 €' },
      { value: '2000+', label: '2000+ €' },
      { value: 'not-sure', label: 'Încă nu sunt sigur' },
    ],

    goalLabel: 'Ce rezultat vrei să obții?*',
    goalPlaceholder:
      'De exemplu: mai multe cereri, lansare ads pentru produs nou, обновare site, construire brand...',

    websiteLabel: 'Site-ul tău (dacă există)',
    websitePlaceholder: 'https://',

    startWhenLabel: 'Când vrei să începi?',
    startWhenPlaceholder: 'Neselectat',
    startWhen: [
      { value: 'asap', label: 'Cât mai curând' },
      { value: 'week', label: 'În decurs de o săptămână' },
      { value: 'month', label: 'În decurs de o lună' },
      { value: 'just-asking', label: 'Doar verific prețul / formatul' },
    ],

    commentLabel: 'Comentariu (opțional)',
    commentPlaceholder: 'Detalii, link-uri, întrebări. Poți lăsa gol.',

    errorRequired: 'Te rugăm să completezi toate câmpurile obligatorii.',
    errorSend: 'A apărut o eroare la trimitere. Încearcă din nou.',
    successMsg:
      'Trimis! Revenim către tine în 24 de ore în zilele lucrătoare.',

    btnSending: 'Se trimite…',
    btnSubmit: 'Trimite cererea',

    note: 'Apăsând butonul, ești de acord cu prelucrarea datelor personale.',
  },
};

export default component$(() => {
  const loc = useLocation();

  const raw = loc.params.lang as string | undefined;
  const lang: Lang = raw && LOCALES.includes(raw as Lang) ? (raw as Lang) : 'ru';
  const t = T[lang];

  const sending = useSignal(false);
  const sent = useSignal(false);
  const error = useSignal<string | null>(null);

  const handleSubmit$ = $(async (_event: SubmitEvent, form: HTMLFormElement) => {
    if (sending.value) return;

    sending.value = true;
    sent.value = false;
    error.value = null;

    const formData = new FormData(form);

    const name = String(formData.get('name') ?? '').trim();
    const countryCodeRaw = String(formData.get('countryCode') ?? '').trim();
    const phoneRaw = String(formData.get('phone') ?? '').trim();

    const phoneDigits = phoneRaw.replace(/\D/g, '');

    const countryCode =
      countryCodeRaw === 'other' || !countryCodeRaw
        ? ''
        : countryCodeRaw;

    const phone = countryCode
      ? `${countryCode} ${phoneDigits}`
      : phoneDigits;

    // базовая валидация
    if (phoneDigits.length < 7) {
      error.value = t.phoneError;
      sending.value = false;
      return;
    }
    const email = String(formData.get('email') ?? '').trim();
    const niche = String(formData.get('niche') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const budget = String(formData.get('budget') ?? '').trim();
    const goal = String(formData.get('goal') ?? '').trim();

    const website = String(formData.get('website') ?? '').trim();
    const startWhen = String(formData.get('startWhen') ?? '').trim();
    const comment = String(formData.get('comment') ?? '').trim();

    if (!name || !phone || !email || !niche || !service || !budget || !goal) {
      error.value = t.errorRequired;
      sending.value = false;
      return;
    }

    // meta
    const pagePath = loc.url.pathname;
    const acceptLanguage = typeof navigator !== 'undefined' ? navigator.language : '';

    const sp = loc.url.searchParams;
    const utm = {
      utm_source: sp.get('utm_source') ?? '',
      utm_medium: sp.get('utm_medium') ?? '',
      utm_campaign: sp.get('utm_campaign') ?? '',
      utm_content: sp.get('utm_content') ?? '',
      utm_term: sp.get('utm_term') ?? '',
    };

    const eventId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : String(Date.now());

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact_form',
          page: pagePath,
          lang,           // язык страницы
          acceptLanguage, // язык браузера
          utm,

          name,
          phone,
          phoneDigits,
          countryCode,
          email,
          niche,
          service,
          budget,
          goal,
          website,
          startWhen,
          comment,

          eventId,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Webhook failed: ${res.status} ${text}`);
      }

      // fbq Lead только после успеха
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq(
          'track',
          'Lead',
          { source: 'brief', lang },
          { eventID: eventId }
        );
      }

      sent.value = true;
      form.reset();
    } catch (e) {
      console.error(e);
      error.value = t.errorSend;
    } finally {
      sending.value = false;
    }
  });

  return (
    <main class="page page--contact">
      {/* Хедер страницы */}
      <section class="contact-hero">
        <div class="contact-hero__inner">
          <h1 class="contact-hero__title">{t.heroTitle}</h1>
          <p class="contact-hero__subtitle">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* Лейаут: слева контакты, справа форма */}
      <section class="contact-layout">
        <div class="contact-layout__inner">
          {/* Контактная информация */}
          <aside class="contact-info">
            <h2 class="contact-info__title">{t.contactsTitle}</h2>

            <div class="contact-info__block">
              <p class="contact-info__label">{t.emailLabel}</p>
              <a href="mailto:growupagency.org@gmail.com" class="contact-info__link">
                growupagency.org@gmail.com
              </a>
            </div>

            <div class="contact-info__block">
              <p class="contact-info__label">{t.telegramLabel}</p>
              <a
                href="https://t.me/alionars"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-info__link"
              >
                @alionars
              </a>
            </div>

            <div class="contact-info__block">
              <p class="contact-info__label">{t.instagramLabel}</p>
              <a
                href="https://www.instagram.com/growupagency?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                class="contact-info__link"
              >
                @growupagency
              </a>
            </div>

            <div class="contact-info__block">
              <p class="contact-info__text">
                <b>Online</b> — {t.onlineMeetings}
              </p>
            </div>
          </aside>

          {/* Форма заявки */}
          <section class="contact-form">
            <h2 class="contact-form__title">{t.formTitle}</h2>
            <p class="contact-form__subtitle">{t.formSubtitle}</p>

            <form
              class="contact-form__body"
              preventdefault:submit
              onSubmit$={handleSubmit$}
            >
              {/* Имя */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="name">
                  {t.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  class="contact-form__input"
                  placeholder={t.namePlaceholder}
                />
              </div>

              {/* Телефон */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="phone">
                  {t.phoneLabel}*
                </label>

                <div class="contact-form__phone">
                  <select
                    id="countryCode"
                    name="countryCode"
                    class="contact-form__select contact-form__select--code"
                  >
                    <option value="+373">🇲🇩 +373</option>
                    <option value="+40">🇷🇴 +40</option>
                    <option value="+380">🇺🇦 +380</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="other">{t.otherCountry}</option>
                  </select>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    class="contact-form__input contact-form__input--phone"
                    inputMode="tel"
                    autocomplete="tel"
                    placeholder={t.phonePlaceholder}
                    onInput$={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.replace(/[^\d]/g, '').slice(0, 15);
                    }}
                  />
                </div>

                <p class="contact-form__hint">{t.phoneHint}</p>
              </div>

              {/* Email */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="email">
                  {t.emailFieldLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  class="contact-form__input"
                  placeholder={t.emailPlaceholder}
                />
              </div>

              {/* Ниша */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="niche">
                  {t.nicheLabel}
                </label>
                <input
                  id="niche"
                  name="niche"
                  type="text"
                  required
                  class="contact-form__input"
                  placeholder={t.nichePlaceholder}
                />
              </div>

              {/* Услуга */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="service">
                  {t.serviceLabel}
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  class="contact-form__select"
                >
                  <option value="" selected disabled>
                    {t.servicePlaceholder}
                  </option>

                  {t.services.map((o: any) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Бюджет */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="budget">
                  {t.budgetLabel}
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  class="contact-form__select"
                >
                  <option value="" selected disabled>
                    {t.budgetPlaceholder}
                  </option>

                  {t.budgets.map((o: any) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Цель */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="goal">
                  {t.goalLabel}
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  required
                  class="contact-form__textarea"
                  rows={3}
                  placeholder={t.goalPlaceholder}
                />
              </div>

              {/* Сайт (опционально) */}
              <div class="contact-form__field contact-form__field--half">
                <label class="contact-form__label" for="website">
                  {t.websiteLabel}
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  class="contact-form__input"
                  placeholder={t.websitePlaceholder}
                />
              </div>

              {/* Когда стартовать (опционально) */}
              <div class="contact-form__field contact-form__field--half">
                <label class="contact-form__label" for="startWhen">
                  {t.startWhenLabel}
                </label>
                <select
                  id="startWhen"
                  name="startWhen"
                  class="contact-form__select"
                  value=""
                >
                  <option value="">
                    {t.startWhenPlaceholder}
                  </option>

                  {t.startWhen.map((o: any) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Комментарий (опционально) */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="comment">
                  {t.commentLabel}
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  class="contact-form__textarea"
                  rows={3}
                  placeholder={t.commentPlaceholder}
                />
              </div>

              {/* Сообщения об ошибке / успехе */}
              {error.value && (
                <p class="contact-form__message contact-form__message--error">
                  {error.value}
                </p>
              )}
              {sent.value && !error.value && (
                <p class="contact-form__message contact-form__message--success">
                  {t.successMsg}
                </p>
              )}

              {/* Кнопка */}
              <button
                type="submit"
                class="btn btn--primary contact-form__submit"
                disabled={sending.value}
              >
                {sending.value ? t.btnSending : t.btnSubmit}
              </button>

              <p class="contact-form__note">{t.note}</p>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
});