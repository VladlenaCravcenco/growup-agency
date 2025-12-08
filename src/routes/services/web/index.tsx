// src/routes/services/social-media-marketing/index.tsx
import { component$ } from '@builder.io/qwik';
import { ServicePage } from '../../../components/service-page/service-page';
import { web } from './web';

export default component$(() => {
  return <ServicePage data={web} />;
});