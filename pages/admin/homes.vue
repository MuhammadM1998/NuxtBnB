<template>
  <section class="bg-primary-100 app-section">
    <div class="container flex flex-col gap-4">
      <h1 class="app-title">Your Homes</h1>

      <div class="user-homes">
        <HomeCard
          v-for="home in homesList"
          :key="home.objectID"
          :home="home"
          :isDeleteVisible="true"
          @deletesHome="deleteHome(home.objectID)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { unWrap } from "~/utils/fetchUtils";
import Cookie from "js-cookie";

export default {
  head() {
    return {
      title: `Your Homes`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `NuxtBnB User Homes Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
      ],
    };
  },

  data() {
    return {
      homesList: [],
    };
  },

  mounted() {
    this.setHomesList();
  },

  methods: {
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: "DELETE",
      });

      const index = this.homesList.findIndex((obj) => obj.objectID == homeId);
      this.homesList.splice(index, 1);
    },

    async setHomesList() {
      this.homesList = (await unWrap(await fetch("/api/homes/user/"))).data;
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

<style scoped>
.user-homes {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}
</style>
