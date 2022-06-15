<template>
  <header class="fixed w-full py-2.5 px-2 sm:px-4 bg-white lg:relative shadow">
    <div class="flex items-center gap-6">
      <!-- Header logo -->
      <div>
        <NuxtLink to="/">
          <img class="-mt-2 h-9" src="~/assets/images/logo.svg" alt="NuxtBnB" />
        </NuxtLink>
      </div>

      <!-- Navbar -->
      <nav class="flex items-center w-full gap-2">
        <div class="w-full">
          <ul class="flex gap-2 lg:items-center">
            <li class="hidden lg:block">
              <TheSearch containerID="nav-search" />
            </li>

            <li class="ml-auto">
              <UserCard />
            </li>
          </ul>
        </div>

        <!-- Search Menu -->
        <div class="grid place-content-center lg:hidden">
          <button @click="drawer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#367cff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Dark Background Transition -->
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          @keydown.esc="isOpen = false"
          v-show="isOpen"
          class="fixed inset-0 z-10 transition-opacity lg:hidden"
        >
          <div
            @click="isOpen = false"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
          ></div>
        </div>
      </transition>

      <!-- Drawer Menu -->
      <aside
        class="fixed top-0 left-0 z-30 flex flex-col w-full h-full gap-4 p-5 overflow-auto transition-all duration-300 ease-in-out transform bg-white xs:w-1/2 lg:hidden"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <!-- Close Button -->
        <div class="flex justify-end close">
          <button @click="isOpen = false">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex flex-col justify-center h-full gap-8 p-4">
          <img src="~/assets/images/logo.svg" alt="NuxtBnB" />

          <TheSearch containerID="drawer-search" @searchBtnClicked="drawer" />
        </div>
      </aside>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
};
</script>
