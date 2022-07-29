<script>
  //@ts-nocheck
  import { showCookieInfo, siteLanguage } from "../store";
  export let getInfoFromService;
  import consent from "../lib/consent";

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
      <p class="yep-cookie-details-title">
        {consent[$siteLanguage].services[getInfoFromService]
          ? consent[$siteLanguage].services[getInfoFromService].name
          : getInfoFromService} cookie details.
      </p>
    </div>
    {#if consent[$siteLanguage].services[getInfoFromService]}
      {#if consent[$siteLanguage].services[getInfoFromService].cookies}
        {#each consent[$siteLanguage].services[getInfoFromService].cookies as cookie}
          <div class="cookie-datails-card">
            <table class="cookie-detais-table">
              <tbody>
                <tr class="yep-cookie-details-tr">
                  <td class="yep-cookie-details-td-exp">Name:</td>
                  <td class="yep-cookie-details-td-int">{cookie.name}</td>
                </tr>
                <tr class="yep-cookie-details-tr">
                  <td class="yep-cookie-details-td-exp">Description:</td>
                  <td class="yep-cookie-details-td-int">{cookie.description}</td
                  >
                </tr>
                <tr class="yep-cookie-details-tr">
                  <td class="yep-cookie-details-td-exp">Party</td>
                  <td class="yep-cookie-details-td-int">{cookie.party}</td>
                </tr>
                <tr class="yep-cookie-details-tr">
                  <td class="yep-cookie-details-td-exp">Domain</td>
                  <td class="yep-cookie-details-td-int">{cookie.domain}</td>
                </tr>
                <tr class="yep-cookie-details-tr">
                  <td class="yep-cookie-details-td-exp">Expiration</td>
                  <td class="yep-cookie-details-td-int">{cookie.expiration}</td>
                </tr>
              </tbody>
            </table>
          </div>
        {/each}
      {:else}
        <p>No cookie details available.</p>
      {/if}
    {/if}
  </div>
</div>

<style>
  .yep-cookie-details-tr:nth-child(even) {
    background-color: #dddddd;
  }
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
  }
  .yep-cookie-details-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .cookie-datails-card {
    border: 1px #a1a1a1 solid;
    margin: 4px;
    padding: 4px;
    border-radius: 5px;
  }
  .cookie-detais-table {
    border-collapse: collapse;
    width: 100%;
  }
  .yep-cookie-details-tr {
    width: 100%;
    font-size: 0.8rem;
  }
  .yep-cookie-details-td-exp {
    padding: 8px;
    font-weight: bold;
    width: 25%;
  }
  .yep-cookie-details-td-int {
    padding: 8px;
  }
</style>
