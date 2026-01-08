// src/routes/[lang]/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';

type Lang = 'ru' | 'en' | 'ro';
type LString = { ru?: string; en?: string; ro?: string };
const pick = (v?: LString, lang: Lang = 'ru') => v?.[lang] ?? v?.ru ?? '';

export type HomeProcessStep = {
  title: string;
  text: string;
};

export type TeamMember = {
  photo: string;
  name: string;
  role: string;
  link?: string;
};

export type ClientLogo = {
  src: string;
  alt: string;
  href?: string
};

export type HomeServiceBullet = {
  text: string;
};

export type HomeServiceItem = {
  tag: string;
  title: string;
  link: string;

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


  servicesTitle: string;
  servicesSubtitle: string;
  services: HomeServiceItem[];
  servicesCta: string;
  clientsTitle: string;
  clientsTop: ClientLogo[];
  clientsBottom: ClientLogo[];

  teamEyebrow: string;
  teamTitle: string;
  teamSubtitle: string;
  team: TeamMember[];

  processTitle: string;
  processSteps: HomeProcessStep[];
};

export const useHomePage = routeLoader$<HomePageVM>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';

  const data = await sanityClient.fetch<any>(`
  *[_type=="homePage"][0]{
    hero{ title, subtitle, text, ctaPrimary, ctaSecondary },
    stats[]{ value, label },

    servicesTitle,
    servicesSubtitle,

    services[]{
      tag,
      link,
      title,
      bullets[]{ text }
    },
    servicesCta,

    clientsTitle,
    clientsTop[]{ alt, href, "src": logo.asset->url },
    clientsBottom[]{ alt, href, "src": logo.asset->url },

    teamEyebrow,
    teamTitle,
    teamSubtitle,
    team[]{
      name,
      role,
      link,
      "photo": photo.asset->url,

      processTitle,
      processSteps[]{ title, text },
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

    servicesTitle: pick(data?.servicesTitle, lang),
    servicesSubtitle: pick(data?.servicesSubtitle, lang),

    services: (data?.services ?? []).map((s: any) => ({
      tag: s?.tag ?? '',
      link: s?.link ?? '',
      title: pick(s?.title, lang),

      bullets: (s?.bullets ?? []).map((b: any) => ({
        text: pick(b?.text, lang),
      })),
    })),
    servicesCta: pick(data?.servicesCta, lang),
    clientsTitle: pick(data?.clientsTitle, lang),
    clientsTop: (data?.clientsTop ?? []).map((c: any) => ({
      src: c?.src ?? '',
      alt: c?.alt ?? '',
      href: c?.href || undefined,
    })),
    clientsBottom: (data?.clientsBottom ?? []).map((c: any) => ({
      src: c?.src ?? '',
      alt: c?.alt ?? '',
      href: c?.href || undefined,
    })),

    teamEyebrow: pick(data?.teamEyebrow, lang),
    teamTitle: pick(data?.teamTitle, lang),
    teamSubtitle: pick(data?.teamSubtitle, lang),

    team: (data?.team ?? []).map((m: any) => ({
      photo: m?.photo ?? '',
      name: m?.name ?? '',
      role: pick(m?.role, lang),
      link: m?.link || undefined,
    })),

    processTitle: pick(data?.processTitle, lang),
    processSteps: (data?.processSteps ?? []).map((s: any) => ({
      title: pick(s?.title, lang),
      text: pick(s?.text, lang),
    })),

  };
});

export default component$(() => <Slot />);