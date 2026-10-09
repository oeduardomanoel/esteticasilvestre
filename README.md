# Site · Vanessa Silvestre | Estética Avançada

Site estático da Vanessa Silvestre (@esteticasilvestre_), esteticista em Balneário Camboriú, com atendimento na Luminne Estética & Beleza. Feito para converter em avaliação pelo WhatsApp e ranquear em buscas locais e em respostas de IA.

## Estrutura

```
src/
  config.mjs      dados do negócio, domínio, IDs de GA4/Pixel, fotos
  content.mjs     páginas e textos (home, 5 serviços, sobre, dúvidas, 404)
  faq.mjs         perguntas frequentes (viram FAQPage no schema)
  components.mjs  blocos reaproveitados (ícones, FAQ, CTA, polaroid...)
  layout.mjs      <head>, SEO, JSON-LD, header, footer, mapa
  build.mjs       gera /public + sitemap.xml, robots.txt, llms.txt, llms-full.txt
  assets/         css, js, fontes auto-hospedadas, imagens
  tools/render-assets.mjs  gera og.jpg, ícones e favicon (Playwright)
public/           saída pronta para publicar (é isso que vai pro ar)
```

## Comandos

```bash
npm run build     # gera /public
npm run preview   # gera e abre em http://localhost:4321
npm run assets    # regenera og.jpg/ícones (precisa do playwright instalado) e faz o build
```

Sem dependências para o build: só Node 18+.

## Publicar

Qualquer hospedagem estática serve. Aponte a pasta de publicação para `public/`:

- **Cloudflare Pages / Netlify / Vercel:** build command `npm run build`, output `public`.
- **GitHub Pages:** publicar a pasta `public/` (via Action ou branch `gh-pages`).

Depois de publicar:

1. Trocar `SITE_URL` em `src/config.mjs` pelo domínio definitivo e rodar `npm run build` (canonical, sitemap, schema e llms.txt usam esse valor).
2. Cadastrar o domínio no Google Search Console, colar o token em `tracking.googleSiteVerification` e enviar `/sitemap.xml`.
3. Preencher `tracking.ga4` e `tracking.metaPixel`. Os cliques no WhatsApp já disparam `generate_lead` (GA4) e `Contact` (Pixel).
4. Colocar o link do site no Google Meu Negócio e na bio do Instagram (com UTM, ex.: `?utm_source=instagram&utm_medium=bio`).

## SEO e GEO incluídos

- Uma página por serviço, cada uma com H1, title e description focados em "serviço + Balneário Camboriú".
- JSON-LD em `@graph`: `BeautySalon` (NAP, área atendida, catálogo de serviços), `Person` (Vanessa), `WebSite`, `WebPage`, `BreadcrumbList`, `Service` e `FAQPage`.
- Bloco "Resumo rápido" no topo de cada serviço e FAQ com resposta na primeira frase: é o formato que Google (AI Overviews), ChatGPT e Perplexity citam.
- `robots.txt` liberando buscadores e crawlers de IA, `sitemap.xml`, `llms.txt` (índice) e `llms-full.txt` (conteúdo completo em texto).
- Fontes auto-hospedadas com preload, mapa que só carrega no clique, zero framework: carregamento rápido no 4G.
- Open Graph com imagem própria (`assets/img/og.jpg`) para compartilhamento no WhatsApp e Instagram.

## Fotos

O site já funciona sem fotos (os quadros polaroid mostram a marca). Para usar fotos reais, salve em `src/assets/img/` e rode o build:

| Arquivo | O que é | Formato ideal |
| --- | --- | --- |
| `vanessa.jpg` | Vanessa de jaleco, no studio | vertical 3:4, 900x1200 |
| `studio.jpg` | parede bordô com o neon | vertical 3:4, 900x1200 |

Fotos de procedimento (antes/depois) só com autorização por escrito da cliente.

## Pendências com a cliente

- [ ] Marca principal e domínio (hoje: Vanessa Silvestre, com a Luminne como o espaço físico)
- [ ] Logo em vetor e cores oficiais (cores atuais aproximadas das artes)
- [ ] Formação, cursos, certificações e anos de experiência (espaço marcado com `TODO` em `content.mjs`, página Sobre)
- [ ] Horário de funcionamento (hoje: "atendimento com hora marcada")
- [ ] Prints dos depoimentos do destaque "Feedback" com autorização, e link do Google Meu Negócio
- [ ] Fotos profissionais da Vanessa e do espaço
- [ ] Marca/modelo do laser
- [ ] Validar a descrição dos serviços na fronteira com atos médicos/podológicos (sinais, cisto, xantelasma, queloide, micose)
