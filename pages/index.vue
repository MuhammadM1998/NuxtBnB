<template>
  <div>
    <!-- Intro -->
    <section class="app-section">
      <div class="container">
        <div
          class="bg-beach min-h-[75vh] rounded-3xl flex items-end py-8 px-4 bg-cover bg-center"
        >
          <h2 class="mx-auto text-white app-title">
            Settle in somewhere new. Discover stays to live, work, or just
            relax.
          </h2>
        </div>
      </div>
    </section>

    <!-- Premium Listings -->
    <section class="app-section">
      <div class="container flex flex-col gap-4">
        <h2 class="app-title">Premium Listings</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <NuxtLink to="/search?lng=2.35183&lat=48.85658&label=Paris, France">
            <CityCard city="Paris" country="France" />
          </NuxtLink>

          <NuxtLink
            to="/search?lng=-74.0059728&lat=40.7306&label=New%20York%20City,%20United%20States"
          >
            <CityCard city="New York" country="USA" />
          </NuxtLink>

          <NuxtLink
            to="/search?lng=-0.091998&lat=51.515618&label=London, England, United Kingdom"
          >
            <CityCard city="London" country="UK" />
          </NuxtLink>

          <NuxtLink
            to="/search?lng=55.2962&lat=25.2684&label=Dubai,%20United%20Arab%20Emirates"
          >
            <CityCard city="Dubai" country="UAE" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Recently Added Homes -->
    <section class="app-section bg-primary-100">
      <div class="container flex flex-col gap-6">
        <h2 class="app-title">Recently Added</h2>
        <div class="recent-homes">
          <HomeCard v-for="home in homes" :key="home.objectID" :home="home" />
        </div>
      </div>
    </section>

    <!-- Featured Cities -->
    <section class="app-section">
      <div class="container flex flex-col gap-6">
        <h2 class="app-title">Featured This Week</h2>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0">
          <NuxtLink
            to="/search?lng=-122.4475775&lat=37.759986&label=San%20Francisco,%20CA,%20USA"
          >
            <CityCard
              city="Golden Gate Bridge"
              country="San Francisco"
              class="md:rounded-r-none"
            />
          </NuxtLink>

          <NuxtLink
            to="/search?lng=-86.8475&lat=21.16056&label=Cancún, Quintana Roo, Mexico"
          >
            <CityCard city="Cancún" country="México" class="md:rounded-l-none"
          /></NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Homepage`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `NuxtBnB Home Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
      ],
    };
  },

  async asyncData({ $dataAPI }) {
    return {
      homes: (await $dataAPI.getHomes()).data.hits,
    };
  },
};
</script>

<style lang="scss" scoped>
.recent-homes {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}
</style>
