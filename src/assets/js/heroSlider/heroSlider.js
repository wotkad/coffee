import Swiper, { Pagination } from 'swiper';

export default function heroSlider() {
  let menu = ['01', '02', '03']
  if ($('.swiper-hero').length > 0) {
    let swiper = new Swiper('.swiper-hero', {
      slidesPerView: 1.3,
      spaceBetween: 16,
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (menu[index]) + '</span>';
        },
      },
      breakpoints: {
        768: {
          allowTouchMove: false
        },
      }
    });
    $(window).on('resize', function() {
      swiper.update();
    })
    $(window).trigger('resize')
  }
}
heroSlider();