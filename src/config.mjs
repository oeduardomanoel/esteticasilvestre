// Dados do negócio. Tudo que aparece em mais de uma página (NAP, links, IDs de tracking) mora aqui.
// Trocou o domínio? Muda SITE_URL e roda `npm run build` de novo.

export const SITE_URL = 'https://www.esteticasilvestre.com.br';

export const business = {
  brand: 'Estética Silvestre',
  person: 'Vanessa Silvestre',
  personFull: 'Vanessa Silvestre',
  role: 'Esteticista',
  studio: 'Luminne Estética & Beleza',
  tagline: 'Estética avançada em Balneário Camboriú',
  phoneDisplay: '(47) 99162-6589',
  phoneE164: '+5547991626589',
  whatsapp: '5547991626589',
  address: {
    street: 'Rua 3000, 943, sala 2',
    district: 'Centro',
    city: 'Balneário Camboriú',
    state: 'SC',
    stateFull: 'Santa Catarina',
    country: 'BR',
  },
  mapsQuery: 'Rua 3000, 943, Centro, Balneário Camboriú - SC',
  hours: 'Atendimento com hora marcada',
  instagram: 'https://www.instagram.com/esteticasilvestre_',
  instagramHandle: '@esteticasilvestre_',
  studioInstagram: 'https://www.instagram.com/luminne_bc',
  studioInstagramHandle: '@luminne_bc',
  areaServed: ['Balneário Camboriú', 'Itajaí', 'Camboriú', 'Itapema', 'Navegantes'],
};

// IDs de tracking. Deixe vazio enquanto não tiver; o código só entra na página quando preenchido.
export const tracking = {
  ga4: '', // ex.: 'G-XXXXXXXXXX'
  metaPixel: '', // ex.: '1234567890'
  googleSiteVerification: '', // token do Search Console (meta tag)
};

// Fotos opcionais. Coloque o arquivo em public/assets/img/ com o nome abaixo e rode o build:
// a página troca o bloco ilustrado pela foto automaticamente.
export const photos = {
  vanessa: 'assets/img/vanessa.jpg', // retrato vertical da Vanessa de jaleco (ideal 900x1200)
  studio: 'assets/img/studio.jpg', // parede bordô com o neon (ideal 1200x900)
};

export const waLink = (msg) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(msg)}`;

export const DEFAULT_WA_MSG = 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação.';
