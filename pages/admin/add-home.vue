<template>
  <section class="bg-primary-100 app-section">
    <div class="container flex flex-col gap-4">
      <h1 class="app-title">Add a New Home</h1>

      <form ref="form" class="form" @submit.prevent="onSubmit">
        <!-- Home Title -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Home Title</p>
          <input
            required
            type="text"
            v-model="home.title"
            class="md:max-w-xs"
            aria-label="Home Title"
          />
        </div>

        <!-- Images -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Images</p>

          <ImageUploader @imageUploaded="imageUpdated($event, 0)" />
          <ImageUploader @imageUploaded="imageUpdated($event, 1)" />
          <ImageUploader @imageUploaded="imageUpdated($event, 2)" />
          <ImageUploader @imageUploaded="imageUpdated($event, 3)" />
          <ImageUploader @imageUploaded="imageUpdated($event, 4)" />
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Description</p>
          <input
            required
            type="text"
            v-model="home.description"
            aria-label="Home Description"
          />
        </div>

        <!-- Features -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Features</p>

          <input
            required
            type="text"
            v-model="home.features[0]"
            class="md:max-w-xs"
            aria-label="Home Feature"
          />
          <input
            required
            type="text"
            v-model="home.features[1]"
            class="md:max-w-xs"
            aria-label="Home Feature"
          />
          <input
            required
            type="text"
            v-model="home.features[2]"
            class="md:max-w-xs"
            aria-label="Home Feature"
          />
          <input
            required
            type="text"
            v-model="home.features[3]"
            class="md:max-w-xs"
            aria-label="Home Feature"
          />
          <input
            required
            type="text"
            v-model="home.features[4]"
            class="md:max-w-xs"
            aria-label="Home Feature"
          />
        </div>

        <!-- Price Per Night -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Price Per Night</p>
          <input
            required
            class="md:max-w-xs"
            type="number"
            min="0"
            v-model="home.pricePerNight"
            aria-label="Price Per Night"
          />
        </div>

        <!-- House Specs -->
        <div class="flex flex-col gap-2">
          <p class="form-title">House Specs</p>

          <div class="flex flex-col gap-2 md:flex-row">
            <input
              required
              type="number"
              min="0"
              v-model="home.guests"
              placeholder="Guests"
              class="md:max-w-xs"
              aria-label="House Specs"
            />

            <input
              required
              type="number"
              min="0"
              v-model="home.bedrooms"
              placeholder="Rooms"
              class="md:max-w-xs"
              aria-label="House Specs"
            />

            <input
              required
              type="number"
              min="0"
              v-model="home.beds"
              placeholder="Beds"
              class="md:max-w-xs"
              aria-label="House Specs"
            />

            <input
              required
              type="number"
              min="0"
              v-model="home.bathrooms"
              placeholder="Bathrooms"
              class="md:max-w-xs"
              aria-label="House Specs"
            />
          </div>
        </div>

        <!-- Location -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Location</p>

          <!-- Address -->
          <div class="flex flex-col gap-2">
            <label for="address"
              >Type your home address and we'll try to fill it's info</label
            >

            <MapboxGeocoder
              geocoderID="home-location"
              @resultFound="setAddressInfo"
            />
          </div>

          <!-- Country -->
          <div class="flex flex-col gap-2">
            <label for="country">Country</label>
            <input
              required
              type="text"
              name="country"
              v-model="home.location.country"
              class="md:max-w-xs"
              aria-label="Country"
            />
          </div>

          <!-- City -->
          <div class="flex flex-col gap-2">
            <label for="city">City</label>
            <input
              required
              type="text"
              name="city"
              v-model="home.location.city"
              class="md:max-w-xs"
              aria-label="City"
            />
          </div>

          <!-- State -->
          <div class="flex flex-col gap-2">
            <label for="state">State</label>
            <input
              required
              type="text"
              name="state"
              v-model="home.location.state"
              class="md:max-w-xs"
              aria-label="State"
            />
          </div>
        </div>

        <!-- Availability Range -->
        <div>
          <p class="form-title">Availability Range</p>
        </div>

        <!-- Check in Date -->
        <DatePicker
          v-model="home.availabilityRanges[0]"
          is-range
          timezone="UTC"
          :modelConfig="{ timeAdjust: '00:00:00' }"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div>
              <p>Check in</p>

              <div class="flex items-center gap-2 mt-2">
                <input
                  required
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                  class="max-w-[45%] md:max-w-xs"
                  aria-label="Check in Start Date"
                />

                <p>to</p>

                <input
                  required
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="max-w-[45%] md:max-w-xs"
                  aria-label="Check in End Date"
                />
              </div>
            </div>
          </template>
        </DatePicker>

        <!-- Check out Date -->
        <DatePicker
          v-model="home.availabilityRanges[1]"
          is-range
          timezone="UTC"
          :modelConfig="{ timeAdjust: '00:00:00' }"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div>
              <p>Check Out</p>

              <div class="flex items-center gap-2 mt-2">
                <input
                  required
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                  class="max-w-[45%] md:max-w-xs"
                  aria-label="Check in Start Date"
                />

                <p>to</p>

                <input
                  required
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="max-w-[45%] md:max-w-xs"
                  aria-label="Check in End Date"
                />
              </div>
            </div>
          </template>
        </DatePicker>

        <!-- Add Home to Database -->
        <div class="home-add">
          <button type="submit" aria-label="Sumbit Home">Add Home</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { unWrap } from "~/utils/fetchUtils";
