<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title">Stays in {{ label }}</h2>

        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <HomeRow
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
          />
        </nuxt-link>
      </div>

      <div class="app-search-results-map">
        <div id="mapboxMap" class="app-map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },

  async beforeRouteUpdate(to, from, next) {
    const response = await this.$dataAPI.getHomesByLocation(
      to.query.lng,
      to.query.lat,
      to.query.start,
      to.query.end
    );

    this.homes = response.data.hits;
    this.label = to.query.label;
    this.lng = to.query.lng;
    this.lat = to.query.lat;
    next();
  },

  async asyncData({ query, $dataAPI }) {
    const response = await $dataAPI.getHomesByLocation(
      query.lng,
      query.lat,
      query.start,
      query.end
    );

    return {
      homes: response.data.hits,
      label: query.label,
      lng: query.lng,
      lat: query.lat,
    };
  },

  computed: {
    coords() {
      const lng = this.lng;
      const lat = this.lat;
      const coords = [lng, lat];
      return coords;
    },
  },

  mounted() {
    this.createMap();
  },

  updated() {
    this.createMap();
  },

  methods: {
    createMap() {
      this.$mapboxMaps.createMap(this.coords, this.getHomeMarkers());
    },

    getHomeMarkers() {
      const markers = this.homes.map((home) => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        };
      });
      console.log(
        "Homes & Markers from getHomeMarkers method",
        this.homes,
        markers
      );
      return markers;
    },

    highlightMarker(homeID, isHighlighted) {
      if (this.homes.length === 0) return null;
      const marker = document.querySelector(`.home-${homeID}`);

      if (marker) marker.classList.toggle("marker-highlight", isHighlighted);
    },
  },
};
</script>

<style>
.marker {
  background-color: #fff;
  font-weight: bold;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 5px 8px;
  cursor: pointer;
  color: black;
  font-size: 1rem;
  line-height: 1;
}

.marker-highlight {
  color: white;
  background-color: black;
}
</style>
