<template>
  <div
    class="min-h-[20vh] sm:min-h-[30vh] md:min-h-[50vh] lg:min-h-[65vh] rounded-2xl flex flex-col justify-end p-4 bg-cover bg-center"
    :class="cityImage"
  >
    <h2 class="font-medium text-white app-title">{{ city }}</h2>
    <p class="font-medium tracking-widest text-white">{{ country }}</p>
  </div>
</template>

<script>
export default {
  props: {
    city: { type: String, required: true, default: "Paris" },
    country: { type: String, required: true, default: "France" },
  },

  computed: {
    cityImage() {
      return `bg-city-${this.city.toLowerCase().replaceAll(" ", "-")}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-city-paris {
  @apply bg-paris;
}

.bg-city-new-york {
  @apply bg-new-york;
}

.bg-city-london {
  @apply bg-london;
}

.bg-city-dubai {
  @apply bg-dubai;
}

.bg-city-golden-gate-bridge {
  @apply bg-san-francisco;
}

.bg-city-cancún {
  @apply bg-cancun;
}
</style>
