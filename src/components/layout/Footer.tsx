import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
  return (
    <footer class="footer" id="contacts">
      <div class="footer__inner">
        <div class="footer__brand">
          <div class="footer__logo">GROW UP</div>
          <p>growup@gmail.com</p>
          <p>+373 69 297 954</p>
        </div>
        <div class="footer__social">
          {/* сюда потом иконки */}
        </div>
      </div>
    </footer>
  );
});