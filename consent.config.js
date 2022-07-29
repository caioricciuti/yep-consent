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
    },
    {
      name: "bingAds",
      purpose: "advertising",
    },
    {
      name: "googleAnalytics",
      purpose: "analytics",
    },

    {
      name: "consentManager",
      purpose: "functional",
      required: true,
    },
    {
      name: "sentry",
      purpose: "functional",
      required: true,
    },
    {
      name: "tagManager",
      purpose: "functional",
    },
  ],
};
