<template>
  <section class="bg-primary-100 app-padded-vertical">
    <div class="container">
      <h1 class="app-title">Your Homes</h1>

      <div class="user-homes-cards">
        <HomeCard
          v-for="home in homesList"
          :key="home.objectID"
          :home="home"
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
      redirect("/no-access");
      return;
    }
  },
};
</script>

<style></style>
