import $ from "jquery";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default function toggleMobileMenu() {
  let button = $('.header-mob__burger');
  let popup = $('.mobile-menu');
  let bg = $('.mobile-menu__bg');
  let links = $('.mobile-menu__list a');
  button.on('click', function() {
    $(this).toggleClass('active');
    if (popup.hasClass('active')) {
      popup.removeClass('active');
      bg.fadeOut();
      enablePageScroll();
    } else {
      popup.addClass('active');
      bg.fadeIn();
      disablePageScroll();
    }
  });
  $(window).on('keydown', function(e) {
    if ( e.keyCode == 27 ) {
      button.removeClass('active');
      popup.removeClass('active');
      bg.fadeOut();
      enablePageScroll();
    }
  });
  Array.from(links).forEach(function(element) {
    $(element).on('click', function() {
      button.removeClass('active');
      popup.removeClass('active');
      bg.fadeOut();
      enablePageScroll();
    });
  })
}
toggleMobileMenu();