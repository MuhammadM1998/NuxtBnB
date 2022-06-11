<template>
  <div class="app-container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.home.title,
      meta: [
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
      ],
    };
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
