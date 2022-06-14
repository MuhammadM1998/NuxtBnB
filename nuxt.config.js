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
  css: ["~/assets/styles/main.scss"],
  router: { prefetchLinks: false },
  devServerHandlers: [],
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},
  build: { extractCSS: true, loaders: { limit: 0 } },
  buildModules: ["@nuxtjs/tailwindcss"],

  plugins: [
    `~/plugins/dataAPI`,
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
    rootUrl:
      process.env.NODE_ENV === "production"
        ? process.env.BASE_URL
        : process.env.LOCAL_HOST_URL,

    auth: { cookieName: process.env.AUTH_COOKIE_NAME },

    algolia: {
      appID: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_PUBLIC_API_KEY,
    },

    cloudinary: {
      apiKey: process.env.CLOUDINARY_PUBLIC_API_KEY,
    },

    stripe: {
      key: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  privateRuntimeConfig: {
    algolia: {
      appID: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_SECRET_API_KEY,
    },

    cloudinary: {
      apiSecret: process.env.CLOUDINARY_SECRET_API_KEY,
    },

    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_SOTRAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
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
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },

  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASE_URL,
    },
  },
};
