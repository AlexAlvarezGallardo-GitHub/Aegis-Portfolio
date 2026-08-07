import { inView } from 'motion';

inView(
  '.reveal',
  (el) => {
    el.classList.add('is-visible');
  },
  { amount: 0.2, once: true }
);
