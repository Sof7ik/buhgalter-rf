document.addEventListener('DOMContentLoaded', e => {
    const swiper = new Swiper('.swiper', {
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        spaceBetween: 20,
        grabCursor: true,
    });
});