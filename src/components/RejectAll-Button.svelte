<script>
  //@ts-nocheck
  import { showConsentNotice, showConsentModal } from "../store.js";
  export let RejectAllText;
  export let servicesArray;
  import setCookie from "../lib/writeCookie";

  function handleRejectAll() {
    let firstHit = document.cookie.indexOf("consent=") === -1 ? true : false;
    let acceptAll = false;
    let consentTS = Date.now();

    //create object from servicesArray
    let services = {};
    servicesArray.forEach((service) => {
      let isRequired = window.yepConfig.services.find(
        (element) => element.name === service
      ).required;
      isRequired ? (services[service] = true) : (services[service] = false);
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

<button on:click={handleRejectAll} class="yep-accept-all-btn"
  >{RejectAllText}</button
>

<style>
  .yep-accept-all-btn {
    background-color: #123456;
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
