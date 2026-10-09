import { SITE_URL, business as B, tracking, DEFAULT_WA_MSG } from './config.mjs';
import { services } from './content.mjs';
import { icon, butterfly, esc } from './components.mjs';

const pageUrl = (slug) => (slug ? `${SITE_URL}/${slug}/` : `${SITE_URL}/`);
const OG_IMAGE = `${SITE_URL}/assets/img/og.jpg`;

// ---------------------------------------------------------------------------
// Dados estruturados (JSON-LD). Um @graph por página, com IDs estáveis entre páginas.
// ---------------------------------------------------------------------------
function schema(page, trail) {
  const url = pageUrl(page.slug);
  const bizId = `${SITE_URL}/#negocio`;
  const personId = `${SITE_URL}/#vanessa`;
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      url: `${SITE_URL}/`,
      name: `${B.brand} | ${B.person}`,
      inLanguage: 'pt-BR',
      publisher: { '@id': bizId },
    },
    {
      '@type': ['BeautySalon', 'HealthAndBeautyBusiness'],
      '@id': bizId,
      name: `${B.brand} | ${B.person}`,
      alternateName: [B.studio, `${B.person} Esteticista`, 'Luminne BC'],
      description:
        'Estética avançada em Balneário Camboriú: remoção de tatuagem e micropigmentação a laser, podologia estética, remoção de sinais, verrugas e queloide, furo humanizado, lobuloplastia sem cortes, clareamento e estrias.',
      url: `${SITE_URL}/`,
      image: OG_IMAGE,
      logo: `${SITE_URL}/assets/img/icon-512.png`,
      telephone: B.phoneE164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: B.address.street,
        addressLocality: B.address.city,
        addressRegion: B.address.state,
        addressCountry: B.address.country,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(B.mapsQuery)}`,
      areaServed: B.areaServed.map((c) => ({ '@type': 'City', name: `${c}, SC` })),
      sameAs: [B.instagram, B.studioInstagram],
      founder: { '@id': personId },
      employee: { '@id': personId },
      knowsLanguage: 'pt-BR',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: B.phoneE164,
        contactType: 'customer service',
        availableLanguage: 'Portuguese',
        url: `https://wa.me/${B.whatsapp}`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tratamentos',
        itemListElement: Object.values(services).map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.summary, url: pageUrl(s.slug) },
        })),
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: B.person,
      jobTitle: B.role,
      worksFor: { '@id': bizId },
      workLocation: { '@id': bizId },
      sameAs: [B.instagram],
      knowsAbout: [
        'Remoção de tatuagem a laser', 'Despigmentação de micropigmentação', 'Podologia estética',
        'Remoção de sinais e verrugas', 'Queloide', 'Furo humanizado', 'Lobuloplastia sem cortes',
        'Clareamento íntimo', 'Tratamento de estrias', 'Limpeza de pele',
      ],
    },
    {
      '@type': page.slug === 'sobre' ? 'AboutPage' : page.slug === 'duvidas' ? 'FAQPage' : 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${SITE_URL}/#site` },
      about: { '@id': bizId },
      primaryImageOfPage: OG_IMAGE,
      ...(trail.length > 1 ? { breadcrumb: { '@id': `${url}#trilha` } } : {}),
    },
  ];

  if (trail.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#trilha`,
      itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: pageUrl(t.slug) })),
    });
  }

  if (page.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#servico`,
      name: page.service.name,
      serviceType: page.service.name,
      description: page.description,
      url,
      provider: { '@id': bizId },
      areaServed: B.areaServed.map((c) => ({ '@type': 'City', name: `${c}, SC` })),
    });
  }

  if (page.faq?.length) {
    const faqNode = {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    // Na página de dúvidas o próprio WebPage já é o FAQPage.
    if (page.slug === 'duvidas') Object.assign(graph[3], { mainEntity: faqNode.mainEntity });
    else graph.push(faqNode);
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

// ---------------------------------------------------------------------------

function analytics() {
  let out = '';
  if (tracking.ga4) {
    out += `<script async src="https://www.googletagmanager.com/gtag/js?id=${tracking.ga4}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${tracking.ga4}');</script>`;
  }
  if (tracking.metaPixel) {
    out += `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${tracking.metaPixel}');fbq('track','PageView');</script>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${tracking.metaPixel}&ev=PageView&noscript=1"></noscript>`;
  }
  return out;
}

export function locationBlock(ctx) {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(B.mapsQuery)}`;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(B.mapsQuery)}&output=embed`;
  return `
  <section class="section" id="onde" aria-labelledby="loc-t">
    <div class="wrap loc">
      <div class="loc__copy">
        <p class="kicker">Onde me encontrar</p>
        <h2 id="loc-t" class="h2">No Centro de <em>Balneário Camboriú</em></h2>
        <address class="loc__list">
          <p>${icon('pin')}<span><strong>${B.studio}</strong><br>${B.address.street}, ${B.address.district}<br>${B.address.city} – ${B.address.state}</span></p>
          <p>${icon('clock')}<span>${B.hours}</span></p>
          <p>${icon('wa')}<span><a href="${ctx.wa(DEFAULT_WA_MSG)}" target="_blank" rel="noopener" data-wa>${B.phoneDisplay}</a> (WhatsApp)</span></p>
          <p>${icon('ig')}<span><a href="${B.instagram}" target="_blank" rel="noopener">${B.instagramHandle}</a> · <a href="${B.studioInstagram}" target="_blank" rel="noopener">${B.studioInstagramHandle}</a></span></p>
        </address>
        <p class="loc__areas">Atendo clientes de ${B.areaServed.slice(0, -1).join(', ')} e ${B.areaServed.at(-1)}.</p>
        <a class="btn btn--wine" href="${mapsLink}" target="_blank" rel="noopener">${icon('pin')}<span>Abrir no Google Maps</span></a>
      </div>
      <div class="loc__map" data-map="${embed}">
        <button class="loc__load" type="button" data-map-load>${icon('pin')}<span>Carregar mapa</span></button>
        <noscript><a href="${mapsLink}">Ver no Google Maps</a></noscript>
      </div>
    </div>
  </section>`;
}

function header(ctx, page) {
  const navItems = [
    ...Object.values(services).filter((s) => s.nav !== 'Outros').map((s) => ({ slug: s.slug, label: s.nav })),
    { slug: 'sobre', label: 'Sobre' },
    { slug: 'duvidas', label: 'Dúvidas' },
  ];
  const nav = navItems
    .map((n) => `<li><a href="${ctx.link(n.slug)}"${n.slug === page.slug ? ' aria-current="page"' : ''}>${n.label}</a></li>`)
    .join('');
  return `
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>
  <header class="top" data-top>
    <div class="wrap top__in">
      <a class="brand" href="${ctx.link('')}" aria-label="${B.person}, estética avançada. Ir para o início">
        ${butterfly('brand__mark')}
        <span class="brand__txt"><span class="brand__name">Vanessa Silvestre</span><span class="brand__sub">estética avançada</span></span>
      </a>
      <nav class="nav" id="menu" aria-label="Principal">
        <ul class="nav__list">${nav}<li class="nav__more"><a href="${ctx.link(services.outros.slug)}">Outros tratamentos</a></li></ul>
        <a class="btn btn--coral btn--sm nav__cta" href="${ctx.wa(page.wa || DEFAULT_WA_MSG)}" target="_blank" rel="noopener" data-wa>${icon('wa')}<span>Agendar avaliação</span></a>
      </nav>
      <button class="burger" type="button" aria-controls="menu" aria-expanded="false" data-burger>
        <span class="burger__open">${icon('menu')}</span><span class="burger__close">${icon('close')}</span><span class="sr">Menu</span>
      </button>
    </div>
  </header>`;
}

function footer(ctx, page) {
  const year = new Date().getFullYear();
  return `
  <footer class="foot">
    <div class="wrap foot__grid">
      <div class="foot__brand">
        ${butterfly('foot__mark')}
        <p class="foot__name">Vanessa Silvestre</p>
        <p class="foot__sub">estética avançada · beleza, cuidado &amp; autoestima</p>
        <p class="foot__small">Atendimento na ${B.studio}.</p>
      </div>
      <nav aria-label="Tratamentos">
        <p class="foot__h">Tratamentos</p>
        <ul>${Object.values(services).map((s) => `<li><a href="${ctx.link(s.slug)}">${s.name}</a></li>`).join('')}</ul>
      </nav>
      <div>
        <p class="foot__h">Contato</p>
        <ul>
          <li><a href="${ctx.wa(DEFAULT_WA_MSG)}" target="_blank" rel="noopener" data-wa>WhatsApp ${B.phoneDisplay}</a></li>
          <li>${B.address.street}<br>${B.address.district}, ${B.address.city} – ${B.address.state}</li>
          <li>${B.hours}</li>
          <li><a href="${B.instagram}" target="_blank" rel="noopener">${B.instagramHandle}</a></li>
          <li><a href="${B.studioInstagram}" target="_blank" rel="noopener">${B.studioInstagramHandle}</a></li>
        </ul>
      </div>
      <div>
        <p class="foot__h">Site</p>
        <ul>
          <li><a href="${ctx.link('')}">Início</a></li>
          <li><a href="${ctx.link('sobre')}">Sobre a Vanessa</a></li>
          <li><a href="${ctx.link('duvidas')}">Dúvidas frequentes</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap foot__legal">
      <p>Os resultados variam de pessoa para pessoa. Todo procedimento é indicado somente após avaliação individualizada.</p>
      <p>© ${year} ${B.person} · ${B.address.city} – ${B.address.state}</p>
    </div>
  </footer>
  <a class="wa-float" href="${ctx.wa(page.wa || DEFAULT_WA_MSG)}" target="_blank" rel="noopener" data-wa data-wa-float aria-label="Falar com a Vanessa no WhatsApp">${icon('wa')}</a>`;
}

export function render(ctx, page) {
  const trail = page.slug && page.slug !== '404'
    ? [{ slug: '', name: 'Início' }, { slug: page.slug, name: page.crumb || page.h1 }]
    : [{ slug: '', name: 'Início' }];
  const url = pageUrl(page.slug === '404' ? '' : page.slug);
  const body = page.body(ctx, page);

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
${page.noindex ? '' : `<link rel="canonical" href="${url}">`}
<link rel="alternate" hreflang="pt-BR" href="${url}">
<meta name="author" content="${B.person}">
<meta name="geo.region" content="BR-SC">
<meta name="geo.placename" content="${B.address.city}">
<meta name="theme-color" content="#7A1A35">
${tracking.googleSiteVerification ? `<meta name="google-site-verification" content="${tracking.googleSiteVerification}">` : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${B.brand} | ${B.person}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Vanessa Silvestre · estética avançada em Balneário Camboriú">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${ctx.asset('assets/img/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${ctx.asset('favicon.ico')}" sizes="32x32">
<link rel="apple-touch-icon" href="${ctx.asset('assets/img/apple-touch-icon.png')}">
<link rel="manifest" href="${ctx.asset('site.webmanifest')}">
<link rel="preload" href="${ctx.asset('assets/fonts/cormorant-garamond-latin-500-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.asset('assets/fonts/montserrat-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.asset('assets/fonts/allura-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.asset('assets/css/site.css')}">
<script type="application/ld+json">${schema(page, trail)}</script>
${analytics()}
</head>
<body class="page-${page.slug || 'home'}">
${header(ctx, page)}
<main id="conteudo">
${body}
</main>
${footer(ctx, page)}
<script src="${ctx.asset('assets/js/site.js')}" defer></script>
</body>
</html>
`;
}
