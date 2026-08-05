import { animate, inView } from 'motion';

const format = (value: number, decimals: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

inView(
  '.counter',
  (el) => {
    const target = Number(el.getAttribute('data-target') ?? 0);
    const decimals = Number(el.getAttribute('data-decimals') ?? 0);
    const prefix = el.getAttribute('data-prefix') ?? '';
    const suffix = el.getAttribute('data-suffix') ?? '';

    animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => {
        el.textContent = `${prefix}${format(latest, decimals)}${suffix}`;
      },
    });

    return () => {};
  },
  { amount: 0.4 }
);
