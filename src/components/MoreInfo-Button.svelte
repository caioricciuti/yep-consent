<script>
  //@ts-nocheck
  import {
    showConsentNotice,
    showConsentModal,
    siteLanguage,
  } from "../store.js";
  import consent from "../lib/consent.js";

  function handleShowConsentModal() {
    $showConsentNotice = false;
    $showConsentModal = true;
  }
</script>

<button on:click={handleShowConsentModal} class="yep-more-info-btn"
  >{consent[$siteLanguage].moreInfo}</button
>

<style>
  .yep-more-info-btn {
    color: #a1a1a1;
    background-color: transparent;
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
    .yep-more-info-btn {
      margin: 10px;
      order: 3;
    }
  }
</style>
