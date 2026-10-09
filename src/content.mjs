import { business } from './config.mjs';
import {
  icon, butterfly, waButton, checklist, steps, faqList, answerBox, ctaBand, photoFrame,
} from './components.mjs';
import { faqGeral, faqLaser, faqPes, faqPele, faqOrelha, faqOutros } from './faq.mjs';

// ---------------------------------------------------------------------------
// Serviços: alimentam o menu, os cards da home, o schema e o llms.txt.
// ---------------------------------------------------------------------------
export const services = {
  laser: {
    slug: 'remocao-de-tatuagem-a-laser',
    nav: 'Laser',
    name: 'Remoção de tatuagem e micropigmentação a laser',
    icon: 'laser',
    summary: 'Remoção a laser de tatuagem preta e colorida e despigmentação de sobrancelha, lábios, barba e capilar.',
    wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação para remoção a laser.',
  },
  pes: {
    slug: 'podologia-estetica',
    nav: 'Pés',
    name: 'Podologia estética',
    icon: 'foot',
    summary: 'Cuidado com micose de unha, calos, rachaduras no calcanhar, hiperqueratose e remoção de bicho-de-pé.',
    wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação para os pés.',
  },
  pele: {
    slug: 'remocao-de-sinais-verrugas-e-queloide',
    nav: 'Pele',
    name: 'Remoção de sinais, verrugas e queloide',
    icon: 'skin',
    summary: 'Remoção estética de sinais, verrugas, acrocórdons, milium, cisto sebáceo, xantelasma e queloide.',
    wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação para remoção de sinal, verruga ou queloide.',
  },
  orelha: {
    slug: 'orelha-furo-humanizado-e-lobuloplastia',
    nav: 'Orelha',
    name: 'Furo humanizado, Orelha Glow e lobuloplastia',
    icon: 'ear',
    summary: 'Furo humanizado com kit de pós, curadoria de piercings e joias e reconstrução de lóbulo sem cortes.',
    wa: 'Oi, Vanessa! Vim pelo site e quero saber sobre furo humanizado e cuidados com a orelha.',
  },
  outros: {
    slug: 'clareamento-estrias-e-limpeza-de-pele',
    nav: 'Outros',
    name: 'Clareamento, estrias e cuidados faciais',
    icon: 'glow',
    summary: 'Clareamento íntimo e corporal, tratamento de estrias, limpeza de pele e Hidra Gloss.',
    wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação de clareamento, estrias ou limpeza de pele.',
  },
};

const S = services;

// ---------------------------------------------------------------------------
// Páginas
// ---------------------------------------------------------------------------

