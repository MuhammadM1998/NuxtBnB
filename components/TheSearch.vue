<template>
  <div class="flex flex-col gap-4 app-search lg:flex-row lg:items-center">
    <div :id="geocoderID" @resultFound="resultFound"></div>

    <client-only>
      <template #placeholder>
        <input class="datepicker app-input" />
        <span class="font-medium text-center">to</span>
        <input class="datepicker app-input" />
        <br />
      </template>

      <DatePicker
        class="flex flex-col gap-2 lg:flex-row lg:items-center"
        v-model="range"
        is-range
        timezone="UTC"
        :modelConfig="{ timeAdjust: '00:00:00' }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            :value="inputValue.start"
            v-on="inputEvents.start"
            class="datepicker app-input"
          />
          <span class="font-medium text-center">to</span>
          <input
            :value="inputValue.end"
            v-on="inputEvents.end"
            class="datepicker app-input"
          />
        </template>
      </DatePicker>
    </client-only>

    <button class="app-button search-button" @click="search">
      <img src="~/assets/images/icons/search.svg" alt="Search" />
      <p>Search</p>
    </button>
  </div>
</template>

<script>
export default {
  props: { containerID: { type: String, required: true } },

  computed: {
    geocoderID() {
      return `mapbox-geocoder-${this.containerID}`;
    },
  },

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

      this.$emit("searchBtnClicked");
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

  mounted() {
    this.$mapboxMaps.createGeocoder(this.geocoderID);
  },
};
</script>

<style lang="scss">
div[id^="mapbox-geocoder"] {
  @apply border-2 border-link-water rounded-lg text-lg p-2 pr-0;

  &:focus-within {
    outline: auto;
  }

  .mapboxgl-ctrl-geocoder {
    @apply shadow-none min-w-0 sm:w-full;

    &--input {
      @apply p-0 pl-10 font-cereal font-medium;

      &:focus {
        border: none;
        box-shadow: none;
      }
    }
  }
}

.datepicker {
  background-image: url("~assets/images/icons/calendar.svg");
  background-position: center right 0.625rem;
  @apply bg-no-repeat pr-0 lg:w-40;
}

.search-button {
  @apply flex justify-center gap-4 text-white;

  p {
    @apply lg:hidden;
  }
}
</style>
