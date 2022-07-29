<script>
  //@ts-nocheck
  import {
    showConsentNotice,
    showConsentModal,
    showRejectAllBtn,
    servicesList,
    purposesList,
    siteLanguage,
    showCookieInfo,
  } from "../store.js";
  import consent from "../lib/consent.js";
  import { fade } from "svelte/transition";

  import AcceptSelectedButton from "./AcceptSelected-Button.svelte";
  import YepCookieDetail from "./Yep-Cookie-Info.svelte";
  import { loop_guard } from "svelte/internal";

  function handleCloseModal() {
    $showConsentModal = false;
    if (document.cookie.indexOf(window.yepConfig.cookieName) === -1) {
      $showConsentNotice = true;
    }
  }

  //delete duplicates on purpose array.
  let purposesNoDups = [...new Set($purposesList)];

  //get checked purposes/services

  let serviceAndPurposeSelection = [];

  //push required servcices to serviceAndPurposeSelection array
  $servicesList.forEach((service) => {
    if (service.required) {
      serviceAndPurposeSelection.push(service.name);
    }
  });

  //show hide services under purposes
  let hideServiceList = null;

  function handleShowServiceList(purpose) {
    if (hideServiceList === purpose) {
      hideServiceList = null;
    } else {
      hideServiceList = purpose;
    }
  }

  //send info for cookie detail modal
  let getInfoFromService = null;
  function handleGetInfoFromService(service) {
    getInfoFromService = service;
    $showCookieInfo = true;
  }

  //checks all boxes and vice versa
  const onload = () => {
    //check box as tree
    $servicesList.forEach((service) => {
      let parentCheckBox = document.getElementById(
        service.purpose + "-checkBox"
      );
      let serviceCheckBox = document.getElementById(
        service.name + "-" + service.purpose
      );
      if (service.required) {
        serviceCheckBox.checked = true;
      }

      parentCheckBox.onchange = function () {
        $servicesList.forEach((service) => {
          let serviceCheckBox = document.getElementById(
            service.name + "-" + service.purpose
          );
          if (
            parentCheckBox.id.replace("-checkBox", "") === service.purpose &&
            !service.required
          ) {
            if (parentCheckBox.checked) {
              serviceCheckBox.checked = true;
              serviceAndPurposeSelection = [
                ...serviceAndPurposeSelection,
                service.name,
              ];
            } else {
              if (!service.required) {
                serviceCheckBox.checked = false;
                serviceAndPurposeSelection = serviceAndPurposeSelection.filter(
                  (item) => item !== service.name
                );
              }
            }
          }
        });
      };

      serviceCheckBox.onchange = function () {
        if (serviceCheckBox.checked) {
          serviceAndPurposeSelection = [
            ...serviceAndPurposeSelection,
            service.name,
          ];
          parentCheckBox.checked = true;
        }
        if (!serviceCheckBox.checked) {
          serviceAndPurposeSelection = serviceAndPurposeSelection.filter(
            (item) => item !== service.name
          );
          parentCheckBox.checked = false;
        }
      };
    });
  };
</script>

