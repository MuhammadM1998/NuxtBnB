<template>
  <section class="app-section">
    <div class="container">
      <h1 class="mb-4 app-title">Clients Reviews</h1>

      <p class="mt-4 text-gray-600" v-if="reviews.length === 0">
        This house has no reviews yet.
      </p>

      <div class="property-reviews">
        <div v-for="(review, index) in reviews" :key="index">
          <div class="flex items-center gap-4">
            <div>
              <img
                class="rounded-full"
                :src="review.reviewer.image"
                :alt="review.reviewer.name"
              />
            </div>

            <div>
              <p class="text-lg font-medium text-primary-400">
                {{ review.reviewer.name }}
              </p>
              <p class="font-medium text-primary-250">
                {{ formatDate(review.date) }}
              </p>
            </div>
          </div>

          <div class="mt-4 text-gray-600">
            <SVGQuote class="inline-block relative -top-0.5 fill-primary-200" />
            <ShortText :text="review.comment" :target="150" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import formatDate from "~/utils/formatDate";

export default {
  props: {
    reviews: { type: Array, required: true },
  },

  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="scss">
.property-reviews {
  @apply grid gap-6 grid-cols-1 lg:grid-cols-2;
}
</style>
