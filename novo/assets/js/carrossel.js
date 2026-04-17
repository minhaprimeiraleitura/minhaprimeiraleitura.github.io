/* ============================================================
   CARROSSEL — BLOCOS DOS PILARES
   bloco-metodo.js | Minha Primeira Leitura | 2026
   ============================================================ */

(function () {
  const track = document.getElementById('pilaresTrack');
  const dots  = document.querySelectorAll('#pilaresDots .dot');
  const cards = document.querySelectorAll('#pilaresTrack .pilar-card');
  if (!track || !cards.length) return;

  let atual = 0;

  function irPara(i) {
    atual = Math.max(0, Math.min(i, cards.length - 1));
    const card = cards[atual];
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    dots.forEach((d, idx) => d.classList.toggle('ativo', idx === atual));
  }

  document.getElementById('pilaresAnterior')
    ?.addEventListener('click', () => irPara(atual - 1));

  document.getElementById('pilaresProximo')
    ?.addEventListener('click', () => irPara(atual + 1));

  dots.forEach(d =>
    d.addEventListener('click', () => irPara(+d.dataset.i))
  );

  /* Atualiza dot no scroll manual */
  track.addEventListener('scroll', () => {
    const meio = track.scrollLeft + track.clientWidth / 2;
    cards.forEach((c, i) => {
      if (c.offsetLeft <= meio && c.offsetLeft + c.offsetWidth > meio) {
        dots.forEach((d, j) => d.classList.toggle('ativo', j === i));
        atual = i;
      }
    });
  }, { passive: true });
})();
