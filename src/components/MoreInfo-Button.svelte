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
    .yep-more-info-btn {
      margin: 10px;
      order: 3;
    }
  }
</style>
