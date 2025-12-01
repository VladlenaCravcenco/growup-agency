import { component$, useSignal, QRL } from '@builder.io/qwik';
import { PricingFormat } from '../../components/sections/pricing/PricingFormat';
import { GlobalDiscount } from '~/components/discount/GlobalDiscount';

import '../../styles/pricing.css';

type Tier = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  features: string[];
  highlighted?: boolean;
};

type CategoryId = 'ads' | 'smm' | 'branding' | 'web';

type Category = {
  id: CategoryId;
  title: string;
  subtitle: string;
  heading: string;
  tiers: Tier[];
};

const PRICING: Category[] = [
  {
    id: 'ads',
    title: 'ПЛАТНАЯ РЕКЛАМА',
    subtitle: 'выбери свой план',
    heading: 'Paid Ads',
    tiers: [
      {
        id: 'ads-1',
        name: 'Тариф 1',
        price: '400€/мес',
        oldPrice: '400€/мес',
        features: [
          'Анализ ситуации клиента (продукт/услуга, ниша)',
          'Анализ конкурентов',
          'Разработка рекламных офферов',
          'Распределение бюджета до 400€',
          'Запуск тестовой рекламной кампании',
          'Запуск основной рекламной кампании',
          'Анализ кампаний и оптимизация',
          'Ежемесячная отчётность',
        ],
      },
      {
        id: 'ads-2',
        name: 'Тариф 2',
        price: '580€/мес',
        oldPrice: '580€/мес',
        highlighted: true,
        features: [
          'Анализ ситуации клиента (продукт/услуга, ниша)',
          'Анализ конкурентов',
          'Создание медиаплана с бюджетом до 1000€',
          'Разработка рекламных офферов',
          'Создание рекламных макетов совместно с дизайнером',
          'Запуск тестовой рекламной кампании',
          'Запуск основной рекламной кампании',
          'Анализ кампаний и оптимизация',
          'Ежемесячная отчётность',
        ],
      },
      {
        id: 'ads-3',
        name: 'Тариф 3',
        price: '700€/мес',
        oldPrice: '700€/мес',
        features: [
          'Target Adv – глубокий анализ ситуации клиента',
          'Анализ конкурентов с таблицей показателей',
          'Создание медиаплана с бюджетом от 1000€ и выше',
          'Разработка рекламных офферов',
          'Создание баннеров и анимаций с дизайнером',
          'Запуск тестовой рекламной кампании',
          'Запуск основной рекламной кампании',
          'Анализ кампаний и оптимизация',
          'Еженедельная и ежемесячная отчётность',
        ],
      },
    ],
  },
  {
    id: 'smm',
    title: 'SOCIAL MEDIA MARKETING',
    subtitle: 'Выбери свой план',
    heading: 'SMM',
    tiers: [
      {
        id: 'smm-1',
        name: 'Тариф 1',
        price: '350€/мес',
        oldPrice: '350€/мес',
        features: [
          'Анализ рабочего аккаунта',
          'Контент-план на 10 постов (7 фото, 3 видео)',
          'Создание 50 Stories',
          'Фото-съёмка с обработкой',
          'Монтаж видео для телефона',
          'Платное продвижение 10 постов (бюджет клиента)',
          'Организация съёмок и ведение аккаунта SMM-менеджером',
        ],
      },
      {
        id: 'smm-2',
        name: 'Тариф 2',
        price: '580€/мес',
        oldPrice: '580€/мес',
        highlighted: true,
        features: [
          'Анализ рабочего аккаунта',
          'Контент-план на 12 постов (6 фото, 6 видео)',
          'Создание 50 Stories',
          'Фото-съёмка с обработкой',
          'Монтаж видео',
          'Платное продвижение 12 постов',
          'Организация съёмок и ведение аккаунта SMM-менеджером',
        ],
      },
      {
        id: 'smm-3',
        name: 'Тариф 3',
        price: '700€/мес',
        oldPrice: '700€/мес',
        features: [
          'Анализ рабочего аккаунта',
          'Контент-план на 15 постов (5 фото, 10 видео)',
          'Создание 70 Stories',
          'Фото-съёмка с обработкой',
          'Монтаж видео (телефон / камера)',
          'Платное продвижение 15 постов',
          'Полное сопровождение аккаунта',
        ],
      },
    ],
  },
  {
    id: 'branding',
    title: 'BRANDING',
    subtitle: 'выбери свой план',
    heading: 'Branding',
    tiers: [
      {
        id: 'brand-1',
        name: 'Тариф 1',
        price: '400€/мес',
        oldPrice: '400€/мес',
        features: [
          'Разработка логотипа',
          'Подбор фирменных шрифтов',
          'Подбор фирменных цветов',
        ],
      },
      {
        id: 'brand-2',
        name: 'Тариф 2',
        price: '1050€/мес',
        oldPrice: '1050€/мес',
        highlighted: true,
        features: [
          'Разработка концепции бренда',
          'Разработка логотипа',
          'Разработка брендбука',
          'Рекомендации по интеграции логотипа в дизайн',
          'Подбор шрифтов и цветов',
          'Визуализации на носителях (визитки, форма и т.д.)',
        ],
      },
      {
        id: 'brand-3',
        name: 'Тариф 3',
        price: '1200€/мес',
        oldPrice: '1200€/мес',
        features: [
          'Разработка концепции бренда',
          'Полный брендбук',
          'Рекомендации по интеграции во все каналы',
          'Подбор шрифтов и цветов',
          'Визуализации на всех носителях',
          'Дизайн под печать',
        ],
      },
    ],
  },
  {
    id: 'web',
    title: 'WEB developing',
    subtitle: 'выбери свой план',
    heading: 'WEB',
    tiers: [
      {
        id: 'web-1',
        name: 'Тариф 1',
        price: '400€/мес',
        oldPrice: '400€/мес',
        features: [
          'Разработка логотипа',
          'Подбор фирменных шрифтов',
          'Подбор фирменных цветов',
        ],
      },
      {
        id: 'web-2',
        name: 'Тариф 2',
        price: '1050€/мес',
        oldPrice: '1050€/мес',
        highlighted: true,
        features: [
          'Разработка концепции бренда',
          'Разработка логотипа',
          'Разработка брендбука',
          'Рекомендации по интеграции логотипа в дизайн',
          'Подбор шрифтов и цветов',
          'Визуализации на носителях (визитки, форма и т.д.)',
        ],
      },
      {
        id: 'web-3',
        name: 'Тариф 3',
        price: '1200€/мес',
        oldPrice: '1200€/мес',
        features: [
          'Разработка концепции бренда',
          'Полный брендбук',
          'Рекомендации по интеграции во все каналы',
          'Подбор шрифтов и цветов',
          'Визуализации на всех носителях',
          'Дизайн под печать',
        ],
      },
    ],
  },
];

