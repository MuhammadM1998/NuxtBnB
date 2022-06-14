<template>
  <section class="pt-0 app-section">
    <div class="container">
      <div class="flex flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between">
        <!-- Details -->
        <div class="property-details">
          <h1 class="app-title">
            {{ home.title }}
          </h1>

          <div class="flex flex-col gap-2">
            <!-- Home Address -->
            <div class="flex items-center gap-2">
              <SVGMarker class="svg" />
              <p>{{ home.location.address }}</p>
            </div>

            <!-- Home Specs -->
            <div class="flex items-center gap-2 text-center">
              <SVGHouse class="fill-primary-400" />

              <p>
                {{ pluralize(home.guests, "Guest") }} &middot;
                {{ pluralize(home.bedrooms, "Room") }} &middot;
                {{ pluralize(home.beds, "Bed") }} &middot;
                {{ pluralize(home.bathrooms, "Bath") }}
              </p>
            </div>

            <!-- Home Review Value & Count -->
            <div class="flex items-center gap-2">
              <SVGStar class="svg" />
              <p>
                {{ home.reviewValue }}
                <span class="text-primary-300">({{ home.reviewCount }})</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Request Booking  -->
        <div class="property-request">
          <div class="text-5xl font-bold text-center text-primary-200">
            ${{ home.pricePerNight
            }}<span class="text-primary-300"> / night</span>
          </div>

          <!-- Date Range -->
          <client-only>
            <template #placeholder>
              <div
                class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center"
              >
                <input class="datepicker app-input" />
                <span class="font-medium text-center">to</span>
                <input class="datepicker app-input" />
              </div>
            </template>

            <DatePicker
              class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center"
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

          <button class="mx-auto app-button search-button" @click="checkout">
            Request to book!
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pluralize from "~/utils/pluralize";

export default {
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
    };
  },

  props: {
    home: { type: Object, required: true },
  },

  methods: {
    pluralize,

    checkout() {
      const start = this.range.start.getTime() / 1000;
      const end = this.range.end.getTime() / 1000;
      this.$stripe.checkout(this.home.objectID, start, end);
    },
  },

  mounted() {
    if (this.$route.query.result) {
      alert("Sucess!");
    }
  },
};
</script>

<style scoped lang="scss">
.property-details,
.property-request {
  @apply flex flex-col gap-4 font-normal px-2 lg:px-4 lg:basis-full;
}

.property-details {
  @apply border-dashed border-gray-500 lg:border-r;
}
</style>
