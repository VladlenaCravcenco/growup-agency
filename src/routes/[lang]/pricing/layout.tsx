// src/routes/[lang]/pricing/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';

type Lang = 'ru' | 'en' | 'ro';
type LString = { ru?: string; en?: string; ro?: string };
type LText = { ru?: string; en?: string; ro?: string };

const pick = (v?: LString | LText, lang: Lang = 'ru') =>
  (v as any)?.[lang] ?? (v as any)?.ru ?? '';

export type CategoryId = 'ads' | 'smm' | 'branding' | 'web';

export type PricingTierVM = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  highlighted?: boolean;
  features: string[];
};

export type PricingCategoryVM = {
  id: CategoryId;
  heading: string;
  title: string;
  subtitle: string;
  tiers: PricingTierVM[];
};

export type PricingPageVM = {
  categories: PricingCategoryVM[];

  discussBtn: string;
  giftAria: string;

  modalTitle: string;
  modalTypeLabel: string;
  modalNameLabel: string;
  modalNamePlaceholder: string;
  modalPhoneLabel: string;
  modalPhonePlaceholder: string;
  modalSubmit: string;
};

export const usePricingPage = routeLoader$<PricingPageVM>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';

  const data = await sanityClient.fetch<any>(`
    *[_type == "pricingPage"][0]{
      categories[]{
        id,
        heading,
        title,
        subtitle,
        tiers[]{
          _key,
          name,
          price,
          oldPrice,
          highlighted,
          features[]{ text }
        }
      },

      discussBtn,
      giftAria,

      modalTitle,
      modalTypeLabel,
      modalNameLabel,
      modalNamePlaceholder,
      modalPhoneLabel,
      modalPhonePlaceholder,
      modalSubmit
    }
  `);

  return {
    categories: (data?.categories ?? []).map((c: any) => ({
      id: (c?.id ?? 'ads') as CategoryId,
      heading: pick(c?.heading, lang),
      title: pick(c?.title, lang),
      subtitle: pick(c?.subtitle, lang),
      tiers: (c?.tiers ?? []).map((t: any) => ({
        id: t?._key ?? crypto.randomUUID(),
        name: pick(t?.name, lang),
        price: pick(t?.price, lang),
        oldPrice: t?.oldPrice ? pick(t?.oldPrice, lang) : undefined,
        highlighted: !!t?.highlighted,
        features: (t?.features ?? []).map((f: any) => pick(f?.text, lang)),
      })),
    })),

    discussBtn: pick(data?.discussBtn, lang),
    giftAria: pick(data?.giftAria, lang),

    modalTitle: pick(data?.modalTitle, lang),
    modalTypeLabel: pick(data?.modalTypeLabel, lang),
    modalNameLabel: pick(data?.modalNameLabel, lang),
    modalNamePlaceholder: pick(data?.modalNamePlaceholder, lang),
    modalPhoneLabel: pick(data?.modalPhoneLabel, lang),
    modalPhonePlaceholder: pick(data?.modalPhonePlaceholder, lang),
    modalSubmit: pick(data?.modalSubmit, lang),
  };
});

export default component$(() => <Slot />);