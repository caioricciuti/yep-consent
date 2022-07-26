// @ts-nocheck
import { writable } from "svelte/store";
import consent from "./lib/consent";

//get site lang
let lang = document.documentElement.lang;
if (!lang) {
  lang = "en";
}
if (consent[lang]) {
  lang = document.documentElement.lang;
} else {
  lang = "en";
}

//check if consent is already set (looks for a cookie with the name set on the config file)
import checkIfConsentExists from "./lib/checkIfConsentExists";
//if cookie exists it does not show the consent again
let showNotice = checkIfConsentExists();

//reads if the client wants to show reject all button or not.
let rejectShow = window.yepConfig.showRejectAll;

//get all services listed from the config file.
let services = window.yepConfig.services;

//get the purposes of the services from the config file.
let purposes = [];
services.forEach((service) => {
  purposes.push(service.purpose);
});

export let siteLanguage = writable(lang);
export let showConsentNotice = writable(!showNotice);
export let showConsentModal = writable(false);
export let showCookieInfo = writable(false);
export let showRejectAllBtn = writable(rejectShow);
export let servicesList = writable(services);
export let purposesList = writable(purposes);
