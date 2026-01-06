// src/routes/[lang]/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';

type Lang = 'ru' | 'en' | 'ro';
type LString = { ru?: string; en?: string; ro?: string };

const pick = (v?: LString, lang: Lang = 'ru') =>
  v?.[lang] ?? v?.ru ?? '';

export type HomeHeroVM = {
  title: string;
  subtitle: string;
  text: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type HomeStatItem = {
  value: string;
  label: string;
};

export type HomePageVM = {
  hero: HomeHeroVM;
  stats: HomeStatItem[];
};

export const useHomePage = routeLoader$<HomePageVM>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';

  const data = await sanityClient.fetch(
    `*[_type=="homePage"][0]{
      hero{
        title, subtitle, text, ctaPrimary, ctaSecondary
      },
      stats[]{
        value,
        label
      }
    }`
  );

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
  };
});

export default component$(() => <Slot />);