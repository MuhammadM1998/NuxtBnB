<template>
  <div class="user-homes-cards">
    <HomeCard
      v-for="home in homes"
      :key="home.objectID"
      :home="home"
    ></HomeCard>
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
