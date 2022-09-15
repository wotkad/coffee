import $ from "jquery";
import barba from "@barba/core";
import barbaPrefetch from "@barba/core";
import gsap from "gsap";
import isCurrentPage from "../linksChecker/isCurrentPage/isCurrentPage";
import cardPopup from "../cardPopup/cardPopup";
import addToCard from "../addToCard/addToCard";
import scrollByAnchor from "../scroll/scrollByAnchor/scrollByAnchor";
import toggleAsidePopup from "../toggleAsidePopup/toggleAsidePopup";
import stickyHeader from "../scroll/stickyHeader/stickyHeader";
import heroSlider from "../heroSlider/heroSlider";

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
  transitions: [
    {
      name: "opacity-transition",
      leave(data) {
        return gsap.to(data.current.container, .3, {
          opacity: 0,
        });
      },
      afterLeave(data) {
        $('body,html').animate({scrollTop: 0}, 200);
        return gsap.to(data.current.container, 0, {
          display: 'none',
        });
      },
      enter(data) {
        isCurrentPage();
        cardPopup();
        addToCard();
        scrollByAnchor();
        toggleAsidePopup();
        stickyHeader();
        heroSlider();
        if (data.next.namespace == '404' || $(window).width() >= 1024) {
          $('.hidden__button').fadeOut();
        } else {
          $('.hidden__button').fadeIn();
        }
        return gsap.from(data.next.container, .3, {
          opacity: 0
        });
      },
    },
  ],
});
