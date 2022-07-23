<script>
  //@ts-nocheck
  import { showConsentNotice, showConsentModal } from "../store.js";
  export let MoreInfoText;

  function handleShowConsentModal() {
    showConsentNotice.update(() => {
      return (showConsentNotice.value = false);
    });
    showConsentModal.update(() => {
      return (showConsentNotice.value = true);
    });
  }
</script>

<button on:click={handleShowConsentModal} class="yep-accept-all-btn"
  >{MoreInfoText}</button
>

<style>
  .yep-accept-all-btn {
    color: #cacaca;
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
