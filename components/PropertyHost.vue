<template>
  <section class="pt-0 app-section">
    <div class="container rounded-lg app-section bg-primary-100">
      <h1 class="mb-4 text-center app-title">Meet the Host!</h1>

      <div>
        <div class="flex items-center gap-4">
          <div>
            <img class="rounded-full" :src="user.image" :alt="user.name" />
          </div>

          <div>
            <p class="text-lg font-medium text-primary-400">{{ user.name }}</p>
            <p class="font-medium text-primary-300">
              Joined in {{ formatDate(user.joined) }}
            </p>
            <p>{{ user.reviewCount }} reviews</p>
          </div>
        </div>

        <div class="mt-4 text-gray-600">{{ user.description }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import formatDate from "~/utils/formatDate";

export default {
  props: {
    user: { type: Object, required: true },
  },

  methods: {
    formatDate,
  },
};
</script>

<style lang="scss" scoped></style>
