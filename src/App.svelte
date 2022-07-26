<script>
  // @ts-nocheck
  import { showConsentModal } from "./store.js";
  import ConsentNotice from "./components/Yep-Consent-Notice.svelte";
  import ConsentModal from "./components/Yep-Consent-Modal.svelte";

  window.yepConsent = {
    show: () => {
      if ($showConsentModal === true) {
        $showConsentModal = false;
      } else {
        $showConsentModal = true;
      }
    },
  };
</script>

<div class="yepconsent">
  <ConsentNotice />
  <ConsentModal />
</div>
