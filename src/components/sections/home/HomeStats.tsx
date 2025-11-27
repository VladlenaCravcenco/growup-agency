import { component$ } from '@builder.io/qwik';

export const HomeStats = component$(() => {
  const stats = [
    {
      value: '8',
      label: 'Лет успешной работы на рынках Молдовы, Европы и США',
    },
    {
      value: '15',
      label: 'Специалистов в команде Grow Up',
    },
    {
      value: '95%',
      label: 'Клиентов приходят к нам по рекомендации',
    },
  ];

  return (
    <section class="stats">
      <div class="stats__inner">
        {stats.map((item) => (
          <div class="stats__card" key={item.value}>
            <div class="stats__value">{item.value}</div>
            <div class="stats__label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
});