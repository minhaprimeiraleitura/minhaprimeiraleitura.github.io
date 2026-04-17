document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.createElement('div');
  overlay.id = 'img-zoom-overlay';
  document.body.appendChild(overlay);

  // Botão de fechar
  const closeBtn = document.createElement('div');
  closeBtn.id = 'img-zoom-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.style.display = 'none';
  document.body.appendChild(closeBtn);

  const images = document.querySelectorAll('.img-zoom img, img.img-zoom');
  let clone = null;

  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      closeZoom();
      openZoom(this);
    });
  });

  function openZoom(img) {
    const track = img.closest('.marquee-track');
    if (track) track.style.animationPlayState = 'paused';

    clone = img.cloneNode(true);
    clone.classList.add('img-zoomed-clone');
    document.body.appendChild(clone);

    void clone.offsetWidth;
    clone.classList.add('visible');

    overlay.classList.add('active');
    closeBtn.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeZoom() {
    if (clone) {
      clone.remove();
      clone = null;
    }
    overlay.classList.remove('active');
    closeBtn.style.display = 'none';
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', closeZoom);
  closeBtn.addEventListener('click', closeZoom);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeZoom(); });
});