import $ from "jquery";

export default function stickyHeader() {
  let header = $('.header-mob');
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.removeClass('active');
    } else {
      header.addClass('active');
    }
    if (window.pageYOffset <= 0) {
      header.removeClass('active');
    }
    prevScrollpos = currentScrollPos;
  }
}
stickyHeader();