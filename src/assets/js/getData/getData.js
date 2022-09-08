import $ from "jquery";

export default function getData() {
  let popupCards = $('.popup__cards');
  let counter = $('.callback__counter');
  let popupCounter = $('.popup__heading span');
  let popupCart = $('.popup__cart');
  let popupCard;
  let removeButton;
  // LOCAL STORAGE
  if (localStorage.selectedItems !== undefined) {
    let selectedItems = JSON.parse(localStorage.selectedItems);
    // Если в localstorage есть карточки, создаём и показываем их
    for (let i = 0; i < selectedItems.length; i++) {
      let item = selectedItems[i];
      popupCards.append(
        `
        <div class="popup__card" data-card="${item.id}"
          <input type="text" name="${item.id}" value="${item.title}" >
          <div class="popup__remove" data-button="${item.id}">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1.3258 8M7.6742 8L1 1" stroke="#A6A6A6" stroke-linecap="round"/></svg>
          </div>
          <div class="popup__image">
            <img src="${item.src}" alt="${item.alt}">
          </div>
          <h4>${item.title}</h4>
        </div>
        `
      ).children().show();
      removeButton = $('.popup__cards .popup__remove');
      popupCard = $('.popup__cards .popup__card');
    }
    // Добавляем возможность удаления по созданной кнопке у карточки в форме заявки
    if (removeButton) {
      for (let i = 0; i < removeButton.length; i++) {
        $(removeButton[i]).on('click', function(e) {
          e.preventDefault();
          let id = $(removeButton[i]).attr('data-button');
          let callButton = $('.call-popup[data-button="' + id + '"]');

            popupCard = $('.popup__cards .popup__card');
            if (callButton.attr('data-button') == $(this).attr('data-button')) {
              callButton.removeClass('active');
            }
            for (let j = 0; j < popupCard.length; j++) {
              if ($(popupCard[j]).attr('data-card') == $(this).attr('data-button')) {
                $(popupCard[j]).remove();
              }
            }

            selectedItems = selectedItems.filter((n) => { 
              return n.id != $(this).attr('data-button')
            });

            localStorage.selectedItems = JSON.stringify(selectedItems);
            if (selectedItems.length == 0) {
              counter.text(selectedItems.length);
              popupCounter.text(selectedItems.length);
              counter.hide();
              popupCart.hide();
            } else {
              popupCounter.text(selectedItems.length);
              counter.text(selectedItems.length);
              counter.show();
              popupCart.show();
            }
            localStorage.counter = selectedItems.length;
            
        });
      }
    }
  }
}
getData();