{#if $showConsentModal}
  {#if $showCookieInfo}
    <YepCookieDetail {getInfoFromService} />
  {/if}

  <div use:onload transition:fade class="yep-consent-modal-background">
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
        <p class="yep-consent-modal-header-text">
          {@html consent[$siteLanguage].consentModalText.replace(
            "{{legal}}",
            `<a style="color: inherit" href='${consent[$siteLanguage].privacyPolicy.url}'>${consent[$siteLanguage].privacyPolicy.label}</a>`
          )}
        </p>
      </div>
      <div class="yep-separator" />
      <div class="yep-consent-modal-body-services">
        {#each purposesNoDups as purpouseGroup}
          <div class="yep-consent-purpouse-group">
            <label class="yep-switch">
              <input
                class="yep-consent-input-checkbox"
                type="checkbox"
                value={purpouseGroup}
                id={purpouseGroup + "-checkBox"}
              />
              <div class="yep-slider yep-round" />
              <label
                class="yep-consent-modal-purpose-list-label"
                for={purpouseGroup + "-checkBox"}
                >{consent[$siteLanguage].purposes[purpouseGroup]
                  ? consent[$siteLanguage].purposes[purpouseGroup].name
                  : "Other"}
              </label>
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
                    <label class="yep-switch">
                      <input
                        class="yep-consent-input-checkbox"
                        type="checkbox"
                        disabled={service.required}
                        value={service.name}
                        id={service.name + "-" + service.purpose}
                      />
                      <div class="yep-slider yep-round" />
                      <label
                        class="yep-consent-modal-service-list-label"
                        for={service.name + "-" + service.purpose}
                        >{consent[$siteLanguage].services[service.name]
                          ? consent[$siteLanguage].services[service.name].name
                          : service.name}
                      </label>
                    </label>
                    <span
                      class="yep-consent-modal-cookie-info-btn"
                      on:click={() => {
                        handleGetInfoFromService(service.name);
                      }}
                      >{@html "&#9432;"}
                      <span class="yep-cookie-tooltip-text"
                        >{consent[$siteLanguage].services[service.name]
                          ? consent[$siteLanguage].services[service.name].name
                          : service.name} Cookie info</span
                      >
                    </span>
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
    padding: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 26px;
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
    padding: 20px;
    border-radius: 10px;
  }
  .yep-consent-modal-header-title {
    font-size: 20px;
    font-weight: bold;
  }
  .yep-consent-modal-header-body {
    margin: 8px 0px;
    text-align: justify;
    width: 95%;
  }

  .yep-consent-modal-services-list {
    margin: 10px 0px;
  }

  .yep-consent-modal-purpose-list-label {
    font-size: 22px;
    font-weight: bold;
    margin-left: 42px;
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
    margin: 16px 0px;
    align-items: center;
  }
  .yep-consent-purpose-description {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #666;
  }
  .yep-chev-span {
    color: rgb(32, 92, 121);
    float: right;
    margin-right: 30px;
  }
  .yep-consent-modal-service-list-item {
    margin-left: 26px;
  }
  .yep-consent-modal-service-list-label {
    font-size: 18px;
    color: rgb(60, 60, 60);
    font-weight: bold;
    margin-left: 44px;
  }
  .yep-consent-modal-cookie-info-btn {
    font-weight: bold;
    color: rgb(32, 92, 121);
    cursor: pointer;
    margin-left: 5px;
    margin-top: 5px;
    position: relative;
    display: inline-block;
  }

  .yep-cookie-tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: rgb(32, 92, 121);
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
    font-size: 12px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 10;
  }

  .yep-consent-modal-cookie-info-btn:hover .yep-cookie-tooltip-text {
    visibility: visible;
  }

  .yep-consent-modal-cookie-info-btn .yep-cookie-tooltip-text {
    opacity: 0;
    transition: opacity 1.5s;
  }

  .yep-consent-modal-cookie-info-btn:hover .yep-cookie-tooltip-text {
    opacity: 1;
  }

  .yep-switch {
    position: relative;
    width: 60px;
    height: 34px;
  }

  .yep-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .yep-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    max-width: 40px;
    max-height: 20px;
  }
  .yep-slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .yep-slider {
    background-color: #4caf50;
  }
  input:disabled + .yep-slider {
    background-color: #4caf4f86;
    cursor: not-allowed;
  }
  input:indeterminate + .yep-slider {
    background-color: #ffc107;
  }
  input:focus + .yep-slider {
    box-shadow: 0 0 1px #2196f3;
  }
  input:checked + .yep-slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }

  input:indeterminate + .yep-slider:before {
    -webkit-transform: translateX(10px);
    -ms-transform: translateX(10px);
    transform: translateX(10px);
  }

  .yep-slider.yep-round {
    border-radius: 34px;
  }

  .yep-slider.yep-round::before {
    border-radius: 50%;
  }
  .yep-separator {
    margin: 0;
    border-top: 0.5px solid #c1c1c1;
  }
  .yep-consent-modal-header-text {
    margin-bottom: 12px;
  }
</style>
