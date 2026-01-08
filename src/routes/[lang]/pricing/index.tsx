import { component$, useSignal, QRL } from '@builder.io/qwik';
import { PricingFormat } from '../../../components/sections/pricing/PricingFormat';
import { HomeFaqCta } from '../../../components/sections/home/HomeFaqCta';


  import '~/styles/pricing.css';

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
        name: 'Starter',
        price: '400€/мес',
        // oldPrice: '700€/мес',
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
        name: 'Business',
        price: '580€/мес',
        // oldPrice: '580€/мес',
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
        name: 'Premium',
        price: '700€/мес',
        // oldPrice: '700€/мес',
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
        name: 'Starter',
        price: '350€/мес',
        // oldPrice: '350€/мес',
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
        name: 'Business',
        price: '580€/мес',
        // oldPrice: '580€/мес',
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
        name: 'Premium',
        price: '700€/мес',
        // oldPrice: '700€/мес',
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
        name: 'Starter',
        price: '400€',
        // oldPrice: '700€',
        features: [
          'Разработка логотипа',
          'Подбор фирменных шрифтов',
          'Подбор фирменных цветов',
        ],
      },
      {
        id: 'brand-2',
        name: 'Business',
        price: '1050€',
        // oldPrice: '1200€',
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
        name: 'Premium',
        price: '1200€',
        // oldPrice: '1500€',
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
        name: 'Starter',
        price: 'от 800€',
        // oldPrice: '1200€',
        features: [
          'Разработка лендинга',
          'Анализ ниши (поверхностный)',
          'UI-дизайн в Figma',
          'Адаптивная вёрстка',
          'Подключение формы заявки',
          'Базовая SEO-оптимизация',
          'Подключение домена и хостинга',
        ],
      },
      {
        id: 'web-2',
        name: 'Business',
        price: 'от 1500€',
        // oldPrice: '2100€',
        highlighted: true,
        features: [
          '4–10 страниц',
          'Глубокий анализ конкурентов',
          'Структура + UX-карта',
          'Полный UI/UX дизайн',
          'Анимации: плавные эффекты, hover, параллакс',
          'SEO-база + техническая подготовка',
          'Интеграции: CRM, Email-рассылки, Google Analytics',
          'Форма брифа / квиза',
          'Наполнение стартового контента',
          'Подключение домена и хостинга',
        ],
      },
      {
        id: 'web-3',
        name: 'Premium',
        price: 'от 3500€',
        // oldPrice: '4800€',
        features: [
          'Дизайн-система + гайдлайн',
          'Глубокое UX-исследование',
          'Полный фирменный стиль (мини-брендбук)',
          '10–20+ страниц',
          'Анимации среднего и сложного уровня',
          'Интеграции: CRM, Email-рассылки, Google Analytics',
          'Панель управления контентом (CMS)',
          'Настройка SEO',
          'Мультиязычность (2–3 языка)',
          'Поддержка 1–2 месяца',
          'Подключение домена и хостинга',
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
      <PricingFormat />

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
                    aria-label="Скидка 10% на первый заказ"
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



    <HomeFaqCta />

      {/* Модалка: “Выбери свой тип продвижения” */}
      {showTypeModal.value && <TypeModal onClose$={() => (showTypeModal.value = false)} />}



    
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
              <option>Web разработка</option>
            </select>
          </label>

          <label class="modal-form__field">
            <span class="modal-form__label">Ваше имя</span>
            <input
              class="modal-form__input"
              type="text"
              name="name"
              placeholder="Введите имя"
              required
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

