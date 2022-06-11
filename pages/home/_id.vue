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
