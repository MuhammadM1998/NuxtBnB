<template>
  <NuxtLink :to="`/home/${home.objectID}`">
    <div class="home-card" :class="{ 'home-card--row': isRow }">
      <div class="home-image">
        <NuxtImg
          :src="home.images[0]"
          width="360px"
          height="175"
          provider="cloudinary"
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

        <div class="home-delete" v-if="isDeleteVisible">
          <button @click="$emit('deletesHome')">Delete House</button>
        </div>
      </div>
    </div>
  </NuxtLink>
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
.user-homes-cards {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.home-card {
  @apply rounded-lg  my-2 shadow-lg overflow-hidden bg-white flex flex-col;

  &--row {
    @apply flex-row;
  }
}

.home-image img {
  @apply w-full h-full object-cover object-center;
}

.home-info {
  @apply py-4 px-6 flex flex-col gap-2 font-medium;
}

.home-title {
  @apply text-lg font-medium text-primary-600;
}

.home-delete {
  @apply flex justify-center mt-2;

  button {
    @apply text-red-600 transition-colors  hover:text-red-700;
  }
}

.svg {
  @apply w-6 h-6;
}
</style>
