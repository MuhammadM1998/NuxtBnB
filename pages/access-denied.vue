<template>
  <section class="app-section">
    <div class="container flex flex-col justify-center gap-4 text-center">
      <SVGAccessDenied class="max-h-[55vh]" />

      <h1 class="app-title">
        Sorry, you can't access this page. Most likely you're not signed in yet.
      </h1>

      <NuxtLink
        to="/"
        class="flex items-center gap-2 mx-auto text-white app-button w-fit"
        ><SVGHouse class="fill-white" />Go Back Home</NuxtLink
      >
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: `Access Denied!`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `NuxtBnB Access Denied Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
      ],
    };
  },
};
</script>
