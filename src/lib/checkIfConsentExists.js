// @ts-nocheck

let cookieExistis;
if (!window.yepConfig) {
  console.error(
    "[YEP-CONSENT] - yepConfig is not defined, please make sure you're loading your config file."
  );
  cookieExistis = false;
} else {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  cookieExistis = getCookie(yepConfig.cookieName);
}

const checkIfConsentExists = () => {
  if (cookieExistis) {
    return true;
  } else {
    return false;
  }
};

export default checkIfConsentExists;
