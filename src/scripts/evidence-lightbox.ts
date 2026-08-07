interface EvidenceItem {
  src: string;
  title: string;
  caption: string;
}

function collect(): EvidenceItem[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.evidence-card')).map((card) => ({
    src: card.dataset.evidenceSrc ?? '',
    title: card.dataset.evidenceTitle ?? '',
    caption: card.dataset.evidenceCaption ?? '',
  }));
}

let items: EvidenceItem[] = [];
let current = 0;
let overlay: HTMLElement | null = null;

function render(): void {
  if (!overlay || items.length === 0) return;

  const item = items[current];
  const image = overlay.querySelector<HTMLImageElement>('.e-lightbox-image');
  const title = overlay.querySelector<HTMLElement>('.e-lightbox-title');
  const caption = overlay.querySelector<HTMLElement>('.e-lightbox-caption');
  const counter = overlay.querySelector<HTMLElement>('.e-lightbox-counter');
  const prev = overlay.querySelector<HTMLButtonElement>('[data-e-prev]');
  const next = overlay.querySelector<HTMLButtonElement>('[data-e-next]');

  if (image) {
    image.src = item.src;
    image.alt = item.title;
  }
  if (title) title.textContent = item.title;
  if (caption) caption.textContent = item.caption;
  if (counter) counter.textContent = `${current + 1} / ${items.length}`;
  if (prev) prev.disabled = current === 0;
  if (next) next.disabled = current === items.length - 1;
}

function open(index: number): void {
  if (overlay || items.length === 0) return;

  current = index;
  overlay = document.createElement('div');
  overlay.className = 'e-lightbox';
  overlay.innerHTML = `
    <div class="e-lightbox-backdrop" data-e-close></div>
    <div class="e-lightbox-panel">
      <div class="e-lightbox-toolbar">
        <span class="e-lightbox-title"></span>
        <div class="e-lightbox-actions">
          <span class="e-lightbox-counter"></span>
          <button type="button" data-e-close aria-label="Close">✕</button>
        </div>
      </div>
      <div class="e-lightbox-stage">
        <button type="button" class="e-lightbox-nav" data-e-prev aria-label="Previous">‹</button>
        <figure class="e-lightbox-content">
          <img class="e-lightbox-image" alt="" />
          <figcaption class="e-lightbox-caption"></figcaption>
        </figure>
        <button type="button" class="e-lightbox-nav" data-e-next aria-label="Next">›</button>
      </div>
      <p class="e-lightbox-hint">← → to navigate · Esc to close</p>
    </div>`;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  render();

  overlay.querySelectorAll<HTMLElement>('[data-e-close]').forEach((el) => {
    el.addEventListener('click', close);
  });
  overlay.querySelector<HTMLButtonElement>('[data-e-prev]')?.addEventListener('click', () => step(-1));
  overlay.querySelector<HTMLButtonElement>('[data-e-next]')?.addEventListener('click', () => step(1));

  window.addEventListener('keydown', onKey);
}

function step(delta: number): void {
  const next = current + delta;
  if (next < 0 || next >= items.length) return;
  current = next;
  render();
}

function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
}

function close(): void {
  if (!overlay) return;
  overlay.remove();
  overlay = null;
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKey);
}

document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest<HTMLElement>('.evidence-card');
  if (!target) return;

  const cards = Array.from(document.querySelectorAll<HTMLElement>('.evidence-card'));
  const index = cards.indexOf(target);
  if (index >= 0) {
    items = collect();
    open(index);
  }
});
