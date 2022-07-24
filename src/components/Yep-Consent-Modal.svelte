<script>
  //@ts-nocheck
  import { slide, fade } from "svelte/transition";
  import {
    showConsentModal,
    showConsentNotice,
    showCookieInfo,
  } from "../store.js";

  import AcceptAllButton from "./AcceptAll-Button.svelte";
  import RejectAllButton from "./RejectAll-Button.svelte";
  import CookieInfoModal from "./Yep-Cookie-Info.svelte";
  export let consent;
  export let purposesArray;
  export let servicesArray;

  function handleCloseConsentModal() {
    showConsentNotice.update(() => {
      return (showConsentModal.value = true);
    });
    showConsentModal.update(() => {
      return (showConsentModal.value = false);
    });
  }

  let purposeArray = [];
  //get all purposes from CONSENT
  purposesArray.forEach((element) => {
    if (consent.purposes[element]) {
      purposeArray.push({
        key: element,
        name: consent.purposes[element].name,
        description: consent.purposes[element].description,
      });
    } else {
      purposeArray.push({ name: element });
    }
  });

  let accordOpen = "";
  function handleOpenAccordion(purposeAccordion) {
    purposeAccordion === accordOpen
      ? (accordOpen = "")
      : (accordOpen = purposeAccordion);
  }

  let getInfoFromService = null;
  function handleOpenCookieInfo(serviceName) {
    getInfoFromService = serviceName;
    $showCookieInfo = true;
  }
</script>

{#if $showConsentModal}
  {#if $showCookieInfo}
    <CookieInfoModal {consent} {getInfoFromService} />
  {/if}

  <div transition:fade class="yep-consent-modal">
    <div class="yep-consent-modal-content">
      <span class="close-yep-consent-modal" on:click={handleCloseConsentModal}
        >&times;</span
      >
      <p class="yep-consent-modal-title">{consent.consentModalTitle}:</p>
      <p class="yep-consent-modal-text">
        {@html consent.consentModalText.replace(
          "{{legal}}",
          `<a style="color: inherit" href='${consent.impressum.url}'>${consent.impressum.label}</a>`
        )}
      </p>
      <hr class="yep-hr" />

      {#each purposeArray as purpose}
        <div class="yep-accordion">
          <div class="yep-accordion-item">
            <div class="yep-accordion-item-header">
              <input
                indeterminate="true"
                type="checkbox"
                name={purpose.key}
                id={purpose.key}
              />
              <p class="yep-purpouse-name-modal">{purpose.name}</p>

              {#if accordOpen !== purpose.name}
                <span
                  on:click={() => {
                    handleOpenAccordion(purpose.name);
                  }}
                  class="yep-chevron-down yep-chevron-modal"
                />
              {:else}
                <span
                  on:click={() => {
                    handleOpenAccordion(purpose.name);
                  }}
                  class="yep-chevron-up yep-chevron-modal"
                />
              {/if}
            </div>
            <div class="yep-accordion-item-text">
              {purpose.description ? purpose.description : ""}
            </div>

            {#each window.yepConfig.services as service}
              {#if accordOpen === purpose.name}
                {#if purpose.key === service.purpose}
                  <div transition:slide class="yep-accordion-services">
                    <div class="yep-service">
                      <input type="checkbox" />
                      <label for={service.name}
                        >{consent.services[service.name]
                          ? consent.services[service.name].name
                          : service.name}
                      </label>
                      <span
                        on:click={() => {
                          handleOpenCookieInfo(service.name);
                        }}
                        class="yep-consent-cookie-info">Cookie Info</span
                      >
                    </div>
                  </div>
                {/if}
              {/if}
            {/each}
          </div>
        </div>
      {/each}

      <hr class="yep-hr" />

      <div class="yep-consent-modal-actions">
        <AcceptAllButton {servicesArray} AcceptAllText={consent.acceptAll} />
        <RejectAllButton {servicesArray} RejectAllText={consent.rejectAll} />
      </div>
    </div>
  </div>
{/if}

<style>
  .yep-consent-modal {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
  }
  .yep-consent-modal-content {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
    margin: 20px 20px;
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    max-width: 700px;
    overflow: scroll;
  }
  .close-yep-consent-modal {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 30px;
    color: #000;
  }
  .yep-consent-modal-title {
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .yep-hr {
    margin-top: 1rem;
    background-color: #cacaca;
    height: 1px;
    border: none;
    border-radius: 10px;
  }
  .yep-accordion-item-header {
    display: flex;
    align-items: center;
  }
  .yep-chevron-down {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    cursor: pointer;
  }
  .yep-chevron-down::after {
    content: "";
    display: block;
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
  .yep-chevron-up {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    cursor: pointer;
  }
  .yep-chevron-up::after {
    content: "";
    display: block;
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
  .yep-accordion {
    margin-bottom: 1rem;
  }

  .yep-accordion-item {
    width: 100%;
    margin-top: 1rem;
  }

  .yep-purpouse-name-modal {
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 10px;
  }
  .yep-accordion-item-text {
    font-size: 0.8em;
    color: #888;
  }
  .yep-chevron-modal {
    margin-left: 10px;
    float: right !important;
  }
  .yep-consent-cookie-info {
    font-size: 0.8em;
    font-weight: bold;
    color: #4e86bd;
    margin-left: 10px;
    float: right;
    cursor: pointer;
  }
</style>
