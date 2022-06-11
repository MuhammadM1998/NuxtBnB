<template>
  <div class="app-house">
    <NuxtImg
      class="app-house-header"
      provider="cloudinary"
      width="360"
      height="200"
      :src="home.images[0]"
    />

    <div class="app-house-body">
      <img src="~/assets/images/icons/heart.svg" class="app-fav" />

      <h2>{{ home.title }}</h2>

      <div class="app-address">
        {{ home.location.address }} {{ home.location.city }}
      </div>

      <div class="app-amentities">
        <p>
          {{ pluralize(home.guests, "guest") }} ,
          {{ pluralize(home.bedrooms, "room") }} ,
          {{ pluralize(home.beds, "bed") }},
          {{ pluralize(home.bathrooms, "bath") }}
        </p>

        <p>{{ features }}</p>
      </div>

      <div class="app-flex">
        <div class="app-rating">
          {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
        </div>
        <div class="app-price">
          ${{ home.pricePerNight }} <span>/ night</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from "~/utils/pluralize";

export default {
  props: { home: { type: Object, required: true } },
  computed: {
    features() {
      return this.home.features.slice(0, 3).join(", ");
    },
  },
  methods: {
    pluralize,
  },
};
</script>
