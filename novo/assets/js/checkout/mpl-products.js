/**
 * MPL — Dicionário de Produtos para Checkout
 * Versão 3.0 — Maio 2026
 *
 * Como usar na URL da página de checkout:
 *   checkout.html?product=CHAVE&p=12&coupon=CUPOM
 *
 * Campos de cada produto:
 *   id          → chave usada no parâmetro ?product= da URL
 *   eduzzId     → skuEduzz cadastrado na Eduzz (numérico ou alfanumérico)
 *   name        → nome exibido no cabeçalho do checkout
 *   description → descrição curta exibida abaixo do nome
 *   price.full          → preço "de" riscado (em centavos)
 *   price.promotional   → preço "por" / preço de venda (em centavos)
 *   installments        → parcelas máximas (sobrepõe o default global)
 *   shipping.cost       → valor do frete em centavos (0 = grátis)
 *   shipping.label      → rótulo do frete (sobrepõe o default)
 *   shipping.deadlineLabel → texto de prazo exibido no cabeçalho
 *   items[]             → lista de itens incluídos no kit
 *   isDigital           → true = oculta linha de frete (infoproduto)
 *   isSubscription      → true = exibe bloco de assinatura no checkout
 */

// ─────────────────────────────────────────────────────
// DEFAULTS GLOBAIS
// Aplicados a qualquer produto que não defina seus
// próprios valores de frete / parcelas.
// ─────────────────────────────────────────────────────
const MPL_DEFAULTS = {
  installments: 12,
  shipping: {
    cost: 990,                // R$9,90 — frete fixo padrão (em centavos)
    label: "Frete fixo",
    deadlineLabel: "5 a 8 dias úteis (até 15 dias para regiões distantes)",
  },
};

// Rótulos de frete reutilizáveis
const FRETE_PADRAO   = "Frete fixo para todo o Brasil (até 15 dias úteis)";
const FRETE_GRATIS   = "Frete GRÁTIS para todo o Brasil (até 15 dias úteis)";
const FRETE_CALCULAR = "Calcule o frete inserindo o seu CEP abaixo";

// Itens bônus digitais — incluídos em todos os kits principais
const BONUS_DIGITAIS = [
  "108 cartelas de palavras ilustradas (digital — entrega imediata)",
  "Mapa da Conquista do Leitor (digital — entrega imediata)",
  "Diploma Mágico do Leitor (digital — entrega imediata)",
];


