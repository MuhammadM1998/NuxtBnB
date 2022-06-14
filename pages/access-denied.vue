<template>
  <div>No Access !</div>
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
