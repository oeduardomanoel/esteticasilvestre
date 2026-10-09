// Blocos de HTML reaproveitados entre páginas. Cada função recebe `ctx` (links relativos, assets, WhatsApp).

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Ícones de traço fino, no estilo dos destaques do Instagram (linha bordô sobre círculo rosa).
const ICONS = {
  laser: '<path d="M13.5 2.5 5 13.5h6l-1.5 8 8.5-11h-6z"/>',
  foot: '<path d="M9.2 21.5c-2.6 0-3.7-2.3-3.5-5 .2-2.4 1-4 1-6.2 0-2.3 1.4-3.6 3.2-3.6 2 0 3 1.6 2.8 4-.2 2.3-1.3 3.8-1.1 6.4.2 2.4-.3 4.4-2.4 4.4z"/><circle cx="14.6" cy="4.6" r="1.3"/><circle cx="17.4" cy="6.4" r="1.1"/><circle cx="18.9" cy="9.3" r="1"/><circle cx="12" cy="3.2" r="1.2"/>',
  skin: '<path d="M12 3c3.5 4 6 7.2 6 10.4A6 6 0 0 1 6 13.4C6 10.2 8.5 7 12 3z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4"/>',
  ear: '<path d="M7.5 9.5a5 5 0 1 1 10 0c0 3.2-2.7 4.2-3.6 6.3-.8 2-1.4 4.7-4 4.7-1.6 0-2.6-1-2.9-2.3"/><path d="M10.5 9.6a2 2 0 1 1 3.6 1.3c-.7.8-1.6 1.2-1.6 2.6"/><circle cx="9.6" cy="17.7" r=".9"/>',
  glow: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.2"/>',
  face: '<path d="M12 21c-4 0-6.5-3.6-6.5-8.4S8.2 3 12 3s6.5 4.8 6.5 9.6S16 21 12 21z"/><path d="M9.6 11.3h.01M14.4 11.3h.01M10 15.3c1.2.9 2.8.9 4 0"/>',
  check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
  wa: '<path d="M4 20.5l1.2-4.1A8.3 8.3 0 1 1 8.4 19.6z"/><path d="M9.3 8.6c.2-.5.5-.6.8-.6h.6c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .5-.1.6l-.6.7c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.5 2.4.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.9.9c.2.1.3.3.3.5 0 .9-.6 1.8-1.5 2-1 .2-2.6-.1-4.6-1.8-1.5-1.3-2.5-2.9-2.8-4-.3-1.1 0-2.1.3-2.5z"/>',
  pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
};

export const icon = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

// Borboleta delicada do logo da Luminne, redesenhada em traço.
export const butterfly = (cls = 'mark') =>
  `<svg class="${cls}" viewBox="0 0 48 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M24 20C21 9 12 2.5 6.5 4.5S3 15 10.5 19c-6 1.6-7.5 7.8-3.6 10.2C11.6 32 19.5 28 24 20z"/>
    <path d="M24 20c3-11 12-17.5 17.5-15.5S45 15 37.5 19c6 1.6 7.5 7.8 3.6 10.2C36.4 32 28.5 28 24 20z"/>
    <path d="M24 13v19M22.5 10.5 20 6.5M25.5 10.5 28 6.5"/>
  </svg>`;

export const waButton = (ctx, msg, label = 'Agendar minha avaliação', cls = 'btn btn--coral') =>
  `<a class="${cls}" href="${ctx.wa(msg)}" target="_blank" rel="noopener" data-wa>${icon('wa')}<span>${label}</span></a>`;

export const checklist = (items, cls = '') =>
  `<ul class="checklist ${cls}">${items
    .map((i) => `<li><span class="checklist__dot">${icon('check')}</span><span>${i}</span></li>`)
    .join('')}</ul>`;

export const steps = (items) =>
  `<ol class="steps">${items
    .map(
      (s, i) =>
        `<li class="step"><span class="step__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3 class="step__t">${s.t}</h3><p>${s.d}</p></li>`
    )
    .join('')}</ol>`;

export const faqList = (items) =>
  `<div class="faq">${items
    .map(
      (f) =>
        `<details class="faq__item"><summary><span>${f.q}</span><span class="faq__plus" aria-hidden="true"></span></summary><div class="faq__a"><p>${f.a}</p></div></details>`
    )
    .join('')}</div>`;

// Resumo em formato pergunta-resposta logo no topo: é o trecho que buscadores e IAs citam.
export const answerBox = (title, items) =>
  `<aside class="answer" aria-label="Resumo rápido"><p class="answer__label">${title}</p>${checklist(items, 'checklist--tight')}</aside>`;

export const ctaBand = (ctx, msg, title = 'Sua nova fase começa com uma conversa.', text = 'Me chama no WhatsApp, conta o que te incomoda e a gente marca sua avaliação. Atendimento com hora marcada no Centro de Balneário Camboriú.') =>
  `<section class="cta-band" aria-labelledby="cta-t">
    <div class="wrap cta-band__in">
      ${butterfly('cta-band__mark')}
      <h2 id="cta-t" class="cta-band__t">${title}</h2>
      <p class="cta-band__p">${text}</p>
      <div class="cta-band__actions">${waButton(ctx, msg)}<span class="cta-band__tel">ou ligue <a href="tel:${ctx.biz.phoneE164}">${ctx.biz.phoneDisplay}</a></span></div>
    </div>
  </section>`;

// Foto opcional: se o arquivo existir no build, mostra a foto; senão, um quadro ilustrado da marca.
export const photoFrame = (ctx, key, alt, caption, cls = '') => {
  const src = ctx.photo(key);
  const inner = src
    ? `<img src="${src}" alt="${esc(alt)}" width="900" height="1200" loading="lazy" decoding="async">`
    : `<div class="polaroid__art" role="img" aria-label="${esc(alt)}">${butterfly('polaroid__mark')}<span class="polaroid__script">Vanessa Silvestre</span><span class="polaroid__small">estética avançada</span></div>`;
  return `<figure class="polaroid ${cls}"><div class="polaroid__img">${inner}</div><figcaption>${caption}</figcaption></figure>`;
};

export const breadcrumbs = (ctx, trail) =>
  `<nav class="crumbs" aria-label="Você está em"><ol>${trail
    .map((t, i) =>
      i < trail.length - 1
        ? `<li><a href="${ctx.link(t.slug)}">${t.name}</a></li>`
        : `<li aria-current="page">${t.name}</li>`
    )
    .join('')}</ol></nav>`;
