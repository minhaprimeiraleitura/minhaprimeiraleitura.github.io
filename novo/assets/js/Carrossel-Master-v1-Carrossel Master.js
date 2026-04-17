document.addEventListener('DOMContentLoaded', function() {
    const carrosseis = document.querySelectorAll('.custom-carousel-track');

    carrosseis.forEach(track => {
        const nav = document.getElementById('navcm-' + track.id);
        if (!nav) return;

        const btnPrev = nav.querySelector('button:first-child');
        const btnNext = nav.querySelector('button:last-child');

        // 1. Lógica de clique (Rolar baseado na largura do card definida no CSS)
        function getScrollAmount() {
            // Pega o valor da variável --card-width ou assume 320
            return parseInt(getComputedStyle(track).getPropertyValue('--card-width')) || 320;
        }

        btnPrev.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        btnNext.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        // 2. Mostrar/Esconder Setas conforme o espaço disponível
        function verificarVisibilidade() {
            const transbordou = track.scrollWidth > (track.clientWidth + 10);
            nav.style.setProperty('display', transbordou ? 'flex' : 'none', 'important');
        }

        // 3. Arrastar com o Mouse (Desktop)
        let isDown = false, startX, scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.scrollSnapType = 'none';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => { isDown = false; });
        track.addEventListener('mouseup', () => { 
            isDown = false; 
            track.style.scrollSnapType = 'x mandatory';
        });
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; 
            track.scrollLeft = scrollLeft - walk;
        });

        // Listeners de Resize e Load
        window.addEventListener('resize', verificarVisibilidade);
        window.addEventListener('load', verificarVisibilidade);
        verificarVisibilidade();
        setTimeout(verificarVisibilidade, 600); // Check extra após render
    });
});