<script>
  import { showConsentNotice, showRejectAllBtn } from "../store.js";
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
        {#if $showRejectAllBtn}
          <RejectAllButton {servicesArray} RejectAllText={consent.rejectAll} />
        {/if}
        <AcceptAllButton {servicesArray} AcceptAllText={consent.acceptAll} />
      </div>
    </div>
  </div>
{/if}

<style>
  .yep-cookie-notice {
    background-color: #f0f0f0;
    z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100%;
    align-items: center;
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
