<template>
  <section class="app-section">
    <div class="container flex flex-col gap-8">
      <h1 class="app-title">Welcome back, {{ userFirstName }}</h1>

      <div
        class="flex flex-col items-center justify-center gap-4 md:flex-row lg:items-stretch"
      >
        <!-- Go to Homes -->
        <NuxtLink to="/admin/homes">
          <div
            class="h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              class="object-cover object-center w-full rounded-t-lg max-h-72"
              src="~/assets/images/photos/homes.jpg"
              alt="Your Homes"
            />
            <div class="p-5">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-primary-200"
              >
                Your Homes
              </h5>

              <p class="mb-3 text-gray-600">
                A list of your added homes enriched with details. Review all
                your homes at a glance!
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Go to Add Home -->
        <NuxtLink to="/admin/add-home">
          <div
            class="h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              class="object-cover object-center w-full rounded-t-lg max-h-72"
              src="~/assets/images/photos/add-home.jpg"
              alt="Your Homes"
            />
            <div class="p-5">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-primary-200"
              >
                Add a New Home
              </h5>

              <p class="mb-3 text-gray-600">
                Include your property to our database and make it available for
                renting by our clients. Start earning money with us.
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import Cookie from "js-cookie";

export default {
  head() {
    return {
      title: `Dashboard`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `NuxtBnB User Admin Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
      ],
    };
  },

  computed: {
    userFirstName() {
      if (this.$store.getters["user"])
        return this.$store.getters["user"].displayName.split(" ")[0];
    },
  },

  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect("/access-denied");
      return;
    }
  },
};
</script>
