<template>
  <div class="app">
    <header class="app-header">
      <!-- Logo -->
      <div class="app-logo">
        <NuxtLink to="/">
          <img src="~/assets/images/logo.svg" alt="Nuxt BnB" />
        </NuxtLink>
      </div>

      <!-- Search -->
      <div class="app-search">
        <div id="geocoder" @resultFound="resultFound"></div>

        <client-only>
          <template #placeholder>
            <input class="datepicker" />
            <span class="mr-2 -ml-6"> to</span>
            <input class="datepicker" />
            <br />
          </template>

          <DatePicker
            v-model="range"
            is-range
            timezone="UTC"
            :modelConfig="{ timeAdjust: '00:00:00' }"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="datepicker"
              />
              <span class="mr-2 -ml-6"> to</span>
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="datepicker"
              />
              <br />
            </template>
          </DatePicker>
        </client-only>

        <button @click="search">
          <img src="~/assets/images/icons/search.svg" alt="Search" />
        </button>
      </div>

      <!-- Login -->
      <Login class="ml-auto" />
    </header>

    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: { lng: 0, lat: 0, label: "" },
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  methods: {
    search() {
      if (!this.location.label) return;

      this.$router.push({
        name: "search",
        query: {
          ...this.location,
          start: this.range.start.getTime() / 1000,
          end: this.range.end.getTime() / 1000,
        },
      });
    },

    resultFound(event) {
      const place = event.detail;
      const placeName = place.place_name;
      const placeCoords = place.geometry.coordinates;

      this.location.lng = placeCoords[0];
      this.location.lat = placeCoords[1];
      this.location.label = placeName;
    },
  },
};
</script>
