import { component$, Slot } from '@builder.io/qwik';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import '../styles/global.css';

export default component$(() => {
  return (
    <div class="page">
      <Header />
      <main class="page__content">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});