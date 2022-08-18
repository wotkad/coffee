import SmoothScroll from "smooth-scroll";

function smoothScroll() {
  new SmoothScroll('a[href*="#"]', {
    speed: 800,
    offset: 120,
    after: function () {
      $("body").css("overflow", "");
    },
  });
}
smoothScroll();