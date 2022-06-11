<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <NuxtLink :to="`/home/${home.objectID}`">
        <HomeCard :home="home"></HomeCard>
      </NuxtLink>
    </div>
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
