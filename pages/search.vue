<template>
  <section>
    <div class="flex flex-col lg:flex-row">
      <div class="container app-section lg:basis-full bg-primary-100">
        <h2 class="app-title">Stays in {{ label }}</h2>

        <p class="mt-4 text-gray-600" v-if="homes.length === 0">
          There's no available homes in this area. Try a different location
        </p>

        <HomeCard
          v-for="home in homes"
          :key="home.objectID"
          :home="home"
          :isRow="true"
        ></HomeCard>
      </div>

      <div
        id="mapbox-search-map"
        class="h-[50vh] lg:basis-full lg:h-screen"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: `Homes around ${this.label}`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `Search results for homes around ${this.label}. Find the best place for you to rent now on NuxtBnB.`,
        },
      ],
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
      this.$mapboxMaps.createMap(
        "mapbox-search-map",
        this.coords,
        this.getHomeMarkers()
      );
    },

    getHomeMarkers() {
      const markers = this.homes.map((home) => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        };
      });

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
