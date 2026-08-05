import { inView } from 'motion';

inView(
  '.reveal',
  (el) => {
    el.classList.add('is-visible');
    return () => el.classList.remove('is-visible');
  },
  { amount: 0.2 }
);
