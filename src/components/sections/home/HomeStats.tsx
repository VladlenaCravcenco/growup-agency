import { component$ } from '@builder.io/qwik';
import { useHomePage } from '~/routes/[lang]/layout';

export const HomeStats = component$(() => {
  const { stats } = useHomePage().value;

  return (
    <section class="stats">
      <div class="stats__inner">
        {(stats ?? []).map((item) => (
          <div class="stats__card" key={`${item.value}-${item.label}`}>
            <div class="stats__value">{item.value}</div>
            <div class="stats__label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
});