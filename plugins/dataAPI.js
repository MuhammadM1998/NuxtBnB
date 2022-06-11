import { unWrap, getErrorResponse } from "~/utils/fetchUtils";

export default function ({ $config }, inject) {
  const algoliaHomes = `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/NuxtBnB_Homes`;
  const algoliaReview = `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/NuxtBnB_Reviews`;
  const algoliaUser = `https://${$config.algolia.appID}-dsn.algolia.net/1/indexes/NuxtBnB_Users`;
  const headers = {
    "X-Algolia-API-Key": $config.algolia.apiKey,
    "X-Algolia-Application-Id": $config.algolia.appID,
  };

  inject("dataAPI", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
    getHomes,
  });

  async function getHome(homeID) {
    try {
      return unWrap(await fetch(`${algoliaHomes}/${homeID}`, { headers }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeID) {
    try {
      return unWrap(
        await fetch(`${algoliaReview}/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeID}`,
            hitsPerPage: 6,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeID) {
    try {
      return unWrap(
        await fetch(`${algoliaUser}/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeID}`,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lng, lat, start, end, radius = 1500 * 15) {
    try {
      const days = [];
      for (let day = start; day <= end; day += 86400) {
        days.push(`availability:${day}`);
      }

      return unWrap(
        await fetch(`${algoliaHomes}/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            aroundLatLng: `${lat},${lng}`,
            aroundRadius: radius,
            hitsPerPage: 10,
            attributesToHighlight: [],
            filters: days.join(" AND "),
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomes() {
    try {
      return unWrap(
        await fetch(`${algoliaHomes}/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            hitsPerPage: 3,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
