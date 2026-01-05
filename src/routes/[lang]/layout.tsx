// src/routes/[lang]/index.tsx
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';

import { HomeHero } from '~/components/sections/home/HomeHero';
import { HomeStats } from '~/components/sections/home/HomeStats';
import { HomeServices } from '~/components/sections/home/HomeServices';
import { HomeClients } from '~/components/sections/home/HomeClients';
import { HomeTeam } from '~/components/sections/home/HomeTeam';
import { HomeProcess } from '~/components/sections/home/HomeProcess';
import { HomeFaqCta } from '~/components/sections/home/HomeFaqCta';

type Lang = 'ru' | 'en' | 'ro';

type LString = { ru?: string; en?: string; ro?: string };
const pick = (v?: LString, lang: Lang = 'ru') => v?.[lang] ?? v?.ru ?? '';

export type HomePageVM = {
  hero: {
    title: string;
    subtitle: string;
    text: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  // дальше добавим остальные секции: process/services/faq...
};

export const useHomePage = routeLoader$<HomePageVM>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';

  const data = await sanityClient.fetch<any>(
    `*[_type=="homePage"][0]{
      hero{
        title, subtitle, text, ctaPrimary, ctaSecondary
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
  };
});

export default component$(() => {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeServices />
      <HomeClients />
      <HomeTeam />
      <HomeProcess />
      <HomeFaqCta />
    </>
  );
});