const home = {
  slug: '',
  title: 'Estética Avançada em Balneário Camboriú | Vanessa Silvestre',
  description:
    'Esteticista em Balneário Camboriú: remoção de tatuagem a laser, podologia estética, remoção de sinais e verrugas, furo humanizado e mais. Agende sua avaliação.',
  wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação.',
  priority: '1.0',
  faq: faqGeral.slice(0, 5),
  hero: 'home',
  body: (ctx) => `
  <section class="hero" aria-labelledby="hero-t">
    <div class="wrap hero__grid">
      <div class="hero__copy">
        <h1 id="hero-t" class="hero__h1">
          <span class="hero__eyebrow">Remoção de tatuagem a laser e estética avançada em Balneário Camboriú</span>
          <span class="hero__display">Nem toda marca precisa ser <em>eterna.</em></span>
        </h1>
        <p class="hero__lead">Sou a Vanessa Silvestre, esteticista. Cuido do que pesa na sua autoestima: a tatuagem que perdeu o sentido, a sobrancelha que ficou diferente do combinado, o pé que dói, o sinal que você vive escondendo. Tudo começa com uma avaliação individualizada.</p>
        <div class="hero__actions">
          ${waButton(ctx, home.wa)}
          <a class="btn btn--ghost-light" href="#tratamentos">Ver tratamentos</a>
        </div>
        <ul class="hero__meta">
          <li>${icon('wa')} Resposta pelo WhatsApp</li>
          <li>${icon('clock')} Hora marcada</li>
          <li>${icon('pin')} Centro de BC</li>
        </ul>
      </div>
      <div class="hero__wall" aria-hidden="false">
        <p class="neon" aria-label="Neon do studio: Vou fazer todas minhas sessões com você"><span>Vou fazer todas</span><span>minhas sessões</span><span>com você</span></p>
        ${photoFrame(ctx, 'vanessa', 'Vanessa Silvestre, esteticista, no studio em Balneário Camboriú', 'Vanessa Silvestre · esteticista', 'hero__polaroid')}
      </div>
    </div>
    <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48c160-30 320-44 480-30s320 50 480 52 320-26 480-46v56H0z"/></svg>
  </section>

  <div class="ribbon" aria-hidden="true"><div class="ribbon__track">${[
    'tatuagem', 'sobrancelha', 'lábios', 'micose', 'calos', 'rachaduras', 'bicho-de-pé', 'sinais', 'verrugas', 'queloide', 'furo humanizado', 'lobuloplastia', 'clareamento', 'estrias',
  ].map((w) => `<span>${w}</span><i>✦</i>`).join('').repeat(2)}</div></div>

  <section class="section" id="tratamentos" aria-labelledby="doors-t">
    <div class="wrap">
      <header class="section__head">
        <p class="kicker">Tratamentos</p>
        <h2 id="doors-t" class="h2">Por onde você quer <em>começar?</em></h2>
      </header>
      <div class="doors">
        <article class="door">
          <span class="door__ico">${icon('laser')}</span>
          <p class="door__hook">Se arrependeu? A gente resolve.</p>
          <h3 class="door__t">Tatuagem e micropigmentação</h3>
          <p>Remoção a laser de tatuagem preta e colorida e de micropigmentação de sobrancelha, lábios, barba e capilar.</p>
          <a class="door__link" href="${ctx.link(S.laser.slug)}">Como funciona a remoção ${icon('arrow')}</a>
        </article>
        <article class="door">
          <span class="door__ico">${icon('foot')}</span>
          <p class="door__hook">Sua unha mudou de cor?</p>
          <h3 class="door__t">Pés saudáveis e bonitos</h3>
          <p>Micose de unha, calos, calcanhar rachado, pele grossa e bicho-de-pé, com protocolo e acompanhamento.</p>
          <a class="door__link" href="${ctx.link(S.pes.slug)}">Podologia estética ${icon('arrow')}</a>
        </article>
        <article class="door">
          <span class="door__ico">${icon('ear')}</span>
          <p class="door__hook">Aquele sinal que enrosca no colar.</p>
          <h3 class="door__t">Pele e orelha</h3>
          <p>Sinais, verrugas, acrocórdons e queloide. Furo humanizado, Orelha Glow e lobuloplastia sem cortes.</p>
          <div class="door__links">
            <a class="door__link" href="${ctx.link(S.pele.slug)}">Remoções de pele ${icon('arrow')}</a>
            <a class="door__link" href="${ctx.link(S.orelha.slug)}">Orelha ${icon('arrow')}</a>
          </div>
        </article>
      </div>
      <p class="doors__more">Também cuido de clareamento íntimo e corporal, estrias, limpeza de pele e Hidra Gloss. <a href="${ctx.link(S.outros.slug)}">Ver outros tratamentos</a></p>
    </div>
  </section>

  <section class="section section--blush" aria-labelledby="method-t">
    <div class="wrap method">
      <header class="section__head method__head">
        <p class="kicker">Como funciona</p>
        <h2 id="method-t" class="h2">Antes do resultado, vem a <em>avaliação.</em></h2>
        <p class="section__lead">Nenhum procedimento acontece no escuro. Você entende o que vai ser feito, quantas sessões devem ser e como cuidar da pele em casa.</p>
      </header>
      ${steps([
        { t: 'Você me chama no WhatsApp', d: 'Me conta o que te incomoda. Se quiser, já manda uma foto da área.' },
        { t: 'Avaliação individualizada', d: 'Olho o seu caso de perto, explico o que dá pra fazer, a estimativa de sessões e o valor.' },
        { t: 'Protocolo pro seu caso', d: 'Técnica, número de sessões e intervalo entre elas montados para a sua pele.' },
        { t: 'Acompanhamento', d: 'Registro a evolução a cada etapa e ajusto o caminho até o resultado.' },
      ])}
    </div>
  </section>

  <section class="section section--wine" aria-labelledby="laser-t">
    <div class="wrap laser">
      <div class="laser__copy">
        <p class="kicker kicker--light">Carro-chefe do studio</p>
        <h2 id="laser-t" class="h2 h2--light">Remoção a laser, <em>etapa por etapa.</em></h2>
        <p>A tinta da tatuagem fica na derme, uma camada mais funda da pele. O laser emite pulsos de luz muito rápidos que quebram esse pigmento em partículas menores, e o próprio corpo vai eliminando essas partículas nas semanas seguintes. Cada sessão é um passo mais perto da sua nova fase.</p>
        <div class="laser__actions">
          <a class="btn btn--light" href="${ctx.link(S.laser.slug)}">Tudo sobre a remoção a laser</a>
          <a class="btn btn--ghost-light" href="${business.instagram}" target="_blank" rel="noopener">${icon('ig')}<span>Casos reais no Instagram</span></a>
        </div>
      </div>
      <ol class="stages">
        <li class="stage"><span class="stage__k">Antes</span><p>O ponto de partida, registrado em foto.</p></li>
        <li class="stage"><span class="stage__k">Pós imediato</span><p>A área fica esbranquiçada logo após o disparo. É esperado e passa em minutos.</p></li>
        <li class="stage"><span class="stage__k">Cicatrização</span><p>A pele se recupera enquanto o corpo elimina o pigmento.</p></li>
        <li class="stage"><span class="stage__k">Após a sessão</span><p>O clareamento aparece, e a próxima sessão é marcada.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="about-t">
    <div class="wrap about">
      ${photoFrame(ctx, 'studio', 'Parede bordô com neon rosa no studio Luminne, em Balneário Camboriú', 'studio Luminne · BC', 'about__polaroid')}
      <div class="about__copy">
        <p class="script">oi, eu sou a Vanessa</p>
        <h2 id="about-t" class="h2">Cuidado de quem entende <em>do assunto.</em></h2>
        <p>Atendo no Centro de Balneário Camboriú, na Luminne Estética & Beleza. O espaço nasceu de um recomeço: quando uma porta se fechou, eu decidi abrir a minha. A obra que era pra durar 3 dias virou 3 semanas (oxe!), e hoje é lá que eu te recebo, com hora marcada e sem pressa.</p>
        ${checklist([
          'Avaliação individualizada antes de qualquer procedimento',
          'Atendimento humanizado, no seu tempo',
          'Tecnologia a laser e alta frequência',
          'Resultados reais, mostrados etapa por etapa',
        ])}
        <a class="btn btn--wine" href="${ctx.link('sobre')}">Conhecer minha história</a>
      </div>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="faq-t">
    <div class="wrap faq-wrap">
      <header class="section__head">
        <p class="kicker">Dúvidas frequentes</p>
        <h2 id="faq-t" class="h2">Pergunta sem <em>vergonha.</em></h2>
        <p class="section__lead">As dúvidas que mais chegam no meu WhatsApp. Não achou a sua? <a href="${ctx.link('duvidas')}">Veja todas</a> ou me chama.</p>
      </header>
      ${faqList(home.faq)}
    </div>
  </section>

  ${ctx.location()}
  ${ctaBand(ctx, home.wa)}
  `,
};

