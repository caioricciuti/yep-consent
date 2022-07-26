<script>
  //@ts-nocheck
  import {
    showConsentNotice,
    showConsentModal,
    servicesList,
    siteLanguage,
  } from "../store.js";
  import consent from "../lib/consent.js";
  import setCookie from "../lib/writeCookie";

  function handleRejectAll() {
    let firstHit =
      document.cookie.indexOf(window.yepConfig.cookieName) === -1
        ? true
        : false;
    let acceptAll = false;
    let rejectAll = true;
    let consentTS = Date.now();

    //create object from servicesArray
    let servicesObject = {};
    $servicesList.forEach((service) => {
      service.required == true
        ? (servicesObject[service.name] = true)
        : (servicesObject[service.name] = false);
    });

    let cookieValue = {
      firstHit: firstHit,
      consentTS: consentTS,
      acceptAll: acceptAll,
      rejectAll: rejectAll,
    };

    cookieValue = { ...cookieValue, ...servicesObject };
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

<button on:click={handleRejectAll} class="yep-reject-all-btn"
  >{consent[$siteLanguage].rejectAll}</button
>

<style>
  .yep-reject-all-btn {
    background-color: transparent;
    color: #717171;
    text-decoration: underline;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    white-space: nowrap;
    text-align: center;
    margin: 1rem;
  }
  @media (max-width: 980px) {
    .yep-reject-all-btn {
      margin: 10px;
      order: 2;
      max-width: 160px;
      align-self: center;
    }
  }
</style>
