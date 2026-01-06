import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useHomePage } from '~/routes/[lang]/layout';
import '../../../styles/clients.css';

export const HomeClients = component$(() => {
  const { clientsTitle, clientsTop, clientsBottom } = useHomePage().value;

  useVisibleTask$(() => {
    const cursor = document.getElementById('cursor-cta');
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onEnter = () => cursor.classList.add('is-visible');
    const onLeave = () => cursor.classList.remove('is-visible');

    document.addEventListener('mousemove', move);

    const links = document.querySelectorAll<HTMLElement>('.clients__item[href]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  });

  return (
    <section class="clients">
      <div class="clients__inner">
        <h2 class="section-title section-title--center">{clientsTitle}</h2>

        <div class="clients__marquee clients__marquee--top">
          <div class="clients__track">
            {[...clientsTop, ...clientsTop, ...clientsTop, ...clientsTop].map((c, i) => {
              const Tag: any = c.href ? 'a' : 'div';
              return (
                <Tag class="clients__item" key={c.src + i} href={c.href} aria-label={c.alt}>
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </Tag>
              );
            })}
          </div>
        </div>

        <div class="clients__marquee clients__marquee--bottom">
          <div class="clients__track clients__track--reverse">
            {[...clientsBottom, ...clientsBottom, ...clientsBottom, ...clientsBottom].map((c, i) => {
              const Tag: any = c.href ? 'a' : 'div';
              return (
                <Tag class="clients__item" key={c.src + i} href={c.href} aria-label={c.alt}>
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </Tag>
              );
            })}
          </div>
        </div>
      </div>

      <div id="cursor-cta" aria-hidden="true">↗</div>
    </section>
  );
});