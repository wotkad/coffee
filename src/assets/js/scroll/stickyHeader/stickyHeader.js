import $ from "jquery";

export default function stickyHeader() {
  let header = $('.header-mob');
  let contentHeight = $('.card-popup__content');
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.removeClass('active');
      contentHeight.removeClass('active');
    } else {
      header.addClass('active');
      contentHeight.addClass('active');
    }
    if (window.pageYOffset <= 0) {
      header.removeClass('active');
      contentHeight.removeClass('active');
    }
    prevScrollpos = currentScrollPos;
  }
}
stickyHeader();