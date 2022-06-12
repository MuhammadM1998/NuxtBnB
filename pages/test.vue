<template>
  <MapboxGeocoder @resultFound="searchResultFound" />
</template>

<script>
export default {
  methods: {
    searchResultFound(e) {
      console.log(e.detail);
    },
  },
};
</script>

<style scoped></style>
