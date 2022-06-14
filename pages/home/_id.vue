<template>
  <section>
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
    <!-- <script type="application/ld+json" v-html="getSchema"></script> -->
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: this.home.title,

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `${this.home.title} Home Page. An Airbnb-like Website for renting houses to others. Built with Nuxt.js, Algolia, Mapbox, Firebase and more.`,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        { hid: "og-title", property: "og:title", content: this.home.title },
        {
          hid: "og-desc",
          property: "og:description",
          content: this.home.description,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: this.$img(
            this.home.images[0],
            { width: 1200 },
            { provider: "cloudinary" }
          ),
        },
        {
          hid: "og-url",
          property: "og:url",
          content: `${this.$config.rootUrl}/home/${this.home.objectID}`,
        },
        {
          hid: "t-type",
          name: "twitter:card",
          content: `summary_large_image`,
        },
      ],
    };
  },

  computed: {
    getSchema() {
      return JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BedAndBreakfast",
        name: this.home.title,
        image: this.$img(
          this.home.images[0],
          { width: 1200 },
          { provider: "cloudinary" }
        ),
        address: {
          "@type": "PostalAddress",
          addressLocality: this.home.location.city,
          addressRegion: this.home.location.state,
          postalCode: this.home.location.zipcode,
          streetAddress: this.home.location.address,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: this.home.reviewValue,
          reviewCount: this.home.reviewCount,
        },
      });
    },
  },

  async asyncData({ params, $dataAPI, error }) {
    const responses = await Promise.all([
      $dataAPI.getHome(params.id),
      $dataAPI.getReviewsByHomeId(params.id),
      $dataAPI.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });

    return {
      home: responses[0].data,
      reviews: responses[1].data.hits,
      user: responses[2].data.hits[0],
    };
  },
};
</script>
