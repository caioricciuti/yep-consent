// @ts-nocheck

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";

  window.dataLayer = window.dataLayer || [];

  console.log(value)

  const setOrChangeCookie = JSON.parse(value).firstHit;

  window.dataLayer.push({
    event: setOrChangeCookie ? "setCookie" : "changeCookie",
    name: name,
    value: value,
  });
};

export default setCookie;
