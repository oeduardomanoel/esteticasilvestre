// Gera o site estático em /public.
//   node src/build.mjs            -> produção (URLs em pasta: /podologia-estetica/)
//   node src/build.mjs --flat out -> prévia com arquivos .html planos (para visualizar sem servidor)
import { mkdirSync, writeFileSync, cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, business as B, photos, waLink } from './config.mjs';
import { pages, services } from './content.mjs';
import { render, locationBlock } from './layout.mjs';
import { breadcrumbs } from './components.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_ASSETS = join(ROOT, 'src', 'assets');
const flatIdx = process.argv.indexOf('--flat');
const FLAT = flatIdx > -1;
const OUT = FLAT ? join(ROOT, process.argv[flatIdx + 1] || 'preview') : join(ROOT, 'public');
const today = new Date().toISOString().slice(0, 10);

// Caminho do arquivo de saída de cada página.
const fileFor = (p) => {
  if (p.file) return p.file;
  if (!p.slug) return 'index.html';
  return FLAT ? `${p.slug}.html` : `${p.slug}/index.html`;
};

function makeCtx(page) {
  const here = posix.dirname(fileFor(page)); // '.' ou 'slug'
  const up = (target) => posix.relative(here, target) || '.';
  const ctx = {
    biz: B,
    link: (slug) => {
      if (!slug) return FLAT ? up('index.html') : here === '.' ? './' : `${up('.')}/`;
      return FLAT ? up(`${slug}.html`) : `${up(slug)}/`;
    },
    asset: (path) => up(path),
    wa: (msg) => waLink(msg),
    photo: (key) => (photos[key] && existsSync(join(SRC_ASSETS, '..', photos[key])) ? up(photos[key]) : null),
    crumbs: (trail) => breadcrumbs(ctx, trail),
    location: () => locationBlock(ctx),
  };
  return ctx;
}

// ---------------------------------------------------------------------------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(SRC_ASSETS, join(OUT, 'assets'), { recursive: true });
if (existsSync(join(SRC_ASSETS, 'img', 'favicon.ico'))) cpSync(join(SRC_ASSETS, 'img', 'favicon.ico'), join(OUT, 'favicon.ico'));

for (const page of pages) {
  const file = join(OUT, fileFor(page));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(makeCtx(page), page));
}

// ---------------------------------------------------------------------------
// SEO / GEO: sitemap, robots, llms.txt, llms-full.txt, manifest
// ---------------------------------------------------------------------------
const indexable = pages.filter((p) => !p.noindex);
const urlOf = (p) => (p.slug ? `${SITE_URL}/${p.slug}/` : `${SITE_URL}/`);

writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((p) => `  <url>\n    <loc>${urlOf(p)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.slug ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${p.priority || '0.5'}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`
);

// Libera buscadores e crawlers de IA (ChatGPT, Claude, Perplexity, Gemini...) para o site ser citado.
const aiBots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot',
  'Amazonbot', 'meta-externalagent', 'CCBot', 'cohere-ai', 'MistralAI-User',
];
writeFileSync(
  join(OUT, 'robots.txt'),
  `# ${B.brand} | ${B.person}
# Conteúdo aberto para buscadores e assistentes de IA.

User-agent: *
Allow: /
Disallow: /404.html

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`
);

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/(p|h1|h2|h3|li|dt|dd|summary|div|section|article|aside|address)>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map((l) => l.trim())
    .filter((l, i, a) => l && !(l === a[i - 1]))
    .join('\n');

const nap = `${B.studio}, ${B.address.street}, ${B.address.district}, ${B.address.city} – ${B.address.state}. WhatsApp ${B.phoneDisplay}. ${B.hours}.`;

writeFileSync(
  join(OUT, 'llms.txt'),
  `# ${B.brand} | ${B.person}, esteticista em Balneário Camboriú

> ${B.person} é esteticista em Balneário Camboriú (SC), com atendimento na ${B.studio}. Trabalha com remoção de tatuagem e micropigmentação a laser, podologia estética (micose de unha, calos, rachaduras, bicho-de-pé), remoção estética de sinais, verrugas, acrocórdons e queloide, furo humanizado, Orelha Glow, lobuloplastia sem cortes, clareamento íntimo e corporal, estrias, limpeza de pele e Hidra Gloss. Todo procedimento começa com avaliação individualizada. Agendamento pelo WhatsApp.

Fatos principais:
- Endereço: ${B.address.street}, ${B.address.district}, ${B.address.city} – ${B.address.state}, Brasil
- WhatsApp: ${B.phoneDisplay} (https://wa.me/${B.whatsapp})
- Funcionamento: ${B.hours.toLowerCase()}
- Região atendida: ${B.areaServed.join(', ')}
- Instagram: ${B.instagram} (pessoal) e ${B.studioInstagram} (studio)
- Preços: informados após a avaliação; há pacotes especiais para remoção a laser

## Tratamentos

${Object.values(services).map((s) => `- [${s.name}](${SITE_URL}/${s.slug}/): ${s.summary}`).join('\n')}

## Sobre e contato

- [Sobre a Vanessa Silvestre](${SITE_URL}/sobre/): história, valores e o studio Luminne
- [Dúvidas frequentes](${SITE_URL}/duvidas/): dor, número de sessões, cicatriz, valores, agendamento

## Optional

- [Conteúdo completo em texto](${SITE_URL}/llms-full.txt)
`
);

writeFileSync(
  join(OUT, 'llms-full.txt'),
  `# ${B.brand} | ${B.person} — conteúdo completo do site
Fonte: ${SITE_URL}/
Contato: ${nap}
Atualizado em: ${today}

${indexable
  .map((p) => {
    const html = p.body(makeCtx(p), p);
    return `\n==========\n${p.title}\nURL: ${urlOf(p)}\n==========\n${strip(html)}`;
  })
  .join('\n')}
`
);

writeFileSync(
  join(OUT, 'site.webmanifest'),
  JSON.stringify(
    {
      name: `${B.person} · Estética Avançada`,
      short_name: 'Vanessa Silvestre',
      lang: 'pt-BR',
      start_url: '/',
      display: 'standalone',
      background_color: '#FAF6F5',
      theme_color: '#7A1A35',
      icons: [
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

console.log(`✓ ${pages.length} páginas geradas em ${relative(ROOT, OUT)}/ (${FLAT ? 'prévia' : 'produção'})`);
