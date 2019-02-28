import './style.scss';

document.addEventListener('DOMContentLoaded', function () {
  var randomString = `Random String: <span>${3123123}</span>`;

  window.setTimeout(function () {
    document.getElementsByTagName('h1')[0].innerHTML = randomString
  }, 0);
});