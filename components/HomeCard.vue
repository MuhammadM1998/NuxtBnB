<template>
  <NuxtLink :to="`/home/${home.objectID}`">
    <div class="home-card">
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

        <!-- Home Address -->
        <div class="flex items-center gap-2">
          <SVGMarker class="svg" />
          <p>{{ home.location.address }}</p>
        </div>

        <!-- Home Price Per Night -->
        <div class="flex items-center gap-2">
          <SVGMoney class="svg" />
          <p>
            ${{ home.pricePerNight }} /
            <span class="font-normal text-primary-400">night</span>
          </p>
        </div>

        <div class="flex items-center justify-between">
          <!-- Home Review Count -->
          <div class="flex items-center gap-2">
            <SVGStar class="svg" />
            <p>{{ home.reviewCount }}</p>
          </div>

          <!-- Home Guests -->
          <div class="flex items-center gap-2">
            <SVGGuests class="svg" />
            <p>{{ home.guests }} guests</p>
          </div>
        </div>

        <div class="home-delete">
          <button @click="$emit('deletesHome')">Delete House</button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: { home: { type: Object, required: true } },
};
</script>

<style lang="scss">
.user-homes-cards {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.home-card {
  @apply rounded-lg  my-2 shadow-lg overflow-hidden bg-white;
}

.home-image img {
  @apply w-full;
}

.home-info {
  @apply py-4 px-6 flex flex-col gap-1 font-medium;
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
