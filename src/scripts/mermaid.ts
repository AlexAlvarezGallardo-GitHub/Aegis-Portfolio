import { mermaidOptions } from './mermaidConfig';

async function renderMermaid() {
  const els = document.querySelectorAll<HTMLElement>('.mermaid');
  if (!els.length) return;

  els.forEach((el) => {
    if (!el.dataset.diagram) el.dataset.diagram = el.textContent ?? '';
  });

  const mermaid = (await import('mermaid')).default;
  mermaid.initialize(mermaidOptions);

  await mermaid.run({ querySelector: '.mermaid' });
}

renderMermaid();
