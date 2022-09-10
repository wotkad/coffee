import $ from "jquery";
import gsap from "gsap";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default function cardPopup() {
  let button = $('.card__more');
  let popup = $('.card-popup');
  let close = $('.card-popup__close');
  let cardItems = $('.catalog__cards');
  let timer;
  button.on('click', function() {
    $(this).parent().parent().parent().parent().children().children('.card-popup').removeClass('active');
    $(this).parent().parent().next().addClass('active');
  });
  close.on('click', function() {
    let that = $(this);
    clearTimeout(timer);
    if ($(window).width() >= 1337) {
      gsap.to(that.parent().parent().parent(), .3, {paddingTop: 0, onComplete: function() {
        that.parent().removeClass('active');
      }});
    } else {
      enablePageScroll();
      that.parent().removeClass('active');
    }
  });
  $(window).on('keydown', function(e) {
    if ( e.keyCode == 27 ) {
      clearTimeout(timer);
      if ($(window).width() >= 1337) {
        gsap.to(cardItems, .3, {paddingTop: 0, onComplete: function() {
          popup.removeClass('active');
        }});
      } else {
        enablePageScroll();
        popup.removeClass('active');
      }
    }
  });
  for (let i = 0; i < button.length; i++) {
    $(button[i]).on('click', function() {
      if ($(window).width() >= 1337) {
        timer = setTimeout(function() {
          gsap.to($(button[i]).parent().parent().parent().parent(), .3, {paddingTop: popup.height() + 84 + 'px'});
        }, 800);
        $('html, body').animate({
          scrollTop: $(popup[i]).offset().top - 112
        });
      } else {
        disablePageScroll();
      }
    });
    $(window).on('resize', function() {
      if ($(window).width() >= 1337) {
        if (popup.hasClass('active')) {
          gsap.to($(button[i]).parent().parent().parent().parent(), .3, {paddingTop: popup.height() + 84 + 'px'});
        }
      }
    });
  }
}
cardPopup();