// ─────────────────────────────────────────────────────
// DICIONÁRIO DE PRODUTOS
// ─────────────────────────────────────────────────────
const MPL_PRODUCTS = {


  // ── Kit Método (Nova fase) ───────────────────────────────

  "mpl-c7": {
    id: "mpl-c7",
    eduzzId: 2974194,
    checkoutUrl: "https://chk.eduzz.com/6W48Q1KN0Z",
    name: "Kit Completo",
    description: "Leitura + Atividades + Bônus",
    price: {
      full:        22700,   // R$227,00
      promotional: 14790,   // R$147,90
    },
    installments: 12,
    shipping: {
      cost:          2493,  // R$24,93
      label:         "Frete Fixo",
      deadlineLabel: "Média de 5 dias úteis (Sudeste) · Até 15 dias úteis (Norte e Nordeste interior)",
    },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
      "3 livros de atividades — Passatempos (Volumes 1 a 3)",
      ...BONUS_DIGITAIS,
    ],
  },

  "mpl-c4": {
    id: "mpl-c4",
    eduzzId: 2974210,
    checkoutUrl: "https://chk.eduzz.com/G961DX8YW1",
    name: "Kit Só Leitura",
    description: "Leitura + Bônus",
    price: {
      full:        16700,   // R$167,00
      promotional:  9790,   // R$97,90
    },
    installments: 12,
    shipping: {
      cost:          1523,  // R$15,23
      label:         "Frete Fixo",
      deadlineLabel: "Média de 5 dias úteis (Sudeste) · Até 15 dias úteis (Norte e Nordeste interior)",
    },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
      ...BONUS_DIGITAIS,
    ],
  },

  // ── Volumes avulsos ───────────────────────────────

  "1": {
    id: "1",
    eduzzId: 286032,
    name: "Volume 1 — Duas Sílabas",
    description: "Minha Primeira Leitura — Volume 1",
    price: { full: 3990, promotional: 3990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 1 de leitura — Duas Sílabas"],
  },

  "2": {
    id: "2",
    eduzzId: 286473,
    name: "Volume 1 — Duas Sílabas (oferta)",
    description: "Minha Primeira Leitura — Volume 1",
    price: { full: 3990, promotional: 7790 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 1 de leitura — Duas Sílabas"],
  },

  "3": {
    id: "3",
    eduzzId: 286475,
    name: "Volume 1 — Oferta especial",
    description: "Minha Primeira Leitura — Volume 1",
    price: { full: 37700, promotional: 37700 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 1 de leitura — Duas Sílabas"],
  },

  "volume2": {
    id: "volume2",
    eduzzId: 624704,
    name: "Volume 2 — Duas Sílabas",
    description: "Minha Primeira Leitura — Volume 2",
    price: { full: 3990, promotional: 3990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura — Duas Sílabas"],
  },

  "volume3": {
    id: "volume3",
    eduzzId: 855592,
    name: "Volume 3",
    description: "Minha Primeira Leitura — Volume 3",
    price: { full: 3990, promotional: 3990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 3 de leitura"],
  },

  // ── Passatempos avulsos ───────────────────────────

  "passatempo1": {
    id: "passatempo1",
    eduzzId: 362318,
    name: "Passatempo — Volume 1",
    description: "Passatempo Minha Primeira Leitura — Volume 1",
    price: { full: 2990, promotional: 2990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Passatempo Volume 1 — Duas Sílabas"],
  },

  "passatempo2": {
    id: "passatempo2",
    eduzzId: 855612,
    name: "Passatempo — Volume 2",
    description: "Passatempo Minha Primeira Leitura — Volume 2",
    price: { full: 2990, promotional: 2990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Passatempo Volume 2"],
  },

  "passatempo3": {
    id: "passatempo3",
    eduzzId: 1046729,
    name: "Passatempo — Volume 3",
    description: "Passatempo Minha Primeira Leitura — Volume 3",
    price: { full: 2990, promotional: 2990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    items: ["Passatempo Volume 3"],
  },

  // ── Assinatura ────────────────────────────────────

  "assinatura-colecao": {
    id: "assinatura-colecao",
    eduzzId: 1271775,
    name: "Kit MPL — Assinatura Mensal",
    description: "Receba um volume por mês — Método da Escadinha",
    price: { full: 2990, promotional: 2990 },
    shipping: { cost: 990, deadlineLabel: FRETE_PADRAO },
    isSubscription: true,
    items: ["1 volume por mês (leitura ou passatempo)",],
  },

  // ── Kit Só Leitura ────────────────────────────────

  "combo3": {
    id: "combo3",
    eduzzId: 856825,
    name: "Kit Só Leitura",
    description: "3 volumes de leitura — Método da Escadinha",
    price: { full: 11970, promotional: 11970 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: [
      "Volume 1, 2 e 3 de leitura",
    ],
  },

  "combo3_frete_gratis": {
    id: "combo3_frete_gratis",
    eduzzId: 1640517,
    name: "Kit Só Leitura — Frete Grátis",
    description: "3 volumes de leitura — Frete grátis para todo o Brasil",
    price: { full: 13350, promotional: 13350 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "Volume 1, 2 e 3 de leitura",
    ],
  },

  "combo3FG": {
    id: "combo3FG",
    eduzzId: 1781786,
    name: "Kit Só Leitura — Frete Grátis",
    description: "4 volumes de leitura — Frete grátis para todo o Brasil",
    price: { full: 16700, promotional: 14790 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
    ],
  },

  // Kit Só Leitura — alias principal recomendado para uso atual
  "kit-leitura": {
    id: "kit-leitura",
    eduzzId: 1781786,
    name: "Kit Só Leitura",
    description: "Método da Escadinha — 4 livros de leitura + bônus digitais",
    price: { full: 16700, promotional: 9790 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
    ],
  },

  // ── Kit Completo ──────────────────────────────────

  "combo6": {
    id: "combo6",
    eduzzId: 1046763,
    name: "Kit Completo",
    description: "6 volumes — 3 leitura + 3 passatempo",
    price: { full: 20340, promotional: 20340 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: [
      "Volumes 1, 2 e 3 de leitura",
      "Passatempos 1, 2 e 3",
      ...BONUS_DIGITAIS,
    ],
  },

  "combo6_frete_gratis": {
    id: "combo6_frete_gratis",
    eduzzId: 1640517,
    name: "Kit Completo — Frete Grátis",
    description: "6 volumes — 3 leitura + 3 passatempo — Frete grátis",
    price: { full: 21720, promotional: 21720 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "Volumes 1, 2 e 3 de leitura",
      "Passatempos 1, 2 e 3",
      ...BONUS_DIGITAIS,
    ],
  },

  "combo6_desc_frete": {
    id: "combo6_desc_frete",
    eduzzId: 1640536,
    name: "Kit Completo — Combo dos 6",
    description: "6 volumes com frete com desconto",
    price: { full: 21790, promotional: 21790 },
    shipping: { cost: 380, deadlineLabel: FRETE_PADRAO },
    items: [
      "Volumes 1, 2 e 3 de leitura",
      "Passatempos 1, 2 e 3",
      ...BONUS_DIGITAIS,
    ],
  },

  "combo6FF": {
    id: "combo6FF",
    eduzzId: 1640547,
    name: "Kit Completo — Combo dos 6",
    description: "6 volumes com frete fixo",
    price: { full: 20340, promotional: 20340 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: [
      "Volumes 1, 2 e 3 de leitura",
      "Passatempos 1, 2 e 3",
      ...BONUS_DIGITAIS,
    ],
  },

  "combo6FG": {
    id: "combo6FG",
    eduzzId: 1942330,
    name: "Kit Completo — Combo dos 6 — Frete Grátis",
    description: "6 volumes — 3 leitura + 3 passatempo — Frete grátis",
    price: { full: 21900, promotional: 19790 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "Volumes 1, 2 e 3 de leitura",
      "Passatempos 1, 2 e 3",
      ...BONUS_DIGITAIS,
    ],
  },

  "comboC7": {
    id: "comboC7",
    eduzzId: "69KA16YE0O",
    name: "Kit Completo — C7",
    description: "Kit Completo com 7 volumes — Frete grátis",
    price: { full: 21900, promotional: 21780 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
      "3 livros de atividades (Passatempos 1 a 3)",
      ...BONUS_DIGITAIS,
    ],
  },

  "comboC7Especial": {
    id: "comboC7Especial",
    eduzzId: "60EE7JX303",
    name: "Kit Completo — Promoção Especial",
    description: "Kit Completo com 7 volumes — Frete grátis",
    price: { full: 21900, promotional: 19790 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
      "3 livros de atividades (Passatempos 1 a 3)",
      ...BONUS_DIGITAIS,
    ],
  },

  // Kit Completo — alias principal recomendado para uso atual
  "kit-completo": {
    id: "kit-completo",
    eduzzId: "69KA16YE0O",
    name: "Kit Completo",
    description: "Método da Escadinha — 4 livros de leitura + 3 de atividades + bônus digitais",
    price: { full: 21900, promotional: 14790 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
      "3 livros de atividades — Passatempos (Volumes 1 a 3)",
      ...BONUS_DIGITAIS,
    ],
  },

  // ── Combos menores ────────────────────────────────

  "combo5": {
    id: "combo5",
    eduzzId: 856062,
    name: "Kit MPL — Combo dos 5",
    description: "5 volumes — leitura e passatempo",
    price: { full: 17550, promotional: 17550 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: [
      "Volumes 1, 2 e 3 de leitura",
      "Passatempos 1 e 2",
    ],
  },

  "combo1": {
    id: "combo1",
    eduzzId: 624744,
    name: "Combo 1",
    description: "Minha Primeira Leitura — Combo 1",
    price: { full: 6790, promotional: 6790 },
    shipping: { cost: 1196, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 1 de leitura + Passatempo 1"],
  },

  "combo2": {
    id: "combo2",
    eduzzId: 625838,
    name: "Combo 2",
    description: "Minha Primeira Leitura — Combo 2",
    price: { full: 4990, promotional: 4990 },
    shipping: { cost: 1196, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura + Passatempo 2"],
  },

  "combo_duo": {
    id: "combo_duo",
    eduzzId: 624753,
    name: "Combo Duo",
    description: "Minha Primeira Leitura — Volumes 1 e 2",
    price: { full: 7790, promotional: 7790 },
    shipping: { cost: 1196, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 1 de leitura", "Volume 2 de leitura"],
  },

  "combo_trio": {
    id: "combo_trio",
    eduzzId: 624805,
    name: "Combo Trio",
    description: "Minha Primeira Leitura — Volumes 1, 2 e 3",
    price: { full: 10970, promotional: 10970 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 1, 2 e 3 de leitura"],
  },

  "combo3passatempos": {
    id: "combo3passatempos",
    eduzzId: 1046765,
    name: "Complete o Kit — 3 Passatempos",
    description: "Passatempos 1, 2 e 3",
    price: { full: 8990, promotional: 8990 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Passatempo 1", "Passatempo 2", "Passatempo 3"],
  },

  // ── Kits "Complete o kit" ─────────────────────────

  "comboL2p2": {
    id: "comboL2p2",
    eduzzId: 857653,
    name: "Complete o Kit — L2 + P2",
    description: "Volume 2 de leitura + Passatempo 2",
    price: { full: 5790, promotional: 5790 },
    shipping: { cost: 1196, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura", "Passatempo 2"],
  },

  "comboL3p3": {
    id: "comboL3p3",
    eduzzId: 857653,
    name: "Complete o Kit — L3 + P3",
    description: "Volume 3 de leitura + Passatempo 3",
    price: { full: 5790, promotional: 5790 },
    shipping: { cost: 1196, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 3 de leitura", "Passatempo 3"],
  },

  "comboL3p2": {
    id: "comboL3p2",
    eduzzId: 857661,
    name: "Complete o Kit — L3 + P2",
    description: "Volume 3 de leitura + Passatempo 2",
    price: { full: 4990, promotional: 4990 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 3 de leitura", "Passatempo 2"],
  },

  "comboL3p1p2": {
    id: "comboL3p1p2",
    eduzzId: 857666,
    name: "Complete o Kit — L3 + P1 + P2",
    description: "Volume 3 de leitura + Passatempos 1 e 2",
    price: { full: 7760, promotional: 7760 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 3 de leitura", "Passatempo 1", "Passatempo 2"],
  },

  "comboL2L3": {
    id: "comboL2L3",
    eduzzId: 869804,
    name: "Complete o Kit — L2 + L3",
    description: "Volumes 2 e 3 de leitura",
    price: { full: 7980, promotional: 7980 },
    shipping: { cost: 1196, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura", "Volume 3 de leitura"],
  },

  "comboL2L3p2": {
    id: "comboL2L3p2",
    eduzzId: 873680,
    name: "Complete o Kit — L2 + L3 + P2",
    description: "Volumes 2 e 3 de leitura + Passatempo 2",
    price: { full: 8320, promotional: 8320 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura", "Volume 3 de leitura", "Passatempo 2"],
  },

  "comboL2L3p1p2": {
    id: "comboL2L3p1p2",
    eduzzId: 880366,
    name: "Complete o Kit — L2 + L3 + P1 + P2",
    description: "Volumes 2 e 3 de leitura + Passatempos 1 e 2",
    price: { full: 11140, promotional: 11140 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura", "Volume 3 de leitura", "Passatempo 1", "Passatempo 2"],
  },

  "combop1p2": {
    id: "combop1p2",
    eduzzId: 880376,
    name: "Complete o Kit — P1 + P2",
    description: "Passatempos 1 e 2",
    price: { full: 3997, promotional: 3997 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Passatempo 1", "Passatempo 2"],
  },

  "comboL2L3p1p2p3": {
    id: "comboL2L3p1p2p3",
    eduzzId: 1051613,
    name: "Complete o Kit — L2 + L3 + P1 + P2 + P3",
    description: "Volumes 2 e 3 de leitura + Passatempos 1, 2 e 3",
    price: { full: 16950, promotional: 16950 },
    shipping: { cost: 1590, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura", "Volume 3 de leitura", "Passatempo 1", "Passatempo 2", "Passatempo 3"],
  },

  "comboL2L3p2p3": {
    id: "comboL2L3p2p3",
    eduzzId: 1051606,
    name: "Complete o Kit — L2 + L3 + P2 + P3",
    description: "Volumes 2 e 3 de leitura + Passatempos 2 e 3",
    price: { full: 13960, promotional: 13960 },
    shipping: { cost: 1590, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 2 de leitura", "Volume 3 de leitura", "Passatempo 2", "Passatempo 3"],
  },

  "comboL3p2p3": {
    id: "comboL3p2p3",
    eduzzId: 1055304,
    name: "Complete o Kit — L3 + P2 + P3",
    description: "Volume 3 de leitura + Passatempos 2 e 3",
    price: { full: 9970, promotional: 9970 },
    shipping: { cost: 1380, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 3 de leitura", "Passatempo 2", "Passatempo 3"],
  },

  "comboL3p1p2p3": {
    id: "comboL3p1p2p3",
    eduzzId: 1587018,
    name: "Complete o Kit — L3 + P1 + P2 + P3",
    description: "Volume 3 de leitura + Passatempos 1, 2 e 3",
    price: { full: 12960, promotional: 12960 },
    shipping: { cost: 1590, deadlineLabel: FRETE_PADRAO },
    items: ["Volume 3 de leitura", "Passatempo 1", "Passatempo 2", "Passatempo 3"],
  },

  "kitL3L4p2p3": {
    id: "kitL3L4p2p3",
    eduzzId: "G961ZN6YW1",
    name: "Complete o Kit — L3 + L4 + P2 + P3",
    description: "Volumes 3 e 4 de leitura + Passatempos 2 e 3 — Frete grátis",
    price: { full: 7360, promotional: 7360 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: ["Volume 3 de leitura", "Volume 4 de leitura", "Passatempo 2", "Passatempo 3"],
  },

  // ── Volume 4 — ofertas especiais ──────────────────

  "VOL4SUPER": {
    id: "VOL4SUPER",
    eduzzId: "R9JY4QJP9X",
    name: "Volume 4 — Super Oferta",
    description: "Quantidade limitada — Frete grátis",
    price: { full: 3990, promotional: 2790 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: ["Volume 4 de leitura"],
  },

  "VOL4PRE": {
    id: "VOL4PRE",
    eduzzId: "R9JY4QJP9X",
    name: "Volume 4 — Pré-Lançamento",
    description: "Oferta de pré-lançamento — Frete grátis",
    price: { full: 3990, promotional: 3690 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: ["Volume 4 de leitura"],
  },

  "VOL4AUTO": {
    id: "VOL4AUTO",
    eduzzId: "D0RV2PB69Y",
    name: "Volume 4 — Autografado",
    description: "Pré-lançamento autografado pelo autor — Frete grátis",
    price: { full: 3990, promotional: 4990 },
    shipping: { cost: 0, deadlineLabel: "Frete GRÁTIS para todo o Brasil" },
    items: ["Volume 4 de leitura — autografado pelo autor"],
  },

  "VOL4x10": {
    id: "VOL4x10",
    eduzzId: "R9JY5RRY9X",
    name: "Volume 4 — 10 exemplares",
    description: "10 exemplares com oferta de pré-lançamento",
    price: { full: 39900, promotional: 28790 },
    shipping: { cost: null, deadlineLabel: FRETE_CALCULAR },
    items: ["10 exemplares do Volume 4 de leitura"],
  },

  // ── Infoprodutos / digitais ───────────────────────

  "ebook-treineleituras": {
    id: "ebook-treineleituras",
    eduzzId: 1830431,
    name: "E-book — Treine a Leitura de Palavras",
    description: "Download imediato após o pagamento",
    price: { full: 4990, promotional: 4990 },
    isDigital: true,
    shipping: { cost: 0, deadlineLabel: "Entrega digital imediata" },
    items: ["E-book em PDF — Treine a Leitura de Palavras"],
  },

  // ── Super Combos ──────────────────────────────────

  "supercombo": {
    id: "supercombo",
    eduzzId: 2114933,
    name: "Super Combo — MPL + Clubinho",
    description: "14 livros — Kit MPL completo + Clubinho do Saber — Frete grátis",
    price: { full: 55860, promotional: 55860 },
    shipping: { cost: 0, deadlineLabel: FRETE_GRATIS },
    items: [
      "4 livros de leitura (Volumes 1 a 4)",
      "3 livros de atividades (Passatempos 1 a 3)",
      "7 livros do Clubinho do Saber",
      ...BONUS_DIGITAIS,
    ],
  },

  "comboclubinho8": {
    id: "comboclubinho8",
    eduzzId: 2188483,
    name: "Combo do Clubinho — 8 livros",
    description: "8 livros educativos com lindos temas",
    price: { full: 23920, promotional: 23920 },
    shipping: { cost: 1590, deadlineLabel: FRETE_PADRAO },
    items: ["8 livros do Clubinho do Saber"],
  },

};


// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────

/**
 * Retorna o produto pelo ID da URL, com defaults de frete aplicados.
 * Uso: const kit = MPL_getProduct("kit-completo");
 */
function MPL_getProduct(id) {
  if (!id) return null;
  const product = MPL_PRODUCTS[id];
  if (!product) return null;

  return {
    ...product,
    shipping: {
      ...MPL_DEFAULTS.shipping,
      ...product.shipping,
    },
    installments: product.installments ?? MPL_DEFAULTS.installments,
  };
}

/**
 * Formata valor em centavos para exibição.
 * Ex: 14790 → "R$ 147,90"
 * Aceita null para casos como frete a calcular.
 */
function MPL_formatCurrency(cents) {
  if (cents === null || cents === undefined) return "—";
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Lê os parâmetros da URL atual.
 * Retorna: { product, p (parcelas), coupon }
 */
function MPL_getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    product: params.get("product") || null,
    p:       parseInt(params.get("p"), 10) || null,
    coupon:  params.get("coupon") || null,
  };
}
