import $ from "jquery";

export default function sendMail(selector) {
  return fetch('/wp-content/themes/mail.php', {
    method: 'POST',
    body: new FormData($(selector).get(0))
  });
};