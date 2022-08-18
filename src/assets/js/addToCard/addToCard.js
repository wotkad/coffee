import $ from "jquery";

export default function addToCard() {
  let counter = $('.callback__counter');
  let button = $('.call-popup');
  let buttonActive;
  for (let i = 0; i < button.length; i++) {
    $(button[i]).on('click', function(e) {
      e.preventDefault()
      let id = button[i].getAttribute('data-button');
      let all_buttons = $('.call-popup[data-button="' + id + '"]');

      if (!$(this).hasClass('active')) {
        counter.css('display', 'flex');
        all_buttons.attr('data-button', $(this).attr('data-button')).addClass('active');
      } else {
        all_buttons.attr('data-button', $(this).attr('data-button')).removeClass('active');
      }

      buttonActive = $('.card__add.active');
      counter.text(buttonActive.length);

      if (buttonActive.length == 0) {
        counter.hide();
      }
    });
  }
}
addToCard();