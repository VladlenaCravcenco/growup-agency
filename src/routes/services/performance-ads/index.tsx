// src/routes/services/social-media-marketing/index.tsx
import { component$ } from '@builder.io/qwik';
import { ServicePage } from '../../../components/service-page/service-page';
import { performanceads } from './performance-ads';

export default component$(() => {
  return <ServicePage data={performanceads} />;
});