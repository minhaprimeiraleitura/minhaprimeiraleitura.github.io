document.addEventListener("DOMContentLoaded", function () {

var swiper = new Swiper(".livros-carousel", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    freeMode: true,
    loop: true,
    breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
});



