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

  /* ── Imagem do produto ── */
  const imgEl = $('img-produto');
  if (imgEl) {
    imgEl.src = kit.image || 'produtos/mpl-kit-completo.jpg';
    imgEl.alt = kit.name;
  }

  /* ── Cabeçalho: badge, nome e descrição ── */
  setText('hdr-badge', kit.name);
  setText('hdr-name',  kit.name);
  setText('hdr-desc',  kit.description);

  /* ── Resumo de preço ──────────────────────────────
   *
   *  Linha Produto      → price.full (preço cheio riscado na tabela verde)
   *  Linha Desconto     → diferença entre full e promotional (se houver)
   *  Linha Frete        → custo do frete (0 = Grátis; null = a calcular)
   *  Linha Total        → promotional + frete
   *  Linha Parcelamento → installmentLabel fixo do dicionário (se existir)
   *  Linha Cupom        → código do cupom vindo da URL (se existir)
   *
   *  Esses dados alimentam DOIS lugares:
   *    1. O card "Resumo da compra" (topo da página, fundo branco)
   *    2. A tabela no cabeçalho verde (mpl-header-bg)
   *  Os IDs são compartilhados — o JS preenche uma vez, ambos atualizam.
   */
  const sh        = kit.shipping;
  const freteCost = sh.cost ?? 0;
  const desconto  = kit.price.full - kit.price.promotional;
  const total     = kit.price.promotional + freteCost;

  /* Preço cheio (linha "Produto") */
  setText('tbl-price-full', MPL_formatCurrency(kit.price.full));

  /* Nome do produto no card de resumo */
  setText('hdr-name-resumo', kit.name);

  /* Frete */
  setText('tbl-shipping-label', sh.label || 'Frete');
  setText('tbl-deadline',       sh.deadlineLabel || '');
  setText('tbl-shipping-cost',
    sh.cost === null
      ? 'a calcular'
      : sh.cost === 0
        ? 'Grátis'
        : MPL_formatCurrency(sh.cost)
  );

  /* Texto de frete no card de resumo (linha simples) */
  setText('resumo-frete-label', sh.label || 'Frete');
  setText('resumo-frete-val',
    sh.cost === null
      ? 'a calcular'
      : sh.cost === 0
        ? 'Grátis'
        : MPL_formatCurrency(sh.cost)
  );

  /* Desconto — só exibe se houver */
  if (desconto > 0) {
    show('row-desconto');
    setText('tbl-discount',    `− ${MPL_formatCurrency(desconto)}`);
    setText('resumo-desc-val', `− ${MPL_formatCurrency(desconto)}`);
  } else {
    hide('row-desconto');
    hide('resumo-row-desconto');
  }

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

  /* ── iframe Eduzz ── */
  const iframe  = $('mpl-eduzz-iframe');
  if (iframe) {
    const baseUrl = kit.checkoutUrl || `https://eduzz.com/checkout/${kit.eduzzId}`;
    const eduzzParams = new URLSearchParams();
    if (coupon) eduzzParams.set('coupon', coupon);
    iframe.src = `${baseUrl}?${eduzzParams.toString()}`;

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
