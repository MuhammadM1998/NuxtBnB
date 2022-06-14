<template>
  <section class="pt-0 app-section">
    <div class="container rounded-lg app-section bg-primary-100">
      <div class="flex flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between">
        <!-- Description -->
        <div class="property-description">
          <h1 class="app-title">Description</h1>
          <p class="text-gray-600">{{ home.description }}</p>
        </div>

        <!-- Features  -->
        <div class="property-features">
          <h1 class="app-title">Features</h1>

          <div class="flex flex-wrap gap-2">
            <p
              v-for="(feature, index) in home.features"
              :key="index"
              class="feature-tag"
            >
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    home: { type: Object, required: true },
  },
};
</script>

<style scoped lang="scss">
.property-description,
.property-features {
  @apply flex flex-col gap-4 font-normal px-2 lg:px-4 lg:basis-full;
}

.property-description {
  @apply border-dashed border-gray-500 lg:border-r;
}

.property-features {
  .feature-tag {
    @apply bg-[#E3ECFF] text-primary-600 py-3 px-4 rounded;
  }
}
</style>
