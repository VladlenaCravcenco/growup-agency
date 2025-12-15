import { component$, useVisibleTask$ } from '@builder.io/qwik';
import '../../../styles/clients.css'



type ClientLogo = { src: string; alt: string, href?: string };



export const HomeClients = component$(() => {
  const top: ClientLogo[] = [
    { src: '/media/clients/hanna.png', alt: 'hanna' },
    { src: '/media/clients/lashstore.png', alt: 'lashstore' },
    { src: '/media/clients/ciao-bella.png', alt: 'ciao-bella' },
    { src: '/media/clients/aquaterra.png', alt: 'aquaterra' },
    { src: '/media/clients/moft.png', alt: 'moft', href: '/projects/moft' },
  ]
  const bottom: ClientLogo[] = [
    { src: '/media/clients/miabella.png', alt: 'miabella' },
    { src: '/media/clients/lh47.png', alt: 'lh47' },
    { src: '/media/clients/klapp.png', alt: 'klapp' },
    { src: '/media/clients/hugge.png', alt: 'hugge' },
    { src: '/media/clients/straus.png', alt: 'straus' },
  ];

  useVisibleTask$(() => {
  const cursor = document.getElementById('cursor-cta');
  if (!cursor) return;

  const move = (e: MouseEvent) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  };

  const onEnter = () => {
    cursor.classList.add('is-visible');
  };

  const onLeave = () => {
    cursor.classList.remove('is-visible');
  };

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
        <h2 class="section-title section-title--center">Нам доверяют</h2>

        <div class="clients__marquee clients__marquee--top">
          <div class="clients__track">
            {[...top, ...top].map((c, i) => {
              const Tag: any = c.href ? 'a' : 'div';
              return (
                <Tag
                  class="clients__item"
                  key={c.src + i}
                  href={c.href}
                  aria-label={c.alt}
                >
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </Tag>
              );
            })}
          </div>
        </div>

        <div class="clients__marquee clients__marquee--bottom">
          <div class="clients__track clients__track--reverse">
            {[...bottom, ...bottom].map((c, i) => {
              const Tag: any = c.href ? 'a' : 'div';
              return (
                <Tag
                  class="clients__item"
                  key={c.src + i}
                  href={c.href}
                  aria-label={c.alt}
                >
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
      <div id="cursor-cta" aria-hidden="true">
        ↗
      </div>
    </section>
  );
});