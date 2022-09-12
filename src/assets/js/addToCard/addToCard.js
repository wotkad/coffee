import $ from "jquery";

export default function addToCard() {
  let currentTimeStamp = +new Date();
  if (currentTimeStamp >= localStorage.selectedTimeStamp) {
    localStorage.clear();
  }

  let counter = $('.callback__counter');
  let popupCounter = $('.popup__heading span');
  let button = $('.call-popup');
  let popupCards = $('.popup__cards');
  let popupCart = $('.popup__cart');
  let selectedItems = []; // Массив для карточек
  let popupCard;
  let appendedButton;
  function updateData() {
    // LOCAL STORAGE
    if (localStorage.selectedItems !== undefined) {
      selectedItems = JSON.parse(localStorage.selectedItems);
      // Добавляем всем кнопкам с data-button класс active
      for (let i = 0; i < button.length; i++) {
        for (let j = 0; j < selectedItems.length; j++) {
          if ($(button[i]).attr('data-button') == selectedItems[j].id) {
            $(button[i]).addClass('active');
          }
        }
      }
      // Обновляем состояния счётчиков и контейнера в форме заявки
      if (localStorage.counter == undefined || localStorage.counter == 0) {
        counter.hide();
        popupCart.hide();
        counter.text(localStorage.counter);
        popupCounter.text(localStorage.counter);
      } else {
        counter.css('display', 'flex');
        popupCart.show();
        counter.text(localStorage.counter);
        popupCounter.text(localStorage.counter);
      }
    }
  }
  updateData();

  function setData() {
    // Основной функционал после попытки загрузки контента из localstorage
    for (let i = 0; i < button.length; i++) {
      $(button[i]).on('click', function(e) {
        e.preventDefault();
        let id = $(button[i]).attr('data-button');
        let callButton = $('.call-popup[data-button="' + id + '"]');
        let mainCallButton = $('.card .card__inner .call-popup[data-button="' + id + '"]');
        if (!$(this).hasClass('active')) {
          selectedItems = selectedItems.filter((n) => { 
            return n.id != $(this).attr('data-button');
          });
          updateData();
          callButton.attr('data-button', $(this).attr('data-button')).addClass('active');
          // Создание объекта карточки
          selectedItems.push({
            id: mainCallButton.attr('data-button'),
            title: mainCallButton.parent().find('h3').text(),
            src: mainCallButton.next().attr('src'),
            alt: mainCallButton.next().attr('alt'),
          });
          localStorage.setItem('selectedTimeStamp', +new Date() + 3600 * 1000);
          // Создаем карточеки в форме заявки
          popupCards.append(
            `
            <div class="popup__card" data-card="${mainCallButton.attr('data-button')}"
              <input type="text" name="${mainCallButton.attr('data-button')}" value="${mainCallButton.parent().find('h3').text()}" >
              <div class="popup__remove call-popup active" data-button="${mainCallButton.attr('data-button')}">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1.3258 8M7.6742 8L1 1" stroke="#A6A6A6" stroke-linecap="round"/></svg>
              </div>
              <div class="popup__image">
                <img src="${mainCallButton.next().attr('src')}" alt="${mainCallButton.next().attr('alt')}">
              </div>
              <h4>${mainCallButton.parent().find('h3').text()}</h4>
            </div>
            `
          ).children().show();
          popupCard = $('.popup__cards .popup__card');
          appendedButton = $('.popup__cards .call-popup');
        } else {
          // Удаление карточек и активных классов
          popupCard = $('.popup__cards .popup__card');
          // Удаление активного класса с карточки
          if (callButton.attr('data-button') == $(this).attr('data-button')) {
            callButton.removeClass('active');
          }
          // Удаление карточки из формы заявки
          for (let j = 0; j < popupCard.length; j++) {
            if ($(popupCard[j]).attr('data-card') == $(this).attr('data-button')) {
              $(popupCard[j]).remove();
            }
          }
          // Удаление карточки из массива
          selectedItems = selectedItems.filter((n) => { 
            return n.id != $(this).attr('data-button');
          });

        }
        // Записываем выбранные карточки в localstorage
        localStorage.selectedItems = JSON.stringify(selectedItems);
        // Добавляем возможность удаления по созданной кнопке у карточки в форме заявки
        $(appendedButton).on('click', function(e) {
          e.preventDefault();
          // Удаление активного класса с карточки
          if (callButton.attr('data-button') == $(this).attr('data-button')) {
            callButton.removeClass('active');
          }
          // Удаление карточки из формы заявки
          for (let j = 0; j < popupCard.length; j++) {
            if ($(popupCard[j]).attr('data-card') == $(this).attr('data-button')) {
              $(popupCard[j]).remove();
            }
          }
          // Удаление карточки из массива
          selectedItems = selectedItems.filter((n) => { 
            return n.id != $(this).attr('data-button')
          });
          // Перезаписываем удалённые карточки в localstorage
          localStorage.selectedItems = JSON.stringify(selectedItems);
          UIElemsToggle();
        });
        // Обновляем состояния счётчиков и контейнера в форме заявки
        function UIElemsToggle() {
          if (selectedItems.length == 0) {
            counter.text(selectedItems.length);
            popupCounter.text(selectedItems.length);
            counter.hide();
            popupCart.hide();
          } else {
            popupCounter.text(selectedItems.length);
            counter.text(selectedItems.length);
            counter.css('display', 'flex');
            popupCart.show();
          }
          localStorage.counter = selectedItems.length;
        }
        UIElemsToggle();
      });
    }
  }
  setData();
}
addToCard();