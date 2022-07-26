//@ts-nocheck

const consentConfig = {
  en: {
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    acceptSelected: "Accept Selected",
    moreInfo: "Options",
    privacyPolicy: {
      label: "Privacy policy",
      url: window.yepConfig.privacyPolicy,
    },
    impressum: {
      label: "Legal Declaration",
      url: window.yepConfig.impressum,
    },
    consentModalTitle: "Services we would like to use",
    consentModalText:
      "Here you can check and customize the services that we would like to provide on this website. You are in charge! Enable or disable services as you see fit. To learn more, please read our {{legal}}.",
    consentNotice:
      "Hi there! Could we please enable some additional services for {{purposes}}? You can always change or withdraw your consent later. To learn more about these services, please visit our {{legal}}",
    purposes: {
      advertising: {
        name: "Advertising",
        description:
          "We use this to show you ads that may be of interest to you.",
      },
      functional: {
        name: "Funcional",
        description: "We use this make the site functional.",
      },
      analytics: {
        name: "Analytics",
        description:
          "We use this to analyze the use of our services and to improve them.",
      },
      security: {
        name: "Security",
        description:
          "We use this to secure your navigation through our website.",
      },
    },
    services: {
      googleAds: {
        name: "Google Ads",
        description:
          "Google Ads is a search advertising service that provides advertising to search engines.",
        cookies: [
          {
            name: "__utma",
            description:
              "Google Ads cookie for fuck you up ds cookie for fuck you up ds cookie for fuck you up",
            party: "1st",
            domain: document.location.hostname,
            expiration: "1 year",
          },
          {
            name: "__utma",
            description: "nice cookie",
            party: "3rd",
            domain: "google.com",
            expiration: "1 year",
          },
        ],
      },
      googleAnalytics: {
        name: "Google Analytics",
        description: "Google Analytics is a web analytics service.",
      },
      consentManager: {
        name: "Consent Manager",
        description: "Consent Manager is a service that manages your consent.",
      },
      sentry: {
        name: "Sentry",
        description: "Sentry is a service that provides error reporting.",
      },
    },
  },
  pt: {
    acceptAll: "Aceitar Todos",
    rejectAll: "Rejeitar Todos",
    acceptSelected: "Aceitar Selecionados",
    moreInfo: "Opções",
    privacyPolicy: {
      label: "Política de Privacidade",
      url: window.yepConfig.privacyPolicy,
    },
    impressum: {
      label: "Declaração Legal",
      url: window.yepConfig.impressum,
    },
    consentModalTitle: "Serviços que gostariamos de usar",
    consentModalText:
      "Here you can check and customize the services that we would like to provide on this website. You are in charge! Enable or disable services as you see fit. To learn more, please read our {{legal}}.",
    consentNotice:
      "Olá! Você poderia por favor aceitar que usemos cookies para {{purposes}}? You can always change or withdraw your consent later. To learn more about these services, please visit our {{legal}}",
    purposes: {
      advertising: {
        name: "Anúncios",
        description:
          "We use this to show you ads that may be of interest to you.",
      },
      functional: {
        name: "Funcionáis",
        description: "We use this make the site functional.",
      },
      analytics: {
        name: "Analítica",
        description:
          "We use this to analyze the use of our services and to improve them.",
      },
      security: {
        name: "Segurança",
        description:
          "We use this to secure your navigation through our website.",
      },
    },
    services: {
      googleAds: {
        name: "Google Ads",
        description:
          "Google Ads is a search advertising service that provides advertising to search engines.",
        cookies: [
          {
            name: "__utma",
            description:
              "Google Ads cookie for fuck you up ds cookie for fuck you up ds cookie for fuck you up",
            party: "1st",
            domain: document.location.hostname,
            expiration: "1 year",
          },
          {
            name: "__utma",
            description: "nice cookie",
            party: "3rd",
            domain: "google.com",
            expiration: "1 year",
          },
        ],
      },
      googleAnalytics: {
        name: "Google Analytics",
        description: "Google Analytics is a web analytics service.",
      },
      consentManager: {
        name: "Consent Manager",
        description: "Consent Manager is a service that manages your consent.",
      },
      sentry: {
        name: "Sentry",
        description: "Sentry is a service that provides error reporting.",
      },
    },
  },
  de: {
    acceptAll: "Zustimmen",
    rejectAll: "Ablehnen",
    acceptSelected: "Aceitar Selecionados",
    moreInfo: "Anpassen",
    privacyPolicy: {
      label: " Datenschutzerklärung",
      url: window.yepConfig.privacyPolicy,
    },
    impressum: {
      label: "Impressum",
      url: window.yepConfig.impressum,
    },
    consentModalTitle: "Dienste, die wir nutzen",
    consentModalText:
      "Wir verwenden Cookies, um Ihnen ein optimales Website-Erlebnis zu bieten. Dazu zählen Cookies, die für den Betrieb und die Steuerung der Website notwendig sind, sowie solche, die lediglich zu anonymen Statistikzwecken oder zur Anzeige personalisierter Inhalte genutzt werden. Entscheiden Sie selbst, welche Kategorien Sie zulassen möchten. Es kann passieren, dass Funktionen der Seite eingeschränkt werden. Um mehr zu erfahren, lesen Sie bitte unsere {{legal}}.",
    consentNotice:
      "Wir verwenden Cookies und Tracking-Pixel, um die Nutzerfreundlichkeit zu steigern. Das betrifft folgende Bereiche: {{purposes}}? Zu demselben Zweck arbeiten wir außerdem mit ausgewählten Partnern zusammen. Sie können Ihre freiwillige Zustimmung später jederzeit in unserer {{legal}} anpassen oder zurückziehen.",
    purposes: {
      advertising: {
        name: "Anúncios",
        description:
          "We use this to show you ads that may be of interest to you.",
      },
      functional: {
        name: "Funcionáis",
        description: "We use this make the site functional.",
      },
      analytics: {
        name: "Analítica",
        description:
          "We use this to analyze the use of our services and to improve them.",
      },
      security: {
        name: "Segurança",
        description:
          "We use this to secure your navigation through our website.",
      },
    },
    services: {
      googleAds: {
        name: "Google Ads",
        description:
          "Google Ads is a search advertising service that provides advertising to search engines.",
        cookies: [
          {
            name: "__utma",
            description:
              "Google Ads cookie for fuck you up ds cookie for fuck you up ds cookie for fuck you up",
            party: "1st",
            domain: document.location.hostname,
            expiration: "1 year",
          },
          {
            name: "__utma",
            description: "nice cookie",
            party: "3rd",
            domain: "google.com",
            expiration: "1 year",
          },
        ],
      },
      googleAnalytics: {
        name: "Google Analytics",
        description: "Google Analytics is a web analytics service.",
      },
      consentManager: {
        name: "Consent Manager",
        description: "Consent Manager is a service that manages your consent.",
      },
      sentry: {
        name: "Sentry",
        description: "Sentry is a service that provides error reporting.",
      },
    },
  },
};

export default consentConfig;
