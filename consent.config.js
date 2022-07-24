yepConfig = {
  elementID: "yep-consent",
  groupByPurpose: true,
  cookieName: "jose",
  cookieExpiresAfterDays: 365,
  cookieDomain: "",
  privacyPolicy: "/datenschutz",
  impressum: "/impressum",
  mustConsent: false,
  showRejectAll: true,
  hideLearnMore: false,
  services: [
    {
      name: "googleAds",
      purpose: "advertising",
      required: true,
    },
    {
      name: "googleAnalytics",
      purpose: "analytics",
    },
    {
      name: "consentManager",
      purpose: "functional",
    },
    {
      name: "sentry",
      purpose: "functional",
    },
  ],
};
