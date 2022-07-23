yepConfig = {
  elementID: "yep-consent",
  groupByPurpose: true,
  cookieName: "consent",
  cookieExpiresAfterDays: 365,
  cookieDomain: "",
  privacyPolicy: "/datenschutz",
  impressum: "/impressum",
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: true,
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