// ---------------------------------------------------------------------------

const servicePage = (key, cfg) => ({ ...cfg, service: S[key], slug: S[key].slug, wa: S[key].wa, priority: '0.9' });

const pageHero = (ctx, { kicker, h1, script, lead, wa, trail }) => `
  <section class="phero" aria-labelledby="phero-t">
    <div class="wrap phero__in">
      ${ctx.crumbs(trail)}
      <p class="kicker kicker--light">${kicker}</p>
      <h1 id="phero-t" class="phero__h1">${h1}</h1>
      ${script ? `<p class="phero__script" aria-hidden="true">${script}</p>` : ''}
      <p class="phero__lead">${lead}</p>
      <div class="phero__actions">${waButton(ctx, wa)}<span class="phero__note">${icon('clock')} Atendimento com hora marcada</span></div>
    </div>
    <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48c160-30 320-44 480-30s320 50 480 52 320-26 480-46v56H0z"/></svg>
  </section>`;

const igBlock = (text) => `
  <aside class="igcard">
    <span class="igcard__ico">${icon('eye')}</span>
    <div><p class="igcard__t">Quer ver casos reais?</p><p>${text}</p></div>
    <a class="btn btn--wine btn--sm" href="${business.instagram}" target="_blank" rel="noopener">${icon('ig')}<span>${business.instagramHandle}</span></a>
  </aside>`;

const related = (ctx, keys) => `
  <section class="section section--paper" aria-labelledby="rel-t">
    <div class="wrap">
      <h2 id="rel-t" class="h3">Outros tratamentos</h2>
      <div class="related">${keys
        .map((k) => `<a class="related__card" href="${ctx.link(S[k].slug)}"><span class="door__ico">${icon(S[k].icon)}</span><span><strong>${S[k].name}</strong><small>${S[k].summary}</small></span></a>`)
        .join('')}</div>
    </div>
  </section>`;

