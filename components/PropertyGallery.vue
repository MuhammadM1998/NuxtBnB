<template>
  <section class="app-section">
    <div class="container">
      <div class="property-gallery">
        <img
          v-for="publicId in images"
          :key="publicId"
          :src="getImageUrl(publicId)"
          alt="Home Image"
          class="home-image"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    images: { type: Array, required: true },
  },

  methods: {
    getImageUrl(publicId) {
      return this.$img(publicId, { width: 600 }, { provider: "cloudinary" });
    },
  },
};
</script>

<style lang="scss" scoped>
.property-gallery {
  @apply grid gap-1 sm:gap-3 grid-cols-2 grid-rows-gallery-mobile  sm:grid-cols-4 sm:grid-rows-gallery-desktop;

  .home-image {
    @apply col-span-1 row-span-1 object-cover object-center h-full w-full shadow;

    &:nth-child(1) {
      @apply col-span-full row-span-1 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none sm:rounded-bl-lg sm:row-span-full sm:col-span-2;
    }

    &:nth-child(3) {
      @apply sm:rounded-tr-lg;
    }

    &:nth-child(4) {
      @apply rounded-bl-lg sm:rounded-none;
    }

    &:nth-child(5) {
      @apply rounded-br-lg;
    }
  }
}
</style>
