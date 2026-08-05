async function renderMermaid() {
  const els = document.querySelectorAll<HTMLElement>('.mermaid');
  if (!els.length) return;

  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'dark',
    themeVariables: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      primaryColor: '#18181b',
      primaryTextColor: '#fafafa',
      primaryBorderColor: '#d4af37',
      lineColor: '#a1a1aa',
      secondaryColor: '#111113',
      tertiaryColor: '#18181b',
      textColor: '#fafafa',
      edgeLabelBackground: '#111113',
      clusterBkg: '#111113',
      clusterBorder: '#3f3f46',
      actorBkg: '#18181b',
      actorBorder: '#d4af37',
      actorTextColor: '#fafafa',
      labelBoxBkgColor: '#18181b',
      labelTextColor: '#fafafa',
      noteBkgColor: '#111113',
      noteTextColor: '#fafafa',
      noteBorderColor: '#3f3f46',
    },
  });

  await mermaid.run({ querySelector: '.mermaid' });
}

renderMermaid();