const laser = servicePage('laser', {
  crumb: 'Remoção a laser',
  title: 'Remoção de Tatuagem a Laser em Balneário Camboriú | Vanessa Silvestre',
  description:
    'Remoção de tatuagem preta e colorida e de micropigmentação (sobrancelha, lábios, barba, capilar) a laser no Centro de Balneário Camboriú. Avaliação individualizada.',
  h1: 'Remoção de tatuagem e micropigmentação a laser em Balneário Camboriú',
  faq: faqLaser,
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Remoção a laser',
    h1: p.h1,
    script: 'nova fase',
    lead: 'Se arrependeu? A gente resolve. Tatuagem antiga, nome que não faz mais sentido, sobrancelha ou lábio que ficou diferente do combinado: o laser tira o pigmento sessão por sessão, com avaliação antes e acompanhamento do começo ao fim.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap split">
      <div class="prose">
        <h2 class="h2">Como o laser <em>tira a tatuagem</em></h2>
        <p>A tinta da tatuagem fica na derme, uma camada mais funda da pele. O laser emite pulsos de luz muito rápidos que atravessam a superfície e quebram esse pigmento em partículas bem menores. Depois da sessão, o organismo vai eliminando essas partículas aos poucos, e é por isso que o clareamento continua acontecendo nas semanas seguintes.</p>
        <p>Logo depois do disparo, a área costuma ficar esbranquiçada. É uma reação esperada da pele ao laser e passa em alguns minutos.</p>
        <h2 class="h2">O que dá para <em>remover</em></h2>
        ${checklist([
          'Tatuagem preta',
          'Tatuagem colorida',
          'Micropigmentação de sobrancelha',
          'Micropigmentação labial',
          'Micropigmentação de barba',
          'Micropigmentação capilar',
        ], 'checklist--cols')}
      </div>
      ${answerBox('Resumo rápido', [
        'Removo tatuagem preta e colorida e micropigmentação de sobrancelha, lábios, barba e capilar.',
        'O laser quebra o pigmento em partículas que o próprio corpo elimina.',
        'O número de sessões depende da tatuagem e da sua pele. A estimativa sai na avaliação.',
        'Existem pacotes especiais para remoção a laser.',
        'Atendimento com hora marcada no Centro de Balneário Camboriú.',
      ])}
    </div>
  </section>

  <section class="section section--wine">
    <div class="wrap">
      <header class="section__head">
        <p class="kicker kicker--light">O processo</p>
        <h2 class="h2 h2--light">Cada sessão, <em>um passo.</em></h2>
        <p class="section__lead section__lead--light">É assim que eu registro e mostro a evolução de cada caso: com foto real, em cada etapa.</p>
      </header>
      <ol class="stages stages--row">
        <li class="stage"><span class="stage__k">Antes</span><p>Avaliação, foto e plano de sessões.</p></li>
        <li class="stage"><span class="stage__k">Pós imediato</span><p>A área fica esbranquiçada por alguns minutos.</p></li>
        <li class="stage"><span class="stage__k">Cicatrização</span><p>A pele se recupera e o corpo elimina o pigmento.</p></li>
        <li class="stage"><span class="stage__k">Após a sessão</span><p>O clareamento aparece e a próxima sessão é marcada.</p></li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="wrap split split--even">
      <div class="prose">
        <h2 class="h2">Quantas sessões <em>vou precisar?</em></h2>
        <p>Depende da cor, da profundidade e da idade da tinta, do tamanho do desenho e de como a sua pele responde. Na avaliação eu olho tudo isso e te passo uma estimativa para o seu caso, sem promessa mágica.</p>
        <p>O intervalo entre uma sessão e outra respeita a cicatrização da pele. É nesse tempo que o corpo trabalha eliminando o pigmento.</p>
      </div>
      <div class="prose">
        <h2 class="h2">Cuidados <em>depois da sessão</em></h2>
        <p>O cuidado em casa faz parte do resultado tanto quanto o laser. Você sai de cada sessão sabendo exatamente como cuidar da área, e proteger do sol e não arrancar casquinhas estão entre as orientações mais importantes.</p>
        ${igBlock('Antes, pós imediato, cicatrização e evolução de remoções reais estão no meu Instagram.')}
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap faq-wrap">
      <header class="section__head"><p class="kicker">Dúvidas</p><h2 class="h2">Perguntas sobre <em>remoção a laser</em></h2></header>
      ${faqList(p.faq)}
    </div>
  </section>
  ${ctaBand(ctx, p.wa, 'Nem toda marca precisa ser eterna.', 'Me manda uma foto da tatuagem ou da micropigmentação pelo WhatsApp e a gente marca sua avaliação.')}
  ${related(ctx, ['pele', 'pes', 'orelha'])}
  `,
});

const pes = servicePage('pes', {
  crumb: 'Podologia estética',
  title: 'Podologia Estética: Micose, Calos e Rachaduras | Balneário Camboriú',
  description:
    'Micose de unha, calos, calcanhar rachado, hiperqueratose e bicho-de-pé em Balneário Camboriú. Protocolo com alta frequência, laser e acompanhamento.',
  h1: 'Podologia estética em Balneário Camboriú',
  faq: faqPes,
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Pés',
    h1: p.h1,
    script: 'pés leves',
    lead: 'Unha que mudou de cor, calcanhar rachado, calo que dói a cada passo, aquele pontinho preto que coça. Se você já tentou de tudo em casa e não resolveu, é hora de cuidar com quem entende do assunto.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap split">
      <div class="prose">
        <h2 class="h2">O que eu <em>cuido nos pés</em></h2>
        <dl class="deflist">
          <div><dt>Micose de unha</dt><dd>Unha amarelada, esbranquiçada, mais grossa, descamando ou quebrando fácil.</dd></div>
          <div><dt>Calosidades</dt><dd>Pele endurecida nos pontos de pressão, que incomoda ao andar.</dd></div>
          <div><dt>Rachaduras e fissuras</dt><dd>Calcanhar seco e rachado, às vezes com dor e sangramento.</dd></div>
          <div><dt>Hiperqueratose</dt><dd>Espessamento da pele, aquela camada grossa que não sai com lixa.</dd></div>
          <div><dt>Bicho-de-pé</dt><dd>Pontinho escuro, coceira e dor ao pisar. Remoção com avaliação antes.</dd></div>
        </dl>
      </div>
      ${answerBox('Resumo rápido', [
        'Cuido de micose de unha, calos, rachaduras, hiperqueratose e bicho-de-pé.',
        'Protocolo: limpeza técnica, remoção das áreas comprometidas, alta frequência, laser e acompanhamento.',
        'Tudo começa com uma avaliação individualizada.',
        'Atendimento com hora marcada no Centro de Balneário Camboriú.',
      ])}
    </div>
  </section>

  <section class="section section--blush">
    <div class="wrap">
      <header class="section__head">
        <p class="kicker">Protocolo</p>
        <h2 class="h2">Do primeiro passo <em>ao acompanhamento</em></h2>
        <p class="section__lead">Receita caseira não resolveu porque o problema pede técnica. É isso que o protocolo do studio faz.</p>
      </header>
      ${steps([
        { t: 'Avaliação', d: 'Confirmo o que é e diferencio, por exemplo, bicho-de-pé de verruga, calo ou corpo estranho.' },
        { t: 'Limpeza técnica', d: 'Higienização completa da área antes de qualquer intervenção.' },
        { t: 'Remoção das áreas comprometidas', d: 'Retiro a pele endurecida e as partes da unha afetadas.' },
        { t: 'Alta frequência e laser', d: 'Tecnologia que complementa o cuidado das áreas tratadas.' },
        { t: 'Acompanhamento', d: 'Retornos para acompanhar a evolução, com orientação de cuidado em casa.' },
      ])}
    </div>
  </section>

  <section class="section">
    <div class="wrap split split--even">
      <div class="prose">
        <h2 class="h2">Sua unha <em>mudou de cor?</em></h2>
        <p>Unha amarelada ou esbranquiçada, que engrossou, descama ou quebra fácil são sinais comuns de micose. Quanto antes você cuida, mais simples fica o caminho.</p>
        <p>Como a unha cresce devagar, o acompanhamento é parte do tratamento. A unha nova vai crescendo saudável enquanto a antiga é cuidada.</p>
      </div>
      <div class="prose">
        <h2 class="h2">Sandália sem <em>vergonha</em></h2>
        <p>Pé com calo, rachadura ou micose não é só estética: dói, incomoda e faz a gente esconder o pé. O objetivo aqui é você voltar a andar confortável e a usar a sandália que quiser.</p>
        ${igBlock('As fotos de casos reais ficam no Instagram, com aviso. Aqui no site eu poupo você das imagens mais fortes.')}
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap faq-wrap">
      <header class="section__head"><p class="kicker">Dúvidas</p><h2 class="h2">Perguntas sobre <em>os pés</em></h2></header>
      ${faqList(p.faq)}
    </div>
  </section>
  ${ctaBand(ctx, p.wa, 'Seus pés merecem esse cuidado.', 'Me conta pelo WhatsApp o que está acontecendo e a gente marca sua avaliação.')}
  ${related(ctx, ['laser', 'pele', 'outros'])}
  `,
});

