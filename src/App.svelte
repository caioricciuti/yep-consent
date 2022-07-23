<script>
  // @ts-nocheck
  import { showConsentModal, showConsentNotice } from "./store.js";
  import ConsentNotice from "./components/Yep-Consent-Notice.svelte";
  import ConsentModal from "./components/Yep-Consent-Modal.svelte";
  import consent from "./lib/consent";

  window.yepConsent = {
    show: () => {
      if ($showConsentModal === true) {
        $showConsentModal = false;
      } else {
        $showConsentModal = true;
      }
    },
  };

  let consentConfig = window.yepConfig;

  let purposesArray = [];
  let servicesArray = [];

  consentConfig.services.forEach((element) => {
    servicesArray.push(element.name);
    purposesArray.push(element.purpose);
  });

  purposesArray = [...new Set(purposesArray)];
  let purposePrettyArray = [];
  purposesArray.forEach((element) => {
    let printName =
      consent.purposes[element] == undefined
        ? element
        : consent.purposes[element].name;
    return purposePrettyArray.push(printName);
  });
  purposePrettyArray = purposePrettyArray.join(", ");
  purposePrettyArray = purposePrettyArray.replace(/,(?=[^,]*$)/, " &");
</script>

<div class="yepconsent">
  <ConsentNotice {servicesArray} purposesTxt={purposePrettyArray} {consent} />
  <ConsentModal {purposesArray} {servicesArray} {consent} />
</div>
