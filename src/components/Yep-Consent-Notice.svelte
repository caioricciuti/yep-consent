<script>
  //@ts-nocheck
  import {
    showConsentNotice,
    showRejectAllBtn,
    purposesList,
    siteLanguage,
  } from "../store.js";
  import { fade } from "svelte/transition";
  import consent from "../lib/consent.js";

  import AcceptAllButton from "./AcceptAll-Button.svelte";
  import MoreInfoButton from "./MoreInfo-Button.svelte";
  import RejectAllButton from "./RejectAll-Button.svelte";

  //Create pretty text from purpose array (e.g. "Cookies, Analytics, & Advertising")
  let noDupPurposeArray = [...new Set($purposesList)];
  let prettyPurposesArray = [];
  noDupPurposeArray.forEach((element) => {
    let printName =
      consent[$siteLanguage].purposes[element] == undefined
        ? element
        : consent[$siteLanguage].purposes[element].name;
    return prettyPurposesArray.push(printName);
  });
  prettyPurposesArray = prettyPurposesArray.join(", ");
  prettyPurposesArray = prettyPurposesArray.replace(/,(?=[^,]*$)/, " &");
</script>

{#if $showConsentNotice}
  <div transition:fade class="yep-cookie-notice" hidden={!$showConsentNotice}>
    <div class="yep-cookie-notice-content">
      <p class="yep-cookie-notice-text">
        {@html consent[$siteLanguage].consentNotice
          .replace("{{purposes}}", `<strong>${prettyPurposesArray}</strong>`)
          .replace(
            "{{legal}}",
            `<a class="yep-cookie-notice-anchor" href='${consent[$siteLanguage].privacyPolicy.url}'>${consent[$siteLanguage].privacyPolicy.label}</a>`
          )}
      </p>
    </div>
    <div class="yep-cookie-notice-actions">
      <MoreInfoButton />
      {#if $showRejectAllBtn}
        <RejectAllButton />
      {/if}
      <AcceptAllButton />
    </div>
  </div>
{/if}

<style>
  .yep-cookie-notice {
    display: flex;
    background-color: #fff;
    z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .yep-cookie-notice-content {
    display: flex;
    align-items: center;
  }
  .yep-cookie-notice-text {
    max-width: 900px;
    padding: 40px;
    text-align: justify;
    font-size: 1rem;
  }
  .yep-cookie-notice-actions {
    display: flex;
    margin: 1rem;
  }

  @media (max-width: 980px) {
    .yep-cookie-notice {
      display: block;
    }
    .yep-cookie-notice-text {
      padding: 20px;
      margin: 0;
    }
    .yep-cookie-notice-content {
      display: inline;
    }
    .yep-cookie-notice-actions {
      display: flex;
      flex-direction: column;
      padding: 0;
    }
    .yep-cookie-notice-actions {
      margin: 0;
    }
  }
</style>
