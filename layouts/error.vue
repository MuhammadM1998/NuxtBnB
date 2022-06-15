<template>
  <section class="app-section">
    <div class="container flex flex-col justify-center gap-4 text-center">
      <SVGError class="max-h-[55vh]" />

      <h1 class="app-title">Oops! Something wrong happened</h1>

      <div
        class="flex flex-col gap-2 p-2 mx-auto text-blue-800 bg-blue-200 rounded-lg w-fit"
        role="alert"
      >
        <p>
          <span class="font-medium"> {{ error.statusCode }}</span>
          {{ error.message }}
        </p>
      </div>

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
      title: "404",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `NuxtBnB Error Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
      ],
    };
  },

  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
