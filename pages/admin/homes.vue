<template>
  <div>
    <!-- Edit this to make it Home Row Component -->
    <!-- Look at home router, home api to return not only objectId and title but all attributes -->
    <!-- Change the push statemnt in the onSubmit method here to reflect all attributes  -->
    <div>
      <span v-for="home in homesList" :key="home.objectID"
        >{{ home.title }}
        <button class="text-red-800" @click="deleteHome(home.objectID)">
          Delete</button
        ><br />
      </span>
    </div>

    <h2 class="text-xl bold">Add a Home</h2>

    <form class="form" @submit.prevent="onSubmit">
      Images: <br />
      <ImageUploader @imageUploaded="imageUpdated($event, 0)" />
      <ImageUploader @imageUploaded="imageUpdated($event, 1)" />
      <ImageUploader @imageUploaded="imageUpdated($event, 2)" />
      <ImageUploader @imageUploaded="imageUpdated($event, 3)" />
      <ImageUploader @imageUploaded="imageUpdated($event, 4)" />

      Title: <br />
      <input type="text" class="w-60" v-model="home.title" /><br />

      Description: <br />
      <textarea class="w-104" v-model="home.description"> </textarea><br />

      Note: <br />
      <textarea class="w-104" v-model="home.note"> </textarea><br />

      Features: <br />
      <textarea class="w-26" v-model="home.features[0]"> </textarea>
      <textarea class="w-26" v-model="home.features[1]"> </textarea>
      <textarea class="w-26" v-model="home.features[2]"> </textarea>
      <textarea class="w-26" v-model="home.features[3]"> </textarea>
      <textarea class="w-26" v-model="home.features[4]"> </textarea><br />

      Price Per Night <br />
      <input type="number" class="w-14" v-model="home.pricePerNight" /><br />

      Guests / Rooms / Beds / Baths <br />
      <input type="number" class="w-14" v-model="home.guests" />
      <input type="number" class="w-14" v-model="home.bedrooms" />
      <input type="number" class="w-14" v-model="home.beds" />
      <input type="number" class="w-14" v-model="home.bathrooms" />
      <input type="number" class="w-14" v-model="home.bathrooms" /><br />

      <TTSearchBox @resultSelected="setAddressInfo" />

      Address:
      <input type="text" class="w-60" v-model="home.location.address" /><br />

      City:
      <input type="text" class="w-26" v-model="home.location.city" /><br />

      State:
      <input type="text" class="w-26" v-model="home.location.state" /><br />

      Postal Code:
      <input
        type="text"
        class="w-26"
        v-model="home.location.postalCode"
      /><br />

      Country:
      <input type="text" class="w-26" v-model="home.location.country" /><br />

      <DatePicker
        v-for="(range, index) in home.availabilityRanges"
        :key="index"
        v-model="home.availabilityRanges[index]"
        is-range
        timezone="UTC"
        :modelConfig="{ timeAdjust: '00:00:00' }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input :value="inputValue.start" v-on="inputEvents.start" />
          to
          <input :value="inputValue.end" v-on="inputEvents.end" />
          <br />
        </template>
      </DatePicker>

      <button type="submit" class="px-4 py-2 border border-gray-400">
        Add
      </button>
    </form>
  </div>
</template>

<script>
import { unWrap } from "~/utils/fetchUtils";

export default {
  data() {
    return {
      homesList: [],
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

  mounted() {
    this.setHomesList();
  },

  methods: {
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: "DELETE",
      });

      const index = this.homesList.findIndex((obj) => obj.objectID == homeId);
      this.homesList.splice(index, 1);
    },

    imageUpdated(imageUrl, index) {
      this.home.images[index] = imageUrl;
    },

    async onSubmit() {
      const response = await unWrap(
        await fetch("/api/homes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.home),
        })
      );

      this.homesList.push({
        title: this.home.title,
        objectID: response.data.homeId,
      });
    },

    setAddressInfo(event) {
      const resultAddress = event.detail.address;
      const resultLocation = event.detail.position;
      console.log(resultAddress, resultLocation);

      this.home.location.address = resultAddress.freeformAddress;
      this.home.location.city =
        resultAddress.municipality || resultAddress.countrySecondarySubdivision;
      this.home.location.state =
        resultAddress.countrySubdivisionName ||
        resultAddress.countrySubdivision;
      this.home.location.country = resultAddress.country;
      this.home.location.postalCode = resultAddress.postalCode;
      this.home._geoloc.lat = resultLocation.lat;
      this.home._geoloc.lng = resultLocation.lng;
    },

    async setHomesList() {
      this.homesList = (await unWrap(await fetch("/api/homes/user/"))).data;
    },
  },
};
</script>

<style scoped>
.form input,
.form textarea {
  @apply p-1 m-1 bg-gray-200;
}
</style>
