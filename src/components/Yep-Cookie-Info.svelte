<script>
  //@ts-nocheck
  import { showCookieInfo } from "../store";
  export let getInfoFromService;
  export let consent;

  function handleCloseCookieDetails() {
    showCookieInfo.update(() => {
      return (showCookieInfo.value = false);
    });
  }
</script>

<div class="yep-cookie-info-modal">
  <div class="yep-cookie-info-modal-content">
    <span class="close-yep-cookie-details" on:click={handleCloseCookieDetails}
      >&times;</span
    >
    <div class="yep-cookie-info-modal-header">
      <p>
        {consent.services[getInfoFromService]
          ? consent.services[getInfoFromService].name
          : getInfoFromService} cookie details.
      </p>
    </div>
    {#if consent.services[getInfoFromService].cookies}
      {#each consent.services[getInfoFromService].cookies as cookie}
        {cookie.name}
        {cookie.description}
        {cookie.party}
        {cookie.domain}
        {cookie.expiration}
      {/each}
    {:else}
      <p>No cookie details available.</p>
    {/if}
  </div>
</div>

<style>
  .close-yep-cookie-details {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 30px;
    color: #000;
  }
  .yep-cookie-info-modal {
    display: show;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .yep-cookie-info-modal-content {
    position: relative;
    border-radius: 10px;
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 90%;
    max-width: 500px;
  }
  .yep-cookie-info-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
