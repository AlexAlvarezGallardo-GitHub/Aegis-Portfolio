import { mermaidOptions } from './mermaidConfig';

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 8;

function getSvgSize(svgEl: SVGElement): { w: number; h: number } {
  let w = 800;
  let h = 600;

  const vb = svgEl.getAttribute('viewBox');
  if (vb) {
    const parts = vb.split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      w = parts[2];
      h = parts[3];
    }
  }

  const wAttr = svgEl.getAttribute('width');
  const hAttr = svgEl.getAttribute('height');
  const wNum = wAttr && !wAttr.endsWith('%') ? parseFloat(wAttr) : 0;
  const hNum = hAttr && !hAttr.endsWith('%') ? parseFloat(hAttr) : 0;
  if (wNum > 0) w = wNum;
  if (hNum > 0) h = hNum;

  return { w, h };
}

async function renderDiagram(source: HTMLElement, container: HTMLElement): Promise<void> {
  const diagramSource = source.dataset.diagram;

  if (diagramSource) {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize(mermaidOptions);
    const { svg } = await mermaid.render(`lightbox-diagram-${Date.now()}`, diagramSource);

    const holder = document.createElement('div');
    holder.innerHTML = svg;
    const svgEl = holder.querySelector('svg');
    if (svgEl) {
      const { w } = getSvgSize(svgEl);
      svgEl.style.maxWidth = 'none';
      svgEl.style.width = `${w}px`;
      svgEl.style.height = 'auto';
      container.appendChild(svgEl);
    }
  } else {
    const clone = source.cloneNode(true) as HTMLElement;
    clone.classList.add('mermaid-clone');
    container.appendChild(clone);
  }
}

async function openLightbox(source: HTMLElement): Promise<void> {
  if (document.querySelector('.lightbox')) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <div class="lightbox-backdrop" data-close></div>
    <div class="lightbox-panel">
      <div class="lightbox-toolbar">
        <span class="lightbox-title">Architecture diagram</span>
        <div class="lightbox-actions">
          <button type="button" data-zoom="out" aria-label="Zoom out">−</button>
          <button type="button" data-zoom="reset">1:1</button>
          <button type="button" data-zoom="in" aria-label="Zoom in">+</button>
          <button type="button" data-close aria-label="Close">✕</button>
        </div>
      </div>
      <div class="lightbox-stage">
        <div class="lightbox-content"></div>
      </div>
      <p class="lightbox-hint">Scroll to zoom · Drag to pan · Esc to close</p>
    </div>`;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const content = overlay.querySelector('.lightbox-content') as HTMLElement;
  const stage = overlay.querySelector('.lightbox-stage') as HTMLElement;

  let scale = 1;
  let tx = 0;
  let ty = 0;

  const apply = () => {
    content.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  };

  const setZoom = (factor: number) => {
    scale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, scale * factor));
    apply();
  };

  const fitToStage = () => {
    const svgEl = content.querySelector('svg');
    if (!svgEl) return;
    const { w, h } = getSvgSize(svgEl);
    scale = Math.min(1, stage.clientWidth / w, stage.clientHeight / h);
    if (scale < ZOOM_MIN) scale = ZOOM_MIN;
    tx = 0;
    ty = 0;
    apply();
  };

  await renderDiagram(source, content);
  fitToStage();

  overlay.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      setZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15);
    },
    { passive: false }
  );

  overlay.querySelectorAll<HTMLElement>('[data-zoom]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-zoom');
      if (action === 'in') setZoom(1.3);
      else if (action === 'out') setZoom(1 / 1.3);
      else fitToStage();
    });
  });

  overlay.querySelectorAll<HTMLElement>('[data-close]').forEach((btn) => {
    btn.addEventListener('click', close);
  });

  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  const onPointerDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    stage.classList.add('is-dragging');
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    tx += e.clientX - lastX;
    ty += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    apply();
  };
  const onPointerUp = () => {
    dragging = false;
    stage.classList.remove('is-dragging');
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  };

  stage.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('keydown', onKey);

  function close(): void {
    overlay.remove();
    document.body.style.overflow = '';
    stage.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('keydown', onKey);
  }
}

document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('.mermaid');
  if (target) {
    void openLightbox(target as HTMLElement);
  }
});
