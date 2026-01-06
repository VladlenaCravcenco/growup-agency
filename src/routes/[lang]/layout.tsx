// src/routes/[lang]/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';

type Lang = 'ru' | 'en' | 'ro';
type LString = { ru?: string; en?: string; ro?: string };
const pick = (v?: LString, lang: Lang = 'ru') => v?.[lang] ?? v?.ru ?? '';

// ✅ типы для Services
export type HomeServiceBullet = {
  text: string;
};

export type HomeServiceItem = {
  tag: string;
  title: string;
  link: string;
  servicesCta: string;
  bullets: HomeServiceBullet[];
};

export type HomePageVM = {
  hero: {
    title: string;
    subtitle: string;
    text: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: { value: string; label: string }[];

  // ✅ добавили services
  services: HomeServiceItem[];
  
};

export const useHomePage = routeLoader$<HomePageVM>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';

  const data = await sanityClient.fetch<any>(`
    *[_type=="homePage"][0]{
      hero{ title, subtitle, text, ctaPrimary, ctaSecondary },
      stats[]{ value, label },

      // ✅ добавили services
      services[]{
        tag,
        link,
        title,
        servicesCta,
        bullets[]{ text }
      }
    }
  `);

  return {
    hero: {
      title: pick(data?.hero?.title, lang),
      subtitle: pick(data?.hero?.subtitle, lang),
      text: pick(data?.hero?.text, lang),
      ctaPrimary: pick(data?.hero?.ctaPrimary, lang),
      ctaSecondary: pick(data?.hero?.ctaSecondary, lang),
    },

    stats: (data?.stats ?? []).map((s: any) => ({
      value: s?.value ?? '',
      label: pick(s?.label, lang),
    })),

    // ✅ маппинг services
    services: (data?.services ?? []).map((s: any) => ({
      tag: s?.tag ?? '',
      link: s?.link ?? '',
      title: pick(s?.title, lang),
      servicesCta: pick(data?.servicesCta, lang),
      bullets: (s?.bullets ?? []).map((b: any) => ({
        text: pick(b?.text, lang),
      })),
    })),
  };
});

export default component$(() => <Slot />);