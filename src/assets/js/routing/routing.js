import $ from "jquery";
import barba from "@barba/core";
import barbaPrefetch from "@barba/core";
import gsap from "gsap";
import isCurrentPage from "js/linksChecker/isCurrentPage/isCurrentPage";
import cardPopup from "js/cardPopup/cardPopup";
import addToCard from "js/addToCard/addToCard";

barba.use(barbaPrefetch);

// Если header находится в barba-wrapper, то скрипт ниже не нужен.
barba.hooks.beforeLeave((data) => {
  const nextPath = data.next.url.path;
  const nextItem = $(`a[href="${nextPath}"]`);
  $(`.${"active"}`).removeClass("active");
  nextItem.addClass("active");
});

barba.init({
  preventRunning: true,
  prevent: ({ el }) => el.classList && el.classList.contains('prevent'),
  requestError: (trigger, action, url, response) => {
    if (action === "click" && response.status && response.status === 404) {
      barba.go("/404");
    }
    return false;
  },
  transitions: [
    {
      name: "opacity-transition",
      leave(data) {
        return gsap.to(data.current.container, .3, {
          opacity: 0,
        });
      },
      afterLeave(data) {
        return gsap.to(data.current.container, 0, {
          display: 'none',
        });
      },
      enter(data) {
        isCurrentPage();
        cardPopup();
        addToCard();
        return gsap.from(data.next.container, .3, {
          opacity: 0
        });
      },
    },
  ],
});
