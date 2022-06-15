<template>
  <div class="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg">
    <NuxtLink
      :to="`/home/${home.objectID}`"
      class="home-card"
      :class="{ 'home-card--row': isRow }"
    >
      <div class="home-image">
        <NuxtImg
          :src="home.images[0]"
          width="360px"
          height="175"
          provider="cloudinary"
          class="object-cover object-center"
        />
      </div>

      <div class="home-info">
        <h4 class="home-title">{{ home.title }}</h4>

        <!-- Home Review Count -->
        <div class="flex items-center gap-2">
          <SVGStar class="svg" />
          <p>{{ home.reviewCount }}</p>
        </div>

        <!-- Home Address -->
        <div class="flex items-center gap-2">
          <SVGMarker class="svg" />
          <p>{{ home.location.address }}</p>
        </div>

        <!-- Home Guests -->
        <div class="flex items-center gap-2">
          <SVGGuests class="svg" />
          <p>{{ home.guests }} guests</p>
        </div>

        <!-- Home Price Per Night -->
        <div class="flex items-center gap-2">
          <SVGMoney class="svg" />
          <p>
            ${{ home.pricePerNight }} /
            <span class="font-normal text-primary-400">night</span>
          </p>
        </div>

        <div class="flex items-center justify-between"></div>
      </div>
    </NuxtLink>

    <button
      class="home-delete"
      v-if="isDeleteVisible"
      @click="$emit('deletesHome')"
    >
      Delete House
    </button>
  </div>
</template>

<script>
export default {
  props: {
    home: { type: Object, required: true },
    isDeleteVisible: { type: Boolean, required: false, default: false },
    isRow: { type: Boolean, required: false, default: false },
  },
};
</script>

<style lang="scss">
.home-card {
  @apply flex flex-col;

  &--row {
    @apply flex-row;

    > div {
      @apply basis-full;
    }
  }
}

.home-image img {
  @apply w-full h-full object-cover object-center;
}

.home-info {
  @apply py-2 px-6 flex flex-col gap-2 font-medium;
}

.home-title {
  @apply text-lg font-medium text-primary-600;
}

.home-delete {
  @apply font-medium flex justify-center py-1 border-t-2 border-red-600 text-red-600 transition-colors  hover:bg-red-600 hover:text-white;
}

.svg {
  @apply w-6 h-6;
}
</style>
