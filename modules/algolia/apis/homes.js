import fetch from "node-fetch";
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils";
import { getHeaders } from "../../helpers";

export default (algoliaConfig) => {
  const algoliaHome = `https://${algoliaConfig.appID}-dsn.algolia.net/1/indexes/NuxtBnB_Homes`;
  const headers = getHeaders(algoliaConfig);

  return {
    create: async (homeId, payload) => {
      try {
        const availability = [];
        payload.availabilityRanges.forEach((range) => {
          const start = new Date(range.start).getTime() / 1000;
          const end = new Date(range.end).getTime() / 1000;

          for (let day = start; day <= end; day += 86400) {
            availability.push(day);
          }
        });
        delete payload.availabilityRanges;
        payload.availability = availability;

        return unWrap(
          await fetch(`${algoliaHome}/${homeId}`, {
            headers,
            method: "PUT",
            body: JSON.stringify(payload),
          })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },

    delete: async (homeId) => {
      try {
        return unWrap(
          await fetch(`${algoliaHome}/${homeId}`, {
            headers,
            method: "DELETE",
          })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },

    get: async (homeId) => {
      try {
        return unWrap(
          await fetch(`${algoliaHome}/${homeId}`, {
            headers,
          })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },

    getByUserId: async (userId) => {
      try {
        return unWrap(
          await fetch(`${algoliaHome}/query`, {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `userId:${userId}`,
              attributesToRetrieve: ["objectID", "title"],
              attributesToHighlight: [],
            }),
          })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
  };
};
