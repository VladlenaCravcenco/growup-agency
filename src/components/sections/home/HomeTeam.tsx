import { component$ } from '@builder.io/qwik';

type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

const TEAM: TeamMember[] = [
  {
    name: 'Aliona Rusu',
    role: 'Founder & Performance Lead',
    photo: '/media/team/aliona.jpg',
  },
  {
    name: 'Vladlena Cravcenco',
    role: 'Web & Product Designer',
    photo: '/media/team/vladlena.jpg',
  },
  {
    name: 'Victoria',
    role: 'SMM / Content',
    photo: '/media/team/member-3.jpg',
  },
  // добавишь остальных, как нужно
];

export const HomeTeam = component$(() => {
  return (
    <section class="home-section team" id="team">
      <div class="home-container">
        <header class="team__header">
          <p class="section-label">Команда</p>
          <h2 class="section-title">Люди, которые ведут ваш рост</h2>
          <p class="section-subtitle">
            Небольшая команда, которая глубоко вникает в продукт, а не
            перекидывает задачи между отделами.
          </p>
        </header>

        <div class="team-grid">
          {TEAM.map((person) => (
            <article class="team-card" key={person.name}>
              <div class="team-card__photo-wrap">
                <img
                  src={person.photo}
                  alt={person.name}
                  class="team-card__photo"
                  loading="lazy"
                />
              </div>
              <h3 class="team-card__name">{person.name}</h3>
              <p class="team-card__role">{person.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});