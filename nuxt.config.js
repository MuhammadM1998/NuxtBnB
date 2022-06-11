module.exports = {
  head: {
    title: "NuxtBnB",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  components: true,
  css: ["~/assets/sass/app.scss"],
  router: { prefetchLinks: false },
  devServerHandlers: [],
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},
  build: { extractCSS: true, loaders: { limit: 0 } },
  buildModules: ["@nuxtjs/tailwindcss"],
  plugins: [
    `~/plugins/dataAPI`,
    `~/plugins/firebaseAuth.client`,
    `~/plugins/mapboxMaps.client`,
    `~/plugins/stripe.client`,
    `~/plugins/vCalendar.client`,
  ],

  modules: [
    "@nuxtjs/firebase",
    "@nuxtjs/cloudinary",
    "@nuxt/image",
    "~/modules/auth",
    "~/modules/algolia",
    "~/modules/cloudinary",
    "~/modules/stripe",
  ],

  publicRuntimeConfig: {
    auth: { cookieName: "idToken" },

    algolia: {
      appID: "ZIN5OIC3G9",
      apiKey: "8d99e75a58d41c21f2751df0200f251a",
    },

    cloudinary: {
      apiKey: "649975279141177",
    },

    stripe: {
      key: "pk_test_51L8kymLBFR6Mak5RxP6Z44entBPx9l9RFKUpmcTz6uz9MAXvOabEdq2MocroyyrCXt3pskUaR2Y7yEfEQHK2yas900zKOjRshB",
    },
  },

  privateRuntimeConfig: {
    algolia: {
      appID: "ZIN5OIC3G9",
      apiKey: "471bd6696e99e89807f616904fa16d7c",
    },

    cloudinary: {
      apiSecret: "RfouEbA0V-bPJrLnubjRir1zzb4",
    },

    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },

  firebase: {
    config: {
      apiKey: "AIzaSyBndHw7o0nzijrn_PdnvDIgLT2AyQPP5xc",
      authDomain: "nuxtbnb-m98.firebaseapp.com",
      projectId: "nuxtbnb-m98",
      storageBucket: "nuxtbnb-m98.appspot.com",
      messagingSenderId: "285262880581",
      appId: "1:285262880581:web:d2a4ce58994867ed22a82c",
    },
    services: {
      auth: {
        persistence: "local",
        initialize: {
          onAuthStateChangedAction: "onAuthStateChanged",
          subscribeManually: false,
        },
        ssr: false,
      },
    },
  },

  cloudinary: {
    cloudName: "cloud-m98",
  },

  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/cloud-m98/image/upload/",
    },
  },
};
