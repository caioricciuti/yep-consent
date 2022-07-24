// @ts-nocheck
import { writable } from "svelte/store";
import checkIfConsentExists from "./lib/checkIfConsentExists";

let showNotice = checkIfConsentExists();

let rejectShow = window.yepConfig.showRejectAll;

export let showConsentNotice = writable(!showNotice);
export let showConsentModal = writable(false);
export let showCookieInfo = writable(false);
export let showRejectAllBtn = writable(rejectShow);
