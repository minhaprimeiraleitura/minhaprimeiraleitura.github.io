  (function () {
    const $      = (id) => document.getElementById(id);
    const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    const show   = (id) => $(id).classList.remove('d-none');

    setText('mpl-year', new Date().getFullYear());

    const { product: productId, p: urlParcelas, coupon } = MPL_getURLParams();
    const kit = MPL_getProduct(productId);

    if (!kit) { show('mpl-error'); return; }
    show('mpl-main');

    const parcelas = urlParcelas || kit.installments || MPL_DEFAULTS.installments;

    /* ── Preenche cabeçalho ── */
    setText('hdr-badge',       kit.name);
    setText('hdr-name',        kit.name);
    setText('hdr-desc',        kit.description);
    setText('hdr-price-full',  MPL_formatCurrency(kit.price.full));
    setText('hdr-price-promo', MPL_formatCurrency(kit.price.promotional));

    if (parcelas > 1)
      setText('hdr-installments',
        `ou ${parcelas}x de ${MPL_formatCurrency(kit.price.promotional / parcelas)} sem juros`);

    const economia = kit.price.full - kit.price.promotional;
    if (economia > 0) {
      show('hdr-savings');
      setText('hdr-savings-val', `Economia de ${MPL_formatCurrency(economia)}`);
    }

    const sh = kit.shipping;
    setText('hdr-shipping-label',
      sh.cost === 0 ? 'Frete grátis' : `Frete: ${MPL_formatCurrency(sh.cost)}`);
    setText('hdr-deadline-label', sh.deadlineLabel);

    if (coupon) {
      show('hdr-coupon-tag');
      setText('hdr-coupon-code', coupon.toUpperCase());
    }

    /* ── Lista de itens ── */
    const iconMap = (s) => {
      s = s.toLowerCase();
      if (s.includes('atividade') || s.includes('passatempo')) return 'bi-pencil-fill';
      if (s.includes('cartela')   || s.includes('palavra'))    return 'bi-grid-3x3-gap-fill';
      if (s.includes('diploma'))                                return 'bi-award-fill';
      if (s.includes('mapa'))                                   return 'bi-map-fill';
      return 'bi-book-fill';
    };

    const list = $('hdr-items-list');
    kit.items.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'd-flex align-items-center gap-2 py-2'
        + (i < kit.items.length - 1 ? ' border-bottom border-mpl' : '');
      div.innerHTML = `
        <span class="rounded-circle bg-mpl-pale d-flex align-items-center justify-content-center flex-shrink-0"
              style="width:28px;height:28px">
          <i class="bi ${iconMap(item)} text-mpl-green" style="font-size:.82rem"></i>
        </span>
        <span class="small fw-bold">${item}</span>`;
      list.appendChild(div);
    });

    /* ── iframe Eduzz ── */
    const eduzzParams = new URLSearchParams();
    if (parcelas) eduzzParams.set('p', parcelas);
    if (coupon)   eduzzParams.set('coupon', coupon);

    const iframe = $('mpl-eduzz-iframe');
    const baseUrl = kit.checkoutUrl || `https://eduzz.com/checkout/${kit.eduzzId}`;
    const eduzzParams = new URLSearchParams();
    if (parcelas) eduzzParams.set('p', parcelas);
    if (coupon)   eduzzParams.set('coupon', coupon);
    iframe.src = `${baseUrl}?${eduzzParams.toString()}`;

    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.height === 'number')
        iframe.style.minHeight = (e.data.height + 40) + 'px';
    });

    const hideLoading = () => $('mpl-loading').classList.add('hidden');
    iframe.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 8000);

  })();

