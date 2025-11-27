import { component$, useStore, $ } from '@builder.io/qwik';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'Как происходит коммуникация и отчётность во время работы?',
    answer:
      'Мы фиксируем цели на старте, затем созваниваемся по результатам спринтов и отправляем отчёты с цифрами и выводами. У вас всегда есть понятная картина, что происходит с бюджетом и результатами.',
  },
  {
    question: 'Какой бюджет нам нужен на маркетинг?',
    answer:
      'Минимальный тестовый бюджет обсуждаем на старте — он зависит от ниши и гео. Мы не тратим деньги “просто чтобы крутилось”: сначала считаем воронку и экономику, потом предлагаем реалистичный бюджет.',
  },
  {
    question: 'Сколько времени нужно, чтобы увидеть результат?',
    answer:
      'Обычно первые выводы по гипотезам и креативам видны в течение 2–4 недель. Дальше мы усиливаем рабочие связки и масштабируем объёмы.',
  },
];

export const HomeFAQ = component$(() => {
  const state = useStore<{ openIndex: number | null }>({ openIndex: 0 });

  const toggle = $((index: number) => {
    state.openIndex = state.openIndex === index ? null : index;
  });

  return (
    <section class="faq">
      <div class="faq__inner">
        <h2 class="section-title">Частые вопросы</h2>

        <div class="faq__list">
          {faqItems.map((item, index) => {
            const isOpen = state.openIndex === index;
            return (
              <div
                class={['faq__item', isOpen ? 'faq__item--open' : ''].join(' ')}
                key={item.question}
              >
                <button
                  type="button"
                  class="faq__question"
                  onClick$={() => toggle(index)}
                >
                  <span>{item.question}</span>
                  <span class={['faq__icon', isOpen ? 'faq__icon--open' : ''].join(' ')}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div class="faq__answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});