// пример: src/routes/services/smm/index.tsx
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';
import { ServicePage } from '~/components/service-page/service-page';
import { socialmm } from './socialmm';

type SanityProject = {
  slug: string;
  title: string;
  tagline?: string;
  client?: string;
  image?: string;
};

export const useServiceProjects = routeLoader$<SanityProject[]>(async () => {
  const category = 'smm';

  const projects = await sanityClient.fetch<SanityProject[]>(
    `*[_type=="project" && defined(slug.current) && $category in coalesce(categories, [])]
      | order(_createdAt desc)[0...10]{
        "slug": slug.current,
        title,
        "tagline": heroSubtitle,
        client,
        "image": cover.asset->url
      }`,
    { category }
  );

  return projects || [];
});

export default component$(() => {
  const projects = useServiceProjects().value;
  return <ServicePage data={socialmm} projectsFromSanity={projects} />;
});