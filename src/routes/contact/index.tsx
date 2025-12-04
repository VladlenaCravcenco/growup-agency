import { component$, useSignal, $ } from '@builder.io/qwik';
import '../../styles/contact.css';

const WEBHOOK_URL =
  'https://hook.eu1.make.com/2aqkgzjmg8c4lkew52heipg2qi144kl8';

export default component$(() => {
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
    const email = String(formData.get('email') ?? '').trim();
    const niche = String(formData.get('niche') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const budget = String(formData.get('budget') ?? '').trim();
    const goal = String(formData.get('goal') ?? '').trim();

    const website = String(formData.get('website') ?? '').trim();
    const startWhen = String(formData.get('startWhen') ?? '').trim();
    const comment = String(formData.get('comment') ?? '').trim();

    // простая валидация обязательных
    if (!name || !email || !niche || !service || !budget || !goal) {
      error.value = 'Пожалуйста, заполните все обязательные поля.';
      sending.value = false;
      return;
    }

    let page = '';
    if (typeof window !== 'undefined') {
      page = window.location.pathname;
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'contact_form',
          page,

          // базовые поля
          name,
          email,
          niche,
          service,
          budget,
          goal,

          // доп. информация
          website,
          startWhen,
          comment,
        }),
      });

      sent.value = true;
      form.reset();
    } catch (e) {
      error.value = 'Что-то пошло не так при отправке. Попробуйте ещё раз.';
    } finally {
      sending.value = false;
    }
  });

  return (
    <main class="page page--contact">
      {/* Хедер страницы */}
      <section class="contact-hero">
        <div class="contact-hero__inner">
          <h1 class="contact-hero__title">Свяжитесь с GrowUp Agency</h1>
          <p class="contact-hero__subtitle">
            Расскажите пару ключевых вещей о бизнесе — мы вернёмся с идеями и
            предложением в течение 24 часов в рабочие дни.
          </p>
        </div>
      </section>

      {/* Лейаут: слева контакты, справа форма */}
      <section class="contact-layout">
        <div class="contact-layout__inner">
          {/* Контактная информация */}
          <aside class="contact-info">
            <h2 class="contact-info__title">Контакты</h2>

            <div class="contact-info__block">
              <p class="contact-info__label">Email</p>
              <a
                href="mailto:hello@growup.agency"
                class="contact-info__link"
              >
                hello@growup.agency
              </a>
            </div>

            <div class="contact-info__block">
              <p class="contact-info__label">Телеграм</p>
              <a
                href="https://t.me/your_agency"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-info__link"
              >
                @your_agency
              </a>
            </div>

            <div class="contact-info__block">
              <p class="contact-info__label">Instagram</p>
              <a
                href="https://instagram.com/your_agency"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-info__link"
              >
                @your_agency
              </a>
            </div>

            <div class="contact-info__block">
              <p class="contact-info__label">Офис</p>
              <p class="contact-info__text">
                Кишинёв, центр <br />
                Онлайн-встречи для клиентов из любой страны.
              </p>
            </div>
          </aside>

          {/* Форма заявки */}
          <section class="contact-form">
            <h2 class="contact-form__title">
              Короткий мини-бриф для первого контакта
            </h2>
            <p class="contact-form__subtitle">
              Обязательные поля — только самое важное. Это займет около минуты.
            </p>

            <form
              class="contact-form__body"
              preventdefault:submit
              onSubmit$={handleSubmit$}
            >
              {/* Имя */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="name">
                  Ваше имя*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  class="contact-form__input"
                  placeholder="Как к вам обращаться"
                />
              </div>

              {/* Email */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="email">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  class="contact-form__input"
                  placeholder="name@company.com"
                />
              </div>

              {/* Ниша */}
              <div class="contact-form__field">
                <label class="contact-form__label" for="niche">
                  Ниша / сфера деятельности*
                </label>
                <input
                  id="niche"
                  name="niche"
                  type="text"
                  required
                  class="contact-form__input"
                  placeholder="Кофейня, салон красоты, онлайн-курсы, стоматология..."
                />
              </div>

              {/* Услуга */}
              <div class="contact-form__field">
                <label class="contact-form__label" htmlFor="service">
                  Какой формат работы вас интересует?*
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  class="contact-form__select"
                >
                  <option value="" disabled selected>
                    Выберите вариант
                  </option>
                  <option value="Paid Ads">Платная реклама (Meta/Google/TikTok)</option>
                  <option value="SMM">SMM / ведение соцсетей</option>
                  <option value="Design">Дизайн / креативы / айдентика</option>
                  <option value="Web">Web-разработка</option>
                  <option value="Complex">Комплекс: реклама + соцсети + дизайн</option>
                  <option value="Other">Другое</option>
                </select>
              </div>

              {/* Бюджет */}
              <div class="contact-form__field">
                <label class="contact-form__label" htmlFor="budget">
                  Примерный бюджет в месяц / на проект*
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  class="contact-form__select"
                >
                  <option value="" disabled selected>
                    Выберите диапазон
                  </option>
                  <option value="&lt;300">До 300 €</option>
                  <option value="300-500">300–500 €</option>
                  <option value="500-1000">500–1000 €</option>
                  <option value="1000-2000">1000–2000 €</option>
                  <option value="2000+">2000+ €</option>
                  <option value="not-sure">Пока не определился</option>
                </select>
              </div>

              {/* Цель */}
              <div class="contact-form__field">
                <label class="contact-form__label" htmlFor="goal">
                  Какой результат хотите получить?*
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  required
                  class="contact-form__textarea"
                  rows={3}
                  placeholder="Например: увеличить количество заявок, запустить рекламу нового продукта, обновить сайт, упаковать бренд..."
                />
              </div>

              {/* Сайт (опционально) */}
              <div class="contact-form__field contact-form__field--half">
                <label class="contact-form__label" htmlFor="website">
                  Ваш сайт (если есть)
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  class="contact-form__input"
                  placeholder="https://"
                />
              </div>

              {/* Когда стартовать (опционально) */}
              <div class="contact-form__field contact-form__field--half">
                <label class="contact-form__label" htmlFor="startWhen">
                  Когда планируете старт?
                </label>
                <select
                  id="startWhen"
                  name="startWhen"
                  class="contact-form__select"
                >
                  <option value="">Не выбрано</option>
                  <option value="asap">Как можно скорее</option>
                  <option value="week">В течение недели</option>
                  <option value="month">В течение месяца</option>
                  <option value="just-asking">
                    Пока уточняю стоимость / формат
                  </option>
                </select>
              </div>

              {/* Комментарий (опционально) */}
              <div class="contact-form__field">
                <label class="contact-form__label" htmlFor="comment">
                  Комментарий (по желанию)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  class="contact-form__textarea"
                  rows={3}
                  placeholder="Любые детали, ссылки, вопросы. Это поле можно не заполнять."
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
                  Заявка отправлена. Мы вернёмся к вам в течение 24 часов в
                  рабочие дни.
                </p>
              )}

              {/* Кнопка */}
              <button
                type="submit"
                class="btn btn--primary contact-form__submit"
                disabled={sending.value}
              >
                {sending.value ? 'Отправляем…' : 'Отправить заявку'}
              </button>

              <p class="contact-form__note">
                Нажимая на кнопку, вы соглашаетесь с обработкой персональных
                данных.
              </p>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
});