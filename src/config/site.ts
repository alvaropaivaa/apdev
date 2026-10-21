/**
 * ============================================================
 *  DADOS PESSOAIS DO SITE — edite tudo aqui.
 * ============================================================
 *  Este arquivo é a única fonte dos dados de identidade (nome,
 *  contatos, imagens próprias, projetos e números). Ele também
 *  alimenta o <title> e as meta tags do index.html no build.
 *
 *  Itens marcados com TODO ainda são do site de referência ou
 *  são placeholders e PRECISAM ser trocados antes de publicar.
 */

export const site = {
  /** Nome da marca: textos alternativos das logos e textos legais. */
  name: "APDEV",
  /** Título da aba e das prévias de compartilhamento. */
  title: "APDEV | Sites, Sistemas e IA",
  description: "Sites, sistemas e inteligência artificial feitos do zero para a sua empresa vender mais.",
  /** URL final do site (usada nas meta tags og:url / canonical). */
  url: "https://seudominio.com.br", // TODO

  whatsapp: {
    /** Só números, com DDI + DDD. Ex.: 5511999999999 */
    number: "5585985703272",
    /** Como o número aparece escrito nos textos legais. */
    display: "(85) 98570-3272",
    message: {
      pt: "Ooi! Quero solicitar um orçamento",
      en: "Hi! I'd like to request a quote",
    },
  },

  instagram: {
    user: "alvaropaiva.dev",
    url: "https://www.instagram.com/alvaropaiva.dev/",
  },

  /** Imagens de identidade (arquivos em /public). */
  images: {
    /** Foto do banner: vertical (9:16), com fundo. No desktop as laterais usam a própria foto desfocada. */
    heroPortrait: "/images/hero-foto.webp",
    /** Logo APDEV verde (rodapé, fundo branco). Proporção ~2:1. */
    logoFooter: "/images/logo-footer.webp",
    /** Logo APDEV branca (barra flutuante e moldura do computador). Proporção ~2:1. */
    logoFloating: "/images/logo-floating.webp",
    brandHand: "/images/brand-hand.webp",
    /** Logos de clientes ao lado de "+N negócios atendidos" (selos redondos 160x160). */
    clients: [
      { name: "Lure Digital", logo: "/images/client-lure.webp" },
      { name: "Certificadora CBS", logo: "/images/client-cbs.webp" },
      { name: "Netshoes", logo: "/images/client-netshoes.webp" },
      { name: "Academia Gaviões", logo: "/images/client-gavioes.webp" },
    ],
  },

  /** Números da seção de resultados. */
  stats: [
    { value: 180, prefix: "+", suffix: "" },
    { value: 20, prefix: "+", suffix: "" },
    { value: 5, prefix: "+", suffix: "K" },
    { value: 100, prefix: "", suffix: "%" },
  ],
  clientsServed: 180,

  /** Projetos do portfólio. */
  projects: [
    {
      name: "LURE GPT",
      type: { pt: "Site institucional", en: "Institutional website" },
      image: "/images/projects/lure-gpt.webp",
    },
    {
      name: "MATHEUS INACIO",
      type: { pt: "Landing page para coach", en: "Landing page for a coach" },
      image: "/images/projects/matheus-inacio.webp",
    },
    {
      name: "JUROS PRO",
      type: { pt: "Aplicativo e sistema para gestão de empréstimos", en: "App and system for loan management" },
      image: "/images/projects/juros-pro.webp",
    },
    {
      name: "LURE GROWTH",
      type: { pt: "Plataforma de cursos", en: "Online course platform" },
      image: "/images/projects/lure-growth.webp",
    },
  ] as Project[],

  /** Data exibida no topo dos textos legais. */
  legalUpdatedAt: { pt: "setembro de 2026", en: "September 2026" },
};

export type Project = {
  name: string;
  /** O que é o projeto (aparece no card, em PT e EN). */
  type: { pt: string; en: string };
  /** Imagem do card, 1536x640. */
  image: string;
};

export function whatsappUrl(lang: keyof typeof site.whatsapp.message) {
  const text = encodeURIComponent(site.whatsapp.message[lang]);
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}
