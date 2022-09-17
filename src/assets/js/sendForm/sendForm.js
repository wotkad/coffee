import $ from "jquery";
import Inputmask from "inputmask";
import sendMail from "../sendMail/sendMail.js"

export default function sendForm() {

  function sendPopupForm() {
    let form = $('.popup__form');
    let popupCard = $('.popup__cards .popup__card');
    let counter = $('.callback__counter');
    let popupCart = $('.popup__cart');
    let popupCounter = $('.popup__heading span');
    if (form) {
      form.submit(function(e) {
        e.preventDefault();
        sendMail(form).then(function() {
          form.get(0).reset();
          localStorage.clear();
          popupCard.remove();
          counter.text('');
          popupCounter.text('');
          counter.hide();
          popupCart.hide();
          return successMessage();
        });
      });
    }
  }
  sendPopupForm();

  function successMessage() {
    let container = $('.success');
    container.addClass('active');
    setTimeout(function() {
      container.removeClass('active');
    }, 2000);
  }

  function inputMask() {
    let input =  $('input[type="tel"]');
    Array.from(input).forEach(function(element) {
      let mask = new Inputmask('+7 (999) 999-99-99');
      mask.mask(element);
    });
  }
  inputMask();
}
sendForm();