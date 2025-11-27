import { component$ } from '@builder.io/qwik';

export const HomeClients = component$(() => {
  const clients = [
    'Hanna',
    'Lash Store',
    'Ciao Bella',
    'Aqua Terra',
    'Moft',
    'Mia Bella',
    'LH47',
    'Klapp',
    'Hügge',
    'Straus',
  ];

  return (
    <section class="clients">
      <div class="clients__inner">
        <h2 class="section-title section-title--center">Нам доверяют</h2>

        <div class="clients__grid">
          {clients.map((client) => (
            <div class="clients__item" key={client}>
              {/* потом сюда подставишь реальные SVG/PNG логотипы */}
              <span class="clients__name">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});