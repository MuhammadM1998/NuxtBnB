<template>
  <section class="bg-primary-100 app-section">
    <div class="container">
      <h1 class="app-title">Add a New Home</h1>

      <form class="form" @submit.prevent="onSubmit">
        <!-- Home Title -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Home Title</p>
          <input
            required
            type="text"
            v-model="home.title"
            class="md:max-w-xs"
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
          <input required type="text" v-model="home.description" />
        </div>

        <!-- Note -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Notes</p>
          <input required type="text" v-model="home.note" />
        </div>

        <!-- Features -->
        <div class="flex flex-col gap-2">
          <p class="form-title">Features</p>

          <input
            required
            type="text"
            v-model="home.features[0]"
            class="md:max-w-xs"
          />
          <input
            required
            type="text"
            v-model="home.features[1]"
            class="md:max-w-xs"
          />
          <input
            required
            type="text"
            v-model="home.features[2]"
            class="md:max-w-xs"
          />
          <input
            required
            type="text"
            v-model="home.features[3]"
            class="md:max-w-xs"
          />
          <input
            required
            type="text"
            v-model="home.features[4]"
            class="md:max-w-xs"
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
            />

            <input
              required
              type="number"
              min="0"
              v-model="home.bedrooms"
              placeholder="Rooms"
              class="md:max-w-xs"
            />

            <input
              required
              type="number"
              min="0"
              v-model="home.beds"
              placeholder="Beds"
              class="md:max-w-xs"
            />

            <input
              required
              type="number"
              min="0"
              v-model="home.bathrooms"
              placeholder="Bathrooms"
              class="md:max-w-xs"
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
              containerID="home-location"
              @resultFound="setAddressInfo"
            />

            <!-- <div
                id="mapbox-geocoder-home-location"
                @resultFound="setAddressInfo"
              ></div> -->
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
            />
          </div>

          <!-- Postal Code -->
          <div class="flex flex-col gap-2">
            <label for="postal-code">Postal Code</label>
            <input
              required
              type="text"
              name="postal-code"
              v-model="home.location.postalCode"
              class="md:max-w-xs"
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
                />

                <p>to</p>

                <input
                  required
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="max-w-[45%] md:max-w-xs"
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
                />

                <p>to</p>

                <input
                  required
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="max-w-[45%] md:max-w-xs"
                />
              </div>
            </div>
          </template>
        </DatePicker>

        <!-- Add Home to Database -->
        <div class="home-add">
          <button type="submit">Add Home</button>
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
        note: "",
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
          postalCode: "",
          country: "",
        },
        _geoloc: {
          lat: 26.1,
          lng: 26.1,
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
    },

    setAddressInfo(e) {
      const home = e.detail;

      this.home.location.address = home.place_name;
      this.home.location.city = home.text;
      this.home.location.state = home.context[0].text;
      this.home.location.country = home.context[1].text;
      this.home._geoloc.lng = home.geometry.coordinates[0];
      this.home._geoloc.lat = home.geometry.coordinates[1];
      console.log(this.home._geoloc.lng, this.home._geoloc.lat);
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
      @apply bg-primary-200   text-white py-2 px-6 rounded hover:scale-105 transition-all;
    }
  }
}
</style>
