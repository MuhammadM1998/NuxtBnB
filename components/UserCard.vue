<template>
  <div>
    <client-only>
      <template #placeholder>
        <SVGLoader class="w-12 h-12" />
      </template>

      <button
        aria-label="Google Login"
        v-show="!isLoading && !isUserLoggedIn"
        class="grid p-2 rounded-full place-content-center"
        @click="login"
      >
        <SVGGoogle class="w-8 h-8" />
      </button>
    </client-only>

    <SVGLoader class="w-12 h-12" v-show="isLoading" />

    <div v-show="isUserLoggedIn" class="relative">
      <!-- Drop Down Menu -->
      <button
        ref="dropdownInfoBtn"
        id="dropdownInfoBtn"
        data-dropdown-toggle="dropdownInformation"
        class="flex items-center max-w-[11rem] gap-2 px-2 py-1 text-sm font-medium bg-white shadow text-primary-250 hover:bg-primary-250 hover:text-white app-button"
        type="button"
        @click="isDropdownActive = !isDropdownActive"
      >
        <img
          class="w-8 h-8 border-2 rounded-full border-primary-200"
          aria-label="User Image"
          :src="userImageURL"
        />

        <p>{{ userFirstName }}</p>
      </button>

      <!-- Dropdown Info Menu -->
      <div
        ref="dropdownInfoMenu"
        id="dropdownInfoMenu"
        class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded shadow"
        :class="{ active: isDropdownActive }"
        @click="handleDropdown"
      >
        <!-- User Info -->
        <div class="px-4 py-3 text-sm text-gray-900">
          <div class="truncate">{{ userFullName }}</div>
          <div class="font-medium truncate">{{ userEmail }}</div>
        </div>

        <!-- Links -->
        <ul
          class="py-1 text-sm text-gray-700"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <NuxtLink
              class="block px-4 py-2 hover:bg-gray-100 hover:text-primary-200"
              to="/admin"
              >Admin Dashboard</NuxtLink
            >
          </li>

          <li>
            <NuxtLink
              class="block px-4 py-2 hover:bg-gray-100 hover:text-primary-200"
              to="/admin/homes"
              >Your Homes</NuxtLink
            >
          </li>

          <li>
            <NuxtLink
              class="block px-4 py-2 hover:bg-gray-100 hover:text-primary-200"
              to="/admin/add-home"
              >Add a Home</NuxtLink
            >
          </li>
        </ul>
        <div class="py-1">
          <button
            @click="logout"
            v-show="isUserLoggedIn"
            class="w-full px-4 py-2 group hover:bg-gray-100"
          >
            <div class="flex items-center gap-2">
              <SVGLogout class="w-8 h-8 group-hover:fill-red-700" />
              <p class="group-hover:text-red-700">Logout</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isDropdownActive: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
    userFullName() {
      if (this.$store.getters["user"])
        return this.$store.getters["user"].displayName;
    },

    userFirstName() {
      if (this.$store.getters["user"])
        return this.$store.getters["user"].displayName.split(" ")[0];
    },

    userImageURL() {
      if (this.$store.getters["user"]) {
        return this.$store.getters["user"].photoURL;
      }
    },

    userEmail() {
      if (this.$store.getters["user"]) return this.$store.getters["user"].email;
    },
  },

  methods: {
    async login() {
      this.isLoading = true;
      try {
        var provider = new this.$fireModule.auth.GoogleAuthProvider();
        await this.$fire.auth.signInWithPopup(provider);
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    async logout() {
      await this.$fire.auth.signOut();
    },

    handleDropdown(event) {
      if (
        !dropdownInfoBtn.contains(event.target) &&
        !dropdownInfoMenu.contains(event.target)
      )
        this.isDropdownActive = false;
    },
  },

  mounted() {
    if (process.client) {
      window.addEventListener("click", this.handleDropdown);
    }
  },
};
</script>

<style scoped>
#dropdownInfoMenu.active {
  @apply block absolute top-12 right-0;
}
</style>
