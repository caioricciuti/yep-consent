<script>
  //@ts-nocheck
  import { showConsentModal, showConsentNotice } from "../store.js";
  export let AcceptAllText;
  export let servicesArray;
  import setCookie from "../lib/writeCookie";

  function handleAcceptAll() {
    let firstHit = document.cookie.indexOf("consent=") === -1 ? true : false;
    let acceptAll = true;
    let consentTS = Date.now();

    //create object from servicesArray
    let services = {};
    servicesArray.forEach((service) => {
      services[service] = true;
    });

    let cookieValue = {
      firstHit: firstHit,
      consentTS: consentTS,
      acceptAll: acceptAll,
    };

    cookieValue = { ...cookieValue, ...services };

    cookieValue = JSON.stringify(cookieValue);

    setCookie(
      window.yepConfig.cookieName,
      cookieValue,
      window.yepConfig.cookieExpiry
    );

    showConsentNotice.update(() => {
      showConsentNotice.value = false;
    });
    showConsentModal.update(() => {
      showConsentModal.value = false;
    });
  }
</script>

<button on:click={handleAcceptAll} class="yep-accept-all-btn"
  >{AcceptAllText}</button
>

<style>
  .yep-accept-all-btn {
    background-color: #00bcd4;
    color: #fff;
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
</style>