export default component$(() => {
  const activeCategory = useSignal<CategoryId>('ads');
  const showTypeModal = useSignal(false);


  const currentCategory = () =>
    PRICING.find((c) => c.id === activeCategory.value) ?? PRICING[0];

  return (
    <main class="page page--pricing">
      <section class="pricing">
        <div class="pricing__inner">
          {/* Табы */}
          <div class="pricing-tabs">
            {PRICING.map((cat) => (
              <button
                key={cat.id}
                class={{
                  'pricing-tabs__btn': true,
                  'pricing-tabs__btn--active': activeCategory.value === cat.id,
                }}
                onClick$={() => (activeCategory.value = cat.id)}
              >
                {cat.heading}
              </button>
            ))}
          </div>

          {/* Заголовок секции */}
          <div class="pricing-header">
            <h1 class="section-title section-title--center">
              {currentCategory().title}
            </h1>
            <p class="section-subtitle section-subtitle--center">
              {currentCategory().subtitle}
            </p>
          </div>

          {/* Карточки тарифов */}
          <div class="pricing-grid">
            {currentCategory().tiers.map((tier) => (
              <article
                key={tier.id}
                class={{
                  'plan-card': true,
                  'plan-card--highlighted': tier.highlighted,
                }}
              >
                <div class="plan-card__head">
                  <div class="plan-card__name">{tier.name}</div>
                  <div class="plan-card__price-wrap">
                    <div class="plan-card__price">{tier.price}</div>
                    {tier.oldPrice && (
                      <div class="plan-card__old-price">{tier.oldPrice}</div>
                    )}
                  </div>
                </div>

                <ul class="plan-card__features">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div class="plan-card__actions">
                  <button
                    class="btn btn--primary plan-card__btn-main"
                    onClick$={() => (showTypeModal.value = true)}
                  >
                    Обсудить задачу
                  </button>
                  <button
                    class="plan-card__btn-gift"
                    type="button"
                    aria-label="Скидка 50% на первый заказ"
                    onClick$={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(
                          new CustomEvent('growup-open-discount', {
                            detail: { source: 'popup_gift' },
                          }),
                        );
                        window.localStorage.removeItem('growup_discount_closed');
                      }
                    }}
                  >
                    🎁
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingFormat />

      {/* FAQ + CTA повторно, простая версия */}
      <section class="faq faq--secondary">
        <div class="faq__inner">
          <h2 class="section-title section-title--center">
            Частые вопросы по тарифам
          </h2>
          <p class="section-subtitle section-subtitle--center">
            Коротко о бюджете, сроках и формате работы.
          </p>

          <div class="faq__list">
            <details class="faq__item">
              <summary class="faq__question">
                Как понять, какой тариф подходит именно нам?
              </summary>
              <div class="faq__answer">
                Мы начнём с короткого созвона, разберёмся в вашем продукте и
                целях. По итогу вы получите рекомендацию по тарифу и бюджету
                без обязательств.
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__question">
                Можно ли комбинировать тарифы по рекламе и SMM?
              </summary>
              <div class="faq__answer">
                Да, мы часто собираем гибридные пакеты под конкретный бизнес.
                На странице брифа вы сможете описать пожелания — мы соберём
                персональное предложение.
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__question">
                С каким минимальным бюджетом на рекламу вы работаете?
              </summary>
              <div class="faq__answer">
                Обычно мы рекомендуем стартовать от 400–500€ в месяц на рекламные
                кабинеты, чтобы видеть адекватную статистику и масштабировать
                результат.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section class="cta cta--pricing">
        <div class="cta__inner">
          <h2 class="section-title section-title--center">
            Готовы обсудить задачу?
          </h2>
          <p class="section-subtitle section-subtitle--center">
            Оставьте контакты — вернёмся с предложением в течение 24 часов.
          </p>

          <form class="cta__form" preventdefault:submit>
            <div class="cta__fields">
              <input
                class="cta__input"
                type="text"
                name="name"
                placeholder="Ваше имя"
              />
              <input
                class="cta__input"
                type="tel"
                name="phone"
                placeholder="+373 (__) ___-____"
              />
            </div>
            <button class="btn btn--primary" type="submit">
              Отправить заявку
            </button>
          </form>

          <p class="cta__note">
            Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных.
          </p>
        </div>
      </section>

      {/* Модалка: “Выбери свой тип продвижения” */}
      {showTypeModal.value && <TypeModal onClose$={() => (showTypeModal.value = false)} />}



      <GlobalDiscount />
    </main>
  );
});

/* -------- MODALS ---------- */

type ModalProps = {
  onClose$: QRL<() => void>;
};

export const TypeModal = component$<ModalProps>(({ onClose$ }) => {
  return (
    <div class="modal">
      <div class="modal__backdrop" onClick$={onClose$} />
      <div class="modal__card">
        <button class="modal__close" type="button" onClick$={onClose$}>
          ✕
        </button>

        <h2 class="modal__title">
          Выбери <span>свой</span> тип продвижения
        </h2>

        <form class="modal-form" preventdefault:submit>
          <label class="modal-form__field">
            <span class="modal-form__label">Тип продвижения</span>
            <select class="modal-form__select" name="type">
              <option>Платная реклама</option>
              <option>Social Media Marketing</option>
              <option>Branding</option>
            </select>
          </label>

          <label class="modal-form__field">
            <span class="modal-form__label">Ваше имя</span>
            <input
              class="modal-form__input"
              type="text"
              name="name"
              placeholder="Введите имя"
            />
          </label>

          <label class="modal-form__field">
            <span class="modal-form__label">Телефон</span>
            <input
              class="modal-form__input"
              type="tel"
              name="phone"
              placeholder="+373 (__) ___-____"
            />
          </label>

          <button class="btn btn--primary modal-form__submit" type="submit">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
});

export const DiscountModal = component$<ModalProps>(({ onClose$ }) => {
  return (
    <div class="modal">
      <div class="modal__backdrop" onClick$={onClose$} />
      <div class="modal__card modal__card--narrow">
        <button class="modal__close" type="button" onClick$={onClose$}>
          ✕
        </button>

        <div class="discount-headline">50%</div>
        <p class="discount-subtitle">Для твоего первого заказа!</p>

        <form class="modal-form" preventdefault:submit>
          <label class="modal-form__field">
            <span class="modal-form__label">Ваше имя</span>
            <input
              class="modal-form__input"
              type="text"
              name="name"
              placeholder="Введите имя"
            />
          </label>

          <label class="modal-form__field">
            <span class="modal-form__label">Телефон</span>
            <input
              class="modal-form__input"
              type="tel"
              name="phone"
              placeholder="+373 (__) ___-____"
            />
          </label>

          <button class="btn btn--primary modal-form__submit" type="submit">
            Забрать скидку
          </button>
        </form>

        <button
          type="button"
          class="discount-link"
          onClick$={onClose$}
        >
          мне не нужна скидка
        </button>
      </div>
    </div>
  );
});