const pele = servicePage('pele', {
  crumb: 'Remoções de pele',
  title: 'Remoção de Sinais, Verrugas e Queloide em Balneário Camboriú',
  description:
    'Remoção estética de sinais, verrugas, acrocórdons, milium, xantelasma e queloide em Balneário Camboriú, sempre com avaliação individualizada.',
  h1: 'Remoção de sinais, verrugas e queloide em Balneário Camboriú',
  faq: faqPele,
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Pele',
    h1: p.h1,
    script: 'pele livre',
    lead: 'O sinal que enrosca no colar, a verruga que você esconde, os pontinhos de pele no pescoço, o queloide que cresceu depois do furo da orelha. Dá pra resolver com segurança, sempre depois de uma avaliação individualizada.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap split">
      <div class="prose">
        <h2 class="h2">O que dá para <em>remover</em></h2>
        <dl class="deflist">
          <div><dt>Sinais e pintas</dt><dd>Benignos, avaliados antes de qualquer remoção.</dd></div>
          <div><dt>Verrugas</dt><dd>Avaliadas antes, removidas com a técnica indicada para o seu caso.</dd></div>
          <div><dt>Acrocórdons</dt><dd>Fibromas moles: pedacinhos de pele comuns no pescoço, axilas e dobras.</dd></div>
          <div><dt>Milium</dt><dd>Bolinhas brancas e firmes, comuns em volta dos olhos.</dd></div>
          <div><dt>Cisto sebáceo</dt><dd>Nódulo sob a pele, avaliado caso a caso.</dd></div>
          <div><dt>Xantelasma</dt><dd>Placas amareladas nas pálpebras.</dd></div>
          <div><dt>Queloide</dt><dd>Inclusive na orelha, depois de furo ou piercing.</dd></div>
        </dl>
      </div>
      <div class="stack">
        ${answerBox('Resumo rápido', [
          'Removo sinais, verrugas, acrocórdons, milium, cisto sebáceo, xantelasma e queloide.',
          'Toda remoção começa com uma avaliação individualizada.',
          'A técnica e os cuidados são definidos para o seu caso.',
          'Atendimento com hora marcada no Centro de Balneário Camboriú.',
        ])}
        <aside class="alert" role="note">
          <p class="alert__t">Segurança em primeiro lugar</p>
          <p>Sinal que mudou de cor, tamanho ou formato, que sangra ou coça precisa ser visto por um dermatologista antes de qualquer procedimento estético. Se eu notar algo assim na avaliação, você fica sabendo na hora.</p>
        </aside>
      </div>
    </div>
  </section>

  <section class="section section--blush">
    <div class="wrap">
      <header class="section__head">
        <p class="kicker">Como funciona</p>
        <h2 class="h2">Resultado limpo, <em>com cuidado</em></h2>
      </header>
      ${steps([
        { t: 'Avaliação individualizada', d: 'Vejo de perto o que é, se a remoção é indicada e qual técnica faz sentido.' },
        { t: 'Remoção', d: 'Procedimento feito com calma, com você sabendo cada passo.' },
        { t: 'Cicatrização acompanhada', d: 'Você sai com as orientações de cuidado em casa e retorna para eu acompanhar.' },
      ])}
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap faq-wrap">
      <header class="section__head"><p class="kicker">Dúvidas</p><h2 class="h2">Perguntas sobre <em>remoções de pele</em></h2></header>
      ${faqList(p.faq)}
    </div>
  </section>
  ${ctaBand(ctx, p.wa, 'Aquilo que te incomoda pode sair.', 'Manda uma foto pelo WhatsApp e a gente marca sua avaliação individualizada.')}
  ${related(ctx, ['orelha', 'laser', 'outros'])}
  `,
});

const orelha = servicePage('orelha', {
  crumb: 'Orelha',
  title: 'Furo Humanizado e Lobuloplastia sem Cortes em Balneário Camboriú',
  description:
    'Furo humanizado com kit de pós, Orelha Glow (curadoria de piercings e joias) e lobuloplastia sem cortes para lóbulo rasgado ou alargado, em Balneário Camboriú.',
  h1: 'Furo humanizado e lobuloplastia sem cortes em Balneário Camboriú',
  faq: faqOrelha,
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Orelha',
    h1: p.h1,
    script: 'orelha glow',
    lead: 'Quer furos novos, uma composição de joias que combine com você ou recuperar o lóbulo que rasgou ou alargou? Cuidado em cada detalhe, do furo ao pós.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap">
      <div class="trio">
        <article class="tile">
          <span class="door__ico">${icon('ear')}</span>
          <h2 class="h3">Furo humanizado</h2>
          <p>Feito com calma, técnica e atenção ao seu conforto, para ser o mais tranquilo possível. Você sai com um kit de pós para cuidar do furo em casa.</p>
        </article>
        <article class="tile">
          <span class="door__ico">${icon('glow')}</span>
          <h2 class="h3">Orelha Glow</h2>
          <p>Curadoria de piercings e joias. A gente monta junto a composição da sua orelha, pensando no formato dela e no seu estilo.</p>
        </article>
        <article class="tile">
          <span class="door__ico">${icon('skin')}</span>
          <h2 class="h3">Lobuloplastia sem cortes</h2>
          <p>Reconstrução do lóbulo rasgado ou alargado pelo peso do brinco, feita sem cortes.</p>
        </article>
      </div>
      <div class="split split--even split--mt">
        ${answerBox('Resumo rápido', [
          'Furo humanizado com kit de pós.',
          'Orelha Glow: curadoria de piercings e joias.',
          'Lobuloplastia sem cortes para lóbulo rasgado ou alargado.',
          'Queloide de orelha também é tratado no studio.',
        ])}
        <div class="prose">
          <h2 class="h2">Queloide <em>na orelha?</em></h2>
          <p>Aquele caroço que cresceu depois do furo ou do piercing tem tratamento. Veja como funciona a <a href="${ctx.link(S.pele.slug)}">remoção de queloide</a>.</p>
          ${igBlock('Composições da Orelha Glow e resultados de lobuloplastia estão no Instagram.')}
        </div>
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap faq-wrap">
      <header class="section__head"><p class="kicker">Dúvidas</p><h2 class="h2">Perguntas sobre <em>orelha</em></h2></header>
      ${faqList(p.faq)}
    </div>
  </section>
  ${ctaBand(ctx, p.wa, 'Sua orelha, do seu jeito.', 'Me chama no WhatsApp pra marcar o furo, montar sua composição ou avaliar o lóbulo.')}
  ${related(ctx, ['pele', 'laser', 'outros'])}
  `,
});

