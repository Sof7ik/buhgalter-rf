document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 20,
    });
})