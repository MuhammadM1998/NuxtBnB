<template>
  <div>
    <div v-show="!isUserLoggedIn" id="firebase-auth-google"></div>

    <button
      @click="logout"
      v-show="isUserLoggedIn"
      class="flex px-4 py-2 text-white bg-red-600"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isUserLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
  },

  methods: {
    async logout() {
      await this.$firebaseAuth.signOut();
      this.$firebaseAuth.renderGoogleLogin("firebase-auth-google");
    },
  },

  mounted() {
    this.$firebaseAuth.renderGoogleLogin("firebase-auth-google");
  },
};
</script>
