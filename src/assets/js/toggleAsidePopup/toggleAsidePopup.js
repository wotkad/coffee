import $ from "jquery";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default function toggleAsidePopup() {
  let button = $('.callback');
  let popup = $('.popup');
  let close = $('.popup__close');
  let bg = $('.popup-bg');
  bg.fadeOut();
  enablePageScroll();
  button.on('click', function() {
    popup.addClass('active');
    bg.fadeIn();
    disablePageScroll();
  });
  close.on('click', function() {
    popup.removeClass('active');
    bg.fadeOut();
    enablePageScroll();
  });
  $(window).on('keydown', function(e) {
    if ( e.keyCode == 27 ) {
      popup.removeClass('active');
      bg.fadeOut();
      enablePageScroll();
    }
  });
}
toggleAsidePopup();