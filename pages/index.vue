<template>
  <div class="user-homes-cards">
    <HomeCard
      v-for="home in homes"
      :key="home.objectID"
      :home="home"
    ></HomeCard>
  </div>
</template>

<script>
export default {
  async asyncData({ $dataAPI }) {
    return {
      homes: (await $dataAPI.getHomes()).data.hits,
    };
  },
};
</script>
