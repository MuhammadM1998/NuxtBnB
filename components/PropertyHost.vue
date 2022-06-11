<template>
  <div class="app-background-gray">
    <div class="app-wrapper app-padded-vertical">
      <div class="app-host-header">
        <div>
          <img :src="user.image" alt="" />
        </div>

        <div>
          <div class="app-host-name">{{ user.name }}</div>
          <div class="app-host-date">
            Joined in {{ formatDate(user.joined) }}
          </div>

          <div class="app-flex">
            <div class="app-host-reviews">{{ user.reviewCount }} reviews</div>
          </div>
        </div>
      </div>
      <div class="app-host-description">{{ user.description }}</div>
    </div>
  </div>
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
