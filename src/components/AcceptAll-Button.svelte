<script>
  //@ts-nocheck
  import {
    showConsentModal,
    showConsentNotice,
    servicesList,
    siteLanguage,
  } from "../store.js";
  //import to get button text
  import consent from "../lib/consent.js";

  //import function to set the cookie
  import setCookie from "../lib/writeCookie";

  function handleAcceptAll() {
    let firstHit =
      document.cookie.indexOf(window.yepConfig.cookieName) === -1
        ? true
        : false;
    let acceptAll = true;
    let consentTS = Date.now();

    let serviceObject = {};
    $servicesList.forEach((service) => {
      serviceObject[service.name] = true;
    });

    let cookieValue = {
      firstHit: firstHit,
      consentTS: consentTS,
      acceptAll: acceptAll,
    };

    cookieValue = { ...cookieValue, ...serviceObject };

    cookieValue = JSON.stringify(cookieValue);

    setCookie(
      window.yepConfig.cookieName,
      cookieValue,
      window.yepConfig.cookieExpiry
    );

    $showConsentNotice = false;

    $showConsentModal = false;
  }
</script>

<button on:click={handleAcceptAll} class="yep-accept-all-btn"
  >{consent[$siteLanguage].acceptAll}</button
>

<style>
  .yep-accept-all-btn {
    background-color: #00bcd4;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 12px;
    white-space: nowrap;
    text-align: center;
    margin: 12px;
  }
  @media (max-width: 980px) {
    .yep-accept-all-btn {
      margin: 10px;
      order: 1;
    }
  }
</style>
