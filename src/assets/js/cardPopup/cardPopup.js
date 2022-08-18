import $ from "jquery";
import gsap from "gsap";

export default function cardPopup() {
  let button = $('.card__more');
  let popup = $('.card-popup');
  let close = $('.card-popup__close');
  let timer;
  button.on('click', function() {
    popup.removeClass('active');
    $(this).parent().next().addClass('active');
  });
  close.on('click', function() {
    clearTimeout(timer);
    gsap.to(button.parent().parent().parent(), .3, {paddingTop: 0, onComplete: function() {
      popup.removeClass('active');
    }})
  });
  $(window).on('keydown', function(e) {
    if ( e.keyCode == 27 ) {
      clearTimeout(timer);
      gsap.to(button.parent().parent().parent(), .3, {paddingTop: 0, onComplete: function() {
        popup.removeClass('active');
      }})
    }
  });
  for (let i = 0; i < button.length; i++) {
    $(button[i]).on('click', function() {
      timer = setTimeout(function() {
        gsap.to($(button[i]).parent().parent().parent(), .3, {paddingTop: popup.height() + 84 + 'px'})
      }, 1000);
      $('html, body').animate({
        scrollTop: $(popup[i]).offset().top - 112
      });
    });
  }
  
}
cardPopup();