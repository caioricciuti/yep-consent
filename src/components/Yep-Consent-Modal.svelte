<script>
  //@ts-nocheck
  import {
    showConsentNotice,
    showConsentModal,
    showRejectAllBtn,
    servicesList,
    purposesList,
    siteLanguage,
  } from "../store.js";
  import consent from "../lib/consent.js";
  import { fade, fly } from "svelte/transition";

  import AcceptSelectedButton from "./AcceptSelected-Button.svelte";

  function handleCloseModal() {
    $showConsentModal = false;
    if (document.cookie.indexOf(window.yepConfig.cookieName) === -1) {
      $showConsentNotice = true;
    }
  }

  //delete duplicates on purpose array.
  let purposesNoDups = [...new Set($purposesList)];

  //get checked purposes/services
  let group = 1;
  let serviceAndPurposeSelection = [];

  $servicesList.forEach((element) => {
    if (element.required) {
      serviceAndPurposeSelection.push(element.name);
    }
  });

  let hideServiceList = null;

  function handleShowServiceList(purpose) {
    if (hideServiceList === purpose) {
      hideServiceList = null;
    } else {
      hideServiceList = purpose;
    }
  }
</script>

{#if $showConsentModal}
  <div transition:fade class="yep-consent-modal-background">
    <div class="yep-consent-modal-content">
      <span on:click={handleCloseModal} class="yep-consent-modal-close"
        >&times;</span
      >

      <div class="yep-consent-modal-header">
        <p class="yep-consent-modal-header-title">
          {consent[$siteLanguage].consentModalTitle}
        </p>
      </div>
      <div class="yep-consent-modal-header-body">
        <p>
          {@html consent[$siteLanguage].consentModalText.replace(
            "{{legal}}",
            `<a style="color: inherit" href='${consent[$siteLanguage].privacyPolicy.url}'>${consent[$siteLanguage].privacyPolicy.label}</a>`
          )}
        </p>
      </div>
      <hr />

      <div class="yep-consent-modal-body-services">
        {#each purposesNoDups as purpouseGroup}
          <div class="yep-consent-purpouse-group">
            <input
              bind:group={serviceAndPurposeSelection}
              type="checkbox"
              indeterminate="true"
              value={purpouseGroup}
              id={consent[$siteLanguage].purposes[purpouseGroup].name}
            />
            <label
              class="yep-consent-modal-purpose-list-label"
              for={consent[$siteLanguage].purposes[purpouseGroup].name}
              >{consent[$siteLanguage].purposes[purpouseGroup]
                ? consent[$siteLanguage].purposes[purpouseGroup].name
                : "Other"}
            </label>

            {#if hideServiceList !== purpouseGroup}
              <span
                class="yep-consent-chevron-down yep-chev-span"
                on:click={() => {
                  handleShowServiceList(purpouseGroup);
                }}
              />
            {/if}

            {#if hideServiceList === purpouseGroup}
              <span
                class="yep-consent-chevron-up yep-chev-span"
                on:click={() => {
                  handleShowServiceList(purpouseGroup);
                }}
              />
            {/if}

            {#if consent[$siteLanguage].purposes[purpouseGroup]}
              <div class="yep-consent-purpose-description">
                {consent[$siteLanguage].purposes[purpouseGroup].description
                  ? consent[$siteLanguage].purposes[purpouseGroup].description
                  : " "}
              </div>
            {/if}

            {#each $servicesList as service}
              <div
                hidden={hideServiceList !== service.purpose}
                class="yep-consent-modal-services-list"
              >
                {#if service.purpose === purpouseGroup}
                  <div class="yep-consent-modal-service-list-item">
                    <input
                      bind:group={serviceAndPurposeSelection}
                      class="yep-consent-modal-service-list-checkbox"
                      type="checkbox"
                      disabled={service.required}
                      value={service.name}
                      id={service.name}
                    />
                    <label
                      class="yep-consent-modal-service-list-label"
                      for={service.name}
                      >{consent[$siteLanguage].services[service.name]
                        ? consent[$siteLanguage].services[service.name].name
                        : service.name}</label
                    >
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>

      <div class="yep-consent-modal-actions">
        <AcceptSelectedButton {serviceAndPurposeSelection} />
      </div>
    </div>
  </div>
{/if}

<style>
  .yep-consent-modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    overflow: auto;
  }
  .yep-consent-modal-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .yep-consent-modal-content {
    overflow: auto;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    max-width: 700px;
    background-color: #fff;
    max-height: 80vh;
    z-index: 2;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .yep-consent-modal-header-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .yep-consent-modal-header-body {
    margin: 1rem 0rem;
    text-align: justify;
    width: 95%;
  }

  .yep-consent-modal-services-list {
    margin: 1rem 0rem;
  }

  .yep-consent-modal-purpose-list-label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }

  .yep-consent-chevron-up {
    cursor: pointer;
    box-sizing: border-box;
    position: relative;

    transform: scale(var(--ggs, 1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
  }
  .yep-consent-chevron-up::after {
    content: "";
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
    left: 4px;
    bottom: 2px;
  }
  .yep-consent-chevron-down {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    transform: scale(var(--ggs, 1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
  }
  .yep-consent-chevron-down::after {
    content: "";
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    left: 4px;
    top: 2px;
  }
  .yep-consent-purpouse-group {
    margin: 1rem 0rem;
    align-items: center;
  }
  .yep-consent-purpose-description {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    color: #666;
  }
  .yep-chev-span {
    color: rgb(32, 92, 121);
    float: right;
    margin-right: 2em;
  }
  .yep-consent-modal-service-list-item {
    margin-left: 2em;
  }
  .yep-consent-modal-service-list-checkbox {
    margin-right: 1em;
  }
  .yep-consent-modal-service-list-label {
    font-size: 1rem;
    color: rgb(60, 60, 60);
    font-weight: bold;
  }
</style>
