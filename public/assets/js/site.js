(() => {
  const top = document.querySelector('[data-top]');
  const burger = document.querySelector('[data-burger]');

  // Sombra no header e botão flutuante do WhatsApp conforme a rolagem
  const float = document.querySelector('[data-wa-float]');
  document.documentElement.classList.add('js');
  const onScroll = () => {
    if (top) top.classList.toggle('is-scrolled', window.scrollY > 8);
    if (float) float.classList.toggle('is-visible', window.scrollY > 520);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  if (burger && top) {
    const setOpen = (open) => {
      top.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', () => setOpen(!top.classList.contains('is-open')));
    top.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  }

  // Mapa só carrega quando a pessoa pede (página mais leve e sem cookies do Google de cara)
  document.querySelectorAll('[data-map]').forEach((box) => {
    const btn = box.querySelector('[data-map-load]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = box.dataset.map;
      iframe.title = 'Mapa: Luminne Estética & Beleza, Rua 3000, 943, Centro, Balneário Camboriú';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      box.appendChild(iframe);
      btn.remove();
    });
  });

  // Conversão: clique no WhatsApp vira evento no GA4 e no Pixel (se estiverem configurados)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-wa]');
    if (!link) return;
    const where = link.hasAttribute('data-wa-float') ? 'botao_flutuante' : (link.closest('section, header, footer')?.className.split(' ')[0] || 'pagina');
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { method: 'whatsapp', location: where, page_path: location.pathname });
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', { content_name: 'whatsapp', content_category: where });
    }
  });
})();
