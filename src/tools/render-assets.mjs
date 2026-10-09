// Gera og.jpg (1200x630), ícones PNG e favicon.ico a partir de HTML, usando Playwright.
// Uso: node src/tools/render-assets.mjs   (precisa do pacote playwright instalado)
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const IMG = join(ROOT, 'src', 'assets', 'img');
const FONTS = join(ROOT, 'src', 'assets', 'fonts');
const face = (fam, file, w = 400) => `@font-face{font-family:'${fam}';src:url(data:font/woff2;base64,${readFileSync(join(FONTS, file + '.woff2')).toString('base64')}) format('woff2');font-weight:${w}}`;
const fonts = `<style>${face('Allura', 'allura-latin-400-normal')}${face('Cormorant Garamond', 'cormorant-garamond-latin-500-normal', 500)}${face('Montserrat', 'montserrat-latin-600-normal', 600)}</style>`;
const fly = `<svg viewBox="0 0 48 40" fill="none" stroke="#E0BE5C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 20C21 9 12 2.5 6.5 4.5S3 15 10.5 19c-6 1.6-7.5 7.8-3.6 10.2C11.6 32 19.5 28 24 20z"/><path d="M24 20c3-11 12-17.5 17.5-15.5S45 15 37.5 19c6 1.6 7.5 7.8 3.6 10.2C36.4 32 28.5 28 24 20z"/><path d="M24 13v19M22.5 10.5 20 6.5M25.5 10.5 28 6.5"/></svg>`;

const og = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:Montserrat,sans-serif;color:#fff4f6;
background:radial-gradient(45% 70% at 80% 35%,rgba(255,95,134,.45),transparent 70%),radial-gradient(40% 60% at 5% 100%,rgba(201,164,58,.2),transparent 70%),linear-gradient(180deg,#7a1a35,#5c1128);
display:grid;grid-template-columns:1.25fr .75fr;align-items:center;padding:0 80px;gap:40px}
.k{font-size:17px;letter-spacing:.22em;text-transform:uppercase;color:#c9a43a;font-weight:600}
h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:84px;line-height:.98;margin:22px 0 26px;letter-spacing:-.02em}
h1 em{font-family:Allura,cursive;font-style:normal;font-size:1.15em;color:#f3d3d8;text-shadow:0 0 28px rgba(255,95,134,.6)}
.b{display:flex;align-items:center;gap:14px}.b svg{width:56px;height:46px}
.n{font-family:Allura,cursive;font-size:44px;line-height:1}.s{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#c9a43a;margin-top:4px}
.neon{font-family:Allura,cursive;font-size:62px;line-height:1.02;text-align:center;color:#ffe3ea;transform:rotate(-6deg);
text-shadow:0 0 2px #fff,0 0 8px #ff5f86,0 0 18px #ff5f86,0 0 38px #e2566e,0 0 70px rgba(226,86,110,.7)}
</style></head><body><div><p class="k">Balneário Camboriú · SC</p><h1>Nem toda marca precisa ser <em>eterna.</em></h1>
<div class="b">${fly}<div><p class="n">Vanessa Silvestre</p><p class="s">estética avançada</p></div></div></div>
<p class="neon">Vou fazer todas<br>minhas sessões<br>com você</p></body></html>`;

const iconHtml = (size, pad) => `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0}body{width:${size}px;height:${size}px;background:#7a1a35;display:grid;place-items:center}svg{width:${size - pad * 2}px}</style></head><body>${fly}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(IMG, 'og.jpg'), type: 'jpeg', quality: 88 });

for (const [name, size, pad] of [['icon-512.png', 512, 96], ['icon-192.png', 192, 36], ['apple-touch-icon.png', 180, 34], ['favicon-32.png', 32, 4]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(iconHtml(size, pad));
  await page.screenshot({ path: join(IMG, name), type: 'png' });
}
await browser.close();

// favicon.ico com um PNG 32x32 embutido (formato ICO aceita PNG direto).
const png = readFileSync(join(IMG, 'favicon-32.png'));
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(join(IMG, 'favicon.ico'), Buffer.concat([header, png]));
console.log('✓ og.jpg, ícones e favicon.ico gerados');
