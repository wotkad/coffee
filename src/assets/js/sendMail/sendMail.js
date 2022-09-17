import $ from "jquery";

export default function sendMail(selector) {
  return fetch('/mail.php', {
    method: 'POST',
    body: new FormData($(selector).get(0))
  });
};