const outros = servicePage('outros', {
  crumb: 'Outros tratamentos',
  title: 'Clareamento Íntimo, Estrias e Limpeza de Pele em Balneário Camboriú',
  description:
    'Clareamento íntimo, de axilas, virilha, joelhos e cotovelos, tratamento de estrias, limpeza de pele e Hidra Gloss em Balneário Camboriú. Avaliação individualizada.',
  h1: 'Clareamento, estrias e cuidados faciais em Balneário Camboriú',
  faq: faqOutros,
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Outros tratamentos',
    h1: p.h1,
    script: 'autoestima',
    lead: 'Manchas que fazem você evitar certas roupas, estrias que incomodam, pele pedindo cuidado. Cada tratamento começa com uma avaliação para entender a sua pele.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap">
      <div class="duo">
        <article class="tile">
          <span class="door__ico">${icon('glow')}</span>
          <h2 class="h3">Clareamento íntimo e corporal</h2>
          <p>Para manchas escuras na região íntima, virilha, axilas, joelhos e cotovelos.</p>
        </article>
        <article class="tile">
          <span class="door__ico">${icon('skin')}</span>
          <h2 class="h3">Tratamento de estrias</h2>
          <p>Protocolo definido conforme o tipo e a cor da estria, depois da avaliação.</p>
        </article>
        <article class="tile">
          <span class="door__ico">${icon('face')}</span>
          <h2 class="h3">Limpeza de pele</h2>
          <p>Cravos, poros aparentes e pele sem viço? Esse é o sinal de que a sua pele está pedindo uma limpeza.</p>
        </article>
        <article class="tile">
          <span class="door__ico">${icon('glow')}</span>
          <h2 class="h3">Hidra Gloss</h2>
          <p>Cuidado facial em destaque no studio. Pergunte na avaliação se é indicado pra sua pele.</p>
        </article>
      </div>
      <div class="split split--even split--mt">
        <div class="prose">
          <h2 class="h2">Skincare <em>em casa</em></h2>
          <p>A sua rotina faz toda a diferença nos resultados. Por isso a Luminne trabalha com a linha Creamy Skincare: mais do que vender produtos, a ideia é cuidar da sua pele também entre uma sessão e outra.</p>
        </div>
        ${answerBox('Resumo rápido', [
          'Clareamento de região íntima, virilha, axilas, joelhos e cotovelos.',
          'Tratamento de estrias.',
          'Limpeza de pele e Hidra Gloss.',
          'Linha Creamy Skincare para a rotina em casa.',
        ])}
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap faq-wrap">
      <header class="section__head"><p class="kicker">Dúvidas</p><h2 class="h2">Perguntas <em>frequentes</em></h2></header>
      ${faqList(p.faq)}
    </div>
  </section>
  ${ctaBand(ctx, p.wa)}
  ${related(ctx, ['laser', 'pes', 'pele'])}
  `,
});

const sobre = {
  slug: 'sobre',
  crumb: 'Sobre',
  title: 'Sobre Vanessa Silvestre, Esteticista em Balneário Camboriú',
  description:
    'Conheça a Vanessa Silvestre, esteticista em Balneário Camboriú, e a Luminne Estética & Beleza: atendimento humanizado e avaliação individualizada.',
  h1: 'Sobre a Vanessa Silvestre',
  wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação.',
  priority: '0.7',
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Sobre',
    h1: p.h1,
    script: 'oi, eu sou a Vanessa',
    lead: 'Esteticista em Balneário Camboriú. Cuido do que pesa na autoestima de quem chega até mim, sempre com avaliação individualizada e atendimento humanizado.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap about about--page">
      ${photoFrame(ctx, 'vanessa', 'Vanessa Silvestre, esteticista em Balneário Camboriú', 'Vanessa Silvestre · esteticista', 'about__polaroid')}
      <div class="prose about__copy">
        <h2 class="h2">Minha <em>história</em></h2>
        <p>Sou esteticista e atendo no Centro de Balneário Camboriú, na Luminne Estética & Beleza. Meu trabalho é cuidar do que pesa na autoestima. Às vezes é uma tatuagem que já não representa quem a pessoa é hoje. Às vezes é um pé que dói, uma sobrancelha que ficou diferente do combinado ou um sinal que ela vive tentando esconder.</p>
        <p>A Luminne nasceu de um recomeço. Quando uma porta se fechou, eu decidi abrir a minha. A obra que era pra durar 3 dias virou 3 semanas (oxe!), e eu segui com fé até o espaço ficar pronto. Hoje a sala 2 da Rua 3000 tem parede bordô, um neon cor-de-rosa e o laser que uso nas remoções. É lá que eu te recebo.</p>
        <p>Acredito em atendimento humanizado: ouvir com calma, explicar o processo sem enrolação e só indicar o que faz sentido pro seu caso. Por isso tudo começa com uma avaliação individualizada.</p>
        <p>No Instagram eu mostro procedimento real, evolução etapa por etapa e um pouco de bastidor, inclusive dos meus pets. Passa lá: <a href="${business.instagram}" target="_blank" rel="noopener">${business.instagramHandle}</a>.</p>
        <!-- TODO: incluir formação, cursos, certificações e anos de experiência quando a Vanessa enviar. -->
      </div>
    </div>
  </section>

  <section class="section section--blush">
    <div class="wrap">
      <header class="section__head"><p class="kicker">O que você encontra aqui</p><h2 class="h2">Do jeito que <em>eu acredito</em></h2></header>
      <div class="values">
        <div class="value"><h3 class="h3">Avaliação individualizada</h3><p>Nenhum procedimento sem antes entender a sua pele e o seu caso.</p></div>
        <div class="value"><h3 class="h3">Atendimento humanizado</h3><p>Hora marcada, tempo pra tirar dúvida e acolhimento do começo ao fim.</p></div>
        <div class="value"><h3 class="h3">Tecnologia a laser</h3><p>Laser e alta frequência nos protocolos de remoção e de cuidado com os pés.</p></div>
        <div class="value"><h3 class="h3">Resultados reais</h3><p>Evolução registrada em foto real, etapa por etapa.</p></div>
      </div>
    </div>
  </section>

  ${ctx.location()}
  ${ctaBand(ctx, p.wa)}
  `,
};

const allFaqGroups = [
  { id: 'geral', t: 'Agendamento e atendimento', items: faqGeral },
  { id: 'laser', t: 'Remoção a laser', items: faqLaser, slug: S.laser.slug },
  { id: 'pes', t: 'Podologia estética', items: faqPes, slug: S.pes.slug },
  { id: 'pele', t: 'Remoções de pele', items: faqPele, slug: S.pele.slug },
  { id: 'orelha', t: 'Orelha', items: faqOrelha, slug: S.orelha.slug },
  { id: 'outros', t: 'Clareamento, estrias e facial', items: faqOutros, slug: S.outros.slug },
];

const duvidas = {
  slug: 'duvidas',
  crumb: 'Dúvidas',
  title: 'Dúvidas Frequentes e Contato | Vanessa Silvestre Estética',
  description:
    'Respostas sobre remoção de tatuagem a laser, podologia estética, remoção de sinais, furo humanizado, valores e agendamento. Contato pelo WhatsApp (47) 99162-6589.',
  h1: 'Dúvidas frequentes',
  wa: 'Oi, Vanessa! Vim pelo site e tenho uma dúvida.',
  priority: '0.8',
  faq: allFaqGroups.flatMap((g) => g.items),
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Dúvidas e contato',
    h1: p.h1,
    script: 'pode perguntar',
    lead: 'Juntei aqui as perguntas que mais chegam no meu WhatsApp. Se a sua não estiver na lista, me chama que eu respondo.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section">
    <div class="wrap faq-page">
      <nav class="faq-toc" aria-label="Assuntos">
        <p class="kicker">Assuntos</p>
        <ul>${allFaqGroups.map((g) => `<li><a href="#${g.id}">${g.t}</a></li>`).join('')}</ul>
      </nav>
      <div class="faq-groups">
        ${allFaqGroups
          .map(
            (g) => `<section id="${g.id}" class="faq-group" aria-labelledby="g-${g.id}">
          <h2 id="g-${g.id}" class="h3">${g.t}</h2>
          ${faqList(g.items)}
          ${g.slug ? `<a class="door__link" href="${ctx.link(g.slug)}">Ver a página do tratamento ${icon('arrow')}</a>` : ''}
        </section>`
          )
          .join('')}
      </div>
    </div>
  </section>
  ${ctx.location()}
  ${ctaBand(ctx, p.wa, 'Ficou alguma dúvida?', 'Me chama no WhatsApp que eu te respondo.')}
  `,
};

const notFound = {
  slug: '404',
  file: '404.html',
  crumb: 'Página não encontrada',
  noindex: true,
  title: 'Página não encontrada | Vanessa Silvestre Estética',
  description: 'Essa página não existe. Volte para o início ou fale com a Vanessa pelo WhatsApp.',
  h1: 'Oxe! Essa página não existe.',
  wa: 'Oi, Vanessa! Vim pelo site e quero agendar uma avaliação.',
  body: (ctx, p) => `
  ${pageHero(ctx, {
    kicker: 'Erro 404',
    h1: p.h1,
    script: '',
    lead: 'O link pode ter mudado. Volte para o início ou me chama no WhatsApp que eu te ajudo.',
    wa: p.wa,
    trail: [{ slug: '', name: 'Início' }, { slug: p.slug, name: p.crumb || p.h1 }],
  })}
  <section class="section"><div class="wrap"><div class="related">${Object.values(S)
    .map((s) => `<a class="related__card" href="${ctx.link(s.slug)}"><span class="door__ico">${icon(s.icon)}</span><span><strong>${s.name}</strong><small>${s.summary}</small></span></a>`)
    .join('')}</div></div></section>
  `,
};

export const pages = [home, laser, pes, pele, orelha, outros, sobre, duvidas, notFound];
