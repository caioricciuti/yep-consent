<script>
  import { siteLanguage } from "../store";
  export let serviceAndPurposeSelection;

  import consent from "../lib/consent";

  function handleAcceptSelected() {
    console.log(serviceAndPurposeSelection);
  }
</script>

<button class="yep-accept-selected-btn" on:click={handleAcceptSelected}
  >{consent[$siteLanguage].acceptSelected}</button
>

<style>
  .yep-accept-selected-btn {
    background-color: #a1a1a1;
    color: #000;
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
