(function () {
  const $       = (id) => document.getElementById(id);
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = $(id); if (el) el.innerHTML    = val; };
  const show    = (id) => { const el = $(id); if (el) el.classList.remove('d-none'); };
  const hide    = (id) => { const el = $(id); if (el) el.classList.add('d-none'); };

  /* ── Ano no footer ── */
  setText('mpl-year', new Date().getFullYear());

  /* ── Lê parâmetros da URL ── */
  const { product: productId, coupon } = MPL_getURLParams();
  const kit = MPL_getProduct(productId);

  if (!kit) { show('mpl-error'); return; }
  show('mpl-main');
  show('mpl-footer');

  /* ── Nome de exibição: usa 'resume' se existir, senão 'name' ── */
  const displayName = kit.resume || kit.name;

  /* ── Imagem do produto ── */
  const imgEl = $('img-produto');
  if (imgEl) {
    imgEl.src = kit.image || 'produtos/mpl-kit-completo.jpg';
    imgEl.alt = displayName;
  }

  /* ── Cabeçalho: badge, nome e descrição ── */
  setText('hdr-badge', displayName);
  setText('hdr-name',  displayName);
  setText('hdr-desc',  kit.description);

  /* ── Resumo de preço ── */
  const sh        = kit.shipping;
  const freteCost = sh.cost ?? 0;
  const desconto  = kit.price.full - kit.price.promotional;
  const finalPrice = kit.price.promotional || kit.price.full;
  const total     = finalPrice + freteCost;

  /* Nome do produto no card de resumo */
  setText('hdr-name-resumo', displayName);

  /* Linha de preço — depende de show_add */
  const precoEl = $('resumo-preco-linha');
  if (precoEl) {
    if (kit.show_add && desconto > 0) {
      precoEl.innerHTML =
        `<span class="text-decoration-line-through text-muted">${MPL_formatCurrency(kit.price.full)}</span>`
        + ` <span class="text-muted">−</span> `
        + `<span class="text-success">${MPL_formatCurrency(desconto)}</span>`
        + ` <span class="text-muted">=</span> `
        + `<span class="fw-bold">${MPL_formatCurrency(kit.price.promotional)}</span>`;
    } else {
      precoEl.innerHTML = `<span class="fw-bold">${MPL_formatCurrency(finalPrice)}</span>`;
    }
  }

  /* Frete (com sinal de +) */
  setText('tbl-shipping-label', sh.label || 'Frete');
  setText('tbl-deadline',       sh.deadlineLabel || '');
  setText('tbl-shipping-cost',
    sh.cost === null
      ? 'a calcular'
      : sh.cost === 0
        ? 'Grátis'
        : MPL_formatCurrency(sh.cost)
  );

  setText('resumo-frete-label', sh.label || 'Frete');
  setText('resumo-frete-val',
    sh.cost === null
      ? 'a calcular'
      : sh.cost === 0
        ? 'Grátis'
        : `+ ${MPL_formatCurrency(sh.cost)}`
  );

  /* Total */
  setText('tbl-total',    MPL_formatCurrency(total));
  setText('resumo-total', MPL_formatCurrency(total));

  /* Parcelamento — texto fixo do dicionário; oculta se não definido */
  const labelParc = kit.price.installmentLabel || null;
  if (labelParc) {
    show('row-installments');
    setText('tbl-installments',    labelParc);
    show('resumo-row-parcelas');
    setText('resumo-parcelas-val', labelParc);
  } else {
    hide('row-installments');
    hide('resumo-row-parcelas');
  }

  /* Cupom sugerido */
  if (coupon) {
    show('hdr-coupon-tag');
    setText('hdr-coupon-code', coupon.toUpperCase());
    show('resumo-row-cupom');
    setText('resumo-cupom-val', coupon.toUpperCase());
  } else {
    hide('resumo-row-cupom');
  }

  /* Texto de prazo no card de resumo */
  setText('resumo-prazo', sh.deadlineLabel || '');

  /* ── Lista de itens incluídos ── */
  const iconMap = (s) => {
    s = s.toLowerCase();
    if (s.includes('atividade') || s.includes('passatempo')) return 'bi-pencil-fill';
    if (s.includes('cartela')   || s.includes('palavra'))    return 'bi-grid-3x3-gap-fill';
    if (s.includes('diploma'))                                return 'bi-award-fill';
    if (s.includes('mapa'))                                   return 'bi-map-fill';
    return 'bi-book-fill';
  };

  const list = $('hdr-items-list');
  if (list) {
    kit.items.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'd-flex align-items-center gap-2 py-2'
        + (i < kit.items.length - 1 ? ' border-bottom border-mpl' : '');
      div.innerHTML = `
        <span class="rounded-circle bg-mpl-pale d-flex align-items-center justify-content-center flex-shrink-0"
              style="width:24px;height:24px">
          <i class="bi ${iconMap(item)} text-mpl-green" style="font-size:.72rem"></i>
        </span>
        <span class="fw-semibold mpl-text-sm">${item}</span>`;
      list.appendChild(div);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     iframe Eduzz — monta URL com parâmetros da URL + defaults
     ══════════════════════════════════════════════════════════════ */
  const iframe = $('mpl-eduzz-iframe');
  if (iframe) {
    const baseUrl = kit.checkoutUrl || `https://chk.eduzz.com/${kit.eduzzId}`;

    /*
     * Parâmetros Eduzz aceitos pela URL do checkout.
     * Tudo que vier na URL da nossa página e pertencer a esta lista
     * é repassado para o iframe. Params internos (product, coupon)
     * são tratados separadamente e NÃO entram nesta lista.
     */
    const EDUZZ_PARAMS = [
      'cupom',            // cupom de desconto
      'p',                // pré-seleciona parcelas
      'pf',               // força seleção de parcelas
      'np',               // máximo de parcelas exibidas
      'b',                // boleto (1=sim, 0=não)
      'nome', 'name',     // nome do cliente
      'email',            // e-mail do cliente
      'cel', 'phone',     // celular
      'doc',              // CPF/CNPJ
      'cep', 'zip',       // CEP
      'num',              // número do endereço
      'without_number',   // sem número
      'comp',             // complemento
      'state',            // estado
      'city',             // cidade
      'street',           // rua
      'district',         // bairro
      'country',          // país (ISO3166 alpha-3)
      'currency',         // moeda/idioma
      'df',               // só CPF
      'dj',               // só CNPJ
      'dv',               // vencimento boleto (dias)
      'dd',               // vencimento boleto (data fixa)
      'a',                // afiliado
      'u',                // upsell one click
      'skip',             // pula step 1 se dados preenchidos
      'showDescription',  // mostra/esconde descrição (Elements)
      'utm_source',       // UTMs
      'utm_medium',
      'utm_campaign',
      'utm_content',
    ];

    /* Defaults — aplicados se o parâmetro NÃO vier na URL */
    const DEFAULTS = {
      pf:              '1',   // força seleção de parcelas
      showDescription: '0',   // esconde descrição do produto
    };

    /* Lê todos os params da URL atual */
    const urlParams = new URLSearchParams(window.location.search);

    /* Monta os params para o iframe */
    const eduzzParams = new URLSearchParams();

    /* 1. Cupom: aceita 'coupon' (nosso) ou 'cupom' (Eduzz) na URL */
    const cupomVal = urlParams.get('cupom') || coupon;
    if (cupomVal) eduzzParams.set('cupom', cupomVal);

    /* 2. Repassa todos os params Eduzz que vieram na URL (exceto cupom, já tratado) */
    EDUZZ_PARAMS.forEach(param => {
      if (param === 'cupom') return; // já tratado acima
      const val = urlParams.get(param);
      if (val !== null) eduzzParams.set(param, val);
    });

    /* 3. Aplica defaults para params que não vieram na URL */
    Object.entries(DEFAULTS).forEach(([key, defaultVal]) => {
      if (!eduzzParams.has(key)) eduzzParams.set(key, defaultVal);
    });

    /* Monta URL final */
    const paramString = eduzzParams.toString();
    iframe.src = baseUrl + (paramString ? `?${paramString}` : '');

    /* Resize dinâmico via postMessage da Eduzz */
    window.addEventListener('message', (e) => {
      if (!e.data) return;
      if (typeof e.data.height === 'number' && e.data.height > 0) {
        iframe.style.minHeight = (e.data.height + 60) + 'px';
      }
    });

    /* Oculta loading quando iframe termina de carregar */
    const hideLoading = () => {
      const el = $('mpl-loading');
      if (el) el.classList.add('hidden');
    };
    iframe.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 10000);
  }

})();