import Cookie from "js-cookie";

export default {
  head() {
    return {
      title: `Add Home`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `NuxtBnB User Add Home Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
      ],
    };
  },

  data() {
    return {
      home: {
        title: "",
        description: "",
        pricePerNight: "",
        guests: "",
        bedrooms: "",
        beds: "",
        bathrooms: "",
        features: ["", "", "", "", ""],
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
        },
        _geoloc: {
          lat: "",
          lng: "",
        },
        images: [],
        availabilityRanges: [
          { start: "", end: "" },
          { start: "", end: "" },
        ],
      },
    };
  },

  methods: {
    async onSubmit() {
      await unWrap(
        await fetch("/api/homes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.home),
        })
      );
      this.$refs.form.reset();
    },

    setAddressInfo(e) {
      const home = e.detail;
      const homeGeometry = { country: "", city: "" };

      home.context.forEach((item) => {
        if (item.id.indexOf("country") !== -1) {
          homeGeometry.country = item.text;
          return;
        }
        if (item.id.indexOf("place") !== -1) {
          homeGeometry.city = item.text;
          return;
        }
      });

      this.home.location.address = home.place_name;
      this.home.location.country = homeGeometry.country;
      this.home.location.city = homeGeometry.city;
      this.home.location.state = home.text;
      this.home._geoloc.lng = home.geometry.coordinates[0];
      this.home._geoloc.lat = home.geometry.coordinates[1];
    },

    imageUpdated(imageUrl, index) {
      this.home.images[index] = imageUrl;
    },
  },

  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect("/access-denied");
      return;
    }
  },
};
</script>

<style lang="scss">
#mapbox-geocoder-home-location {
  @apply border-none p-0 outline-none;

  .mapboxgl-ctrl-geocoder:focus-within {
    outline: auto;
  }
}
</style>

<style scoped lang="scss">
.form {
  @apply mt-4 flex flex-col gap-4;

  input,
  textarea {
    @apply rounded-md py-2 shadow-sm px-4;
  }

  &-title {
    @apply text-lg font-medium mb-2;
  }

  .home-add {
    @apply flex justify-center mt-2;

    button {
      @apply bg-primary-250   text-white py-2 px-6 rounded hover:scale-105 transition-all;
    }
  }
}
</style>
