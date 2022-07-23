import { writable } from "svelte/store";
import checkIfConsentExists from "./lib/checkIfConsentExists";

let showNotice = checkIfConsentExists();

export let showConsentNotice = writable(!showNotice);
export let showConsentModal = writable(false);
export let showCookieInfo = writable(false);
