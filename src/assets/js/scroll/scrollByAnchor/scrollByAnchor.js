import $ from "jquery";

export default function scrollByAnchor() {
  let link = $('.navigation__menu a');
  $('a[href*=\'#\']:not([href=\'#\'])').click(function(e) {
    let hash = this.hash;
    if (hash) {
      history.replaceState({}, '', hash);
    }
  });
  for ( let i = 0; i < Array.from(link).length; i++ ) {
    $(link[i]).on('click', function() {
      link.removeClass('active');
      if (window.location.hash == $(link[i]).attr('href')) {
        $(link[i]).attr('href', window.location.hash).addClass('active');
      }
    });
  }
  for ( let i = 0; i < Array.from(link).length; i++ ) {
    if ($(link[i]).attr('href') == window.location.hash) {
      $(link[i]).attr('href', window.location.hash).addClass('active');
    }
  }
  $(document).on('scroll', function() {
    $('.catalog__section').each(function() {
      if ( $(this).offset().top - 130 < window.pageYOffset && $(this).offset().top + $(this).height() > window.pageYOffset) {
        for ( let i = 0; i < Array.from(link).length; i++ ) {
          if (link[i].getAttribute('href') == '#' + $(this).attr('id')) {
            link.removeClass('active');
            $(link[i]).attr('href', '#' + $(this).attr('id')).addClass('active');
          }
        }
      }
    });
  });
}
scrollByAnchor();