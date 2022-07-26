yepConfig = {
  groupByPurpose: true,
  cookieName: "consent",
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
      required: true,
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
