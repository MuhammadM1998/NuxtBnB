<template>
  <div class="flex flex-col gap-4 app-search lg:flex-row lg:items-center">
    <client-only>
      <template #placeholder>
        <div class="flex flex-col gap-2 lg:flex-row lg:items-center">
          <!-- Search Box Placeholder -->
          <div id="mapbox-geocoder-placeholder">
            <div class="mapboxgl-ctrl-geocoder mapboxgl-ctrl">
              <svg
                class="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search"
                viewBox="0 0 18 18"
                xml:space="preserve"
                width="18"
                height="18"
              >
                <path
                  d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"
                ></path>
              </svg>

              <input
                type="text"
                class="mapboxgl-ctrl-geocoder--input"
                placeholder="Search"
                aria-label="Search"
              />

              <div class="suggestions-wrapper">
                <ul class="suggestions" style="display: none"></ul>
              </div>
              <div class="mapboxgl-ctrl-geocoder--pin-right">
                <button
                  aria-label="Clear"
                  class="mapboxgl-ctrl-geocoder--button"
                >
                  <svg
                    class="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-close"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                    width="18"
                    height="18"
                  >
                    <path
                      d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"
                    ></path>
                  </svg></button
                ><svg
                  class="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-loading"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                  width="18"
                  height="18"
                >
                  <path
                    fill="#333"
                    d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"
                  ></path>
                  <path
                    opacity=".1"
                    d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Date Picker Template Placeholder -->
          <input class="datepicker app-input" />
          <span class="font-medium text-center">to</span>
          <input class="datepicker app-input" />
        </div>
      </template>

      <MapboxGeocoder :geocoderID="ID" @resultFound="setLocationInfo" />

      <DatePicker
        class="flex flex-col gap-2 lg:flex-row lg:items-center"
        v-model="range"
        is-range
        timezone="UTC"
        :modelConfig="{ timeAdjust: '00:00:00' }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            aria-label="Date Picker"
            :value="inputValue.start"
            v-on="inputEvents.start"
            class="datepicker app-input"
          />
          <span class="font-medium text-center">to</span>
          <input
            aria-label="Date Picker"
            :value="inputValue.end"
            v-on="inputEvents.end"
            class="datepicker app-input"
          />
        </template>
      </DatePicker>
    </client-only>

    <button
      aria-label="Search"
      class="app-button search-button"
      @click="search"
    >
      <SVGSearch />
      <p>Search</p>
    </button>
  </div>
</template>

<script>
export default {
  props: { ID: { type: String, required: false, default: "nav-search" } },

  data() {
    return {
      location: { lng: 0, lat: 0, label: "" },
      range: {
        start: "",
        end: "",
      },
    };
  },

  methods: {
    search() {
      if (!this.location.label) return;
      let startDate;
      let endDate;

      if (this.range && this.range.start instanceof Date) {
        startDate = this.range.start.getTime() / 1000;
      } else {
        startDate = undefined;
      }

      if (this.range && this.range.end instanceof Date) {
        endDate = this.range.end.getTime() / 1000;
      } else {
        endDate = undefined;
      }

      this.$emit("searchBtnClicked");
      this.$router.push({
        name: "search",
        query: {
          ...this.location,
          start: startDate,
          end: endDate,
        },
      });
    },

    setLocationInfo(event) {
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

<style lang="scss">
.datepicker {
  background-image: url("~assets/images/search/calendar.svg");
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
