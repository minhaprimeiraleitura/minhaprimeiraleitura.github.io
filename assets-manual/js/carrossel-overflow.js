
$( document ).ready(function() {

  document.querySelectorAll('.carrossel-overflow-itens').forEach((carousel) => {
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      carousel.classList.add('dragging');
      startX = e.pageX;
      scrollStart = carousel.scrollLeft;
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.classList.remove('dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.pageX - startX;
      carousel.scrollLeft = scrollStart - deltaX;
    });
  });
});