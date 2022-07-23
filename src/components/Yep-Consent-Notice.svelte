<script>
  import { showConsentNotice } from "../store.js";
  import { fade } from "svelte/transition";

  export let consent;
  export let purposesTxt;
  export let servicesArray;

  import AcceptAllButton from "./AcceptAll-Button.svelte";
  import MoreInfoButton from "./MoreInfo-Button.svelte";
  import RejectAllButton from "./RejectAll-Button.svelte";
</script>

{#if $showConsentNotice}
  <div transition:fade class="yep-cookie-notice" hidden={!$showConsentNotice}>
    <div class="yep-cookie-notice-content">
      <p class="yep-cookie-notice-text">
        {@html consent.consentNotice
          .replace("{{purposes}}", `<strong>${purposesTxt}</strong>`)
          .replace(
            "{{legal}}",
            `<a class="yep-cookie-notice-anchor" href='${consent.privacyPolicy.url}'>${consent.privacyPolicy.label}</a>`
          )}
      </p>
      <div class="yep-cookie-notice-actions">
        <MoreInfoButton MoreInfoText={consent.moreInfo} />
        <RejectAllButton {servicesArray} RejectAllText={consent.rejectAll} />
        <AcceptAllButton {servicesArray} AcceptAllText={consent.acceptAll} />
      </div>
    </div>
  </div>
{/if}

<style>
  * {
    background-color: #f0f0f0;
  }

  .yep-cookie-notice-text {
    padding: 1rem;
    text-align: justify;
  }
  .yep-cookie-notice {
    z-index: 1;
    position: fixed;
    bottom: 0;
  }
  .yep-cookie-notice-content {
    display: flex;
  }
  .yep-cookie-notice-actions {
    display: flex;
    grid-row: 2 / 3;
    margin: 1rem;
  }

  @media (max-width: 920px) {
    .yep-cookie-notice-text {
      padding: 1rem;
      margin: 0;
    }
    .yep-cookie-notice-content {
      display: inline;
    }
    .yep-cookie-notice-actions {
      justify-content: space-between;
      margin: 0;
    }
  }
</style>
