import fetch from "node-fetch";
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils";
import { getHeaders } from "../../helpers";

export default (algoliaConfig) => {
  const algoliaUser = `https://${algoliaConfig.appID}-dsn.algolia.net/1/indexes/NuxtBnB_Users`;
  const algoliaBooking = `https://${algoliaConfig.appID}-dsn.algolia.net/1/indexes/NuxtBnB_Bookings`;
  const headers = getHeaders(algoliaConfig);

  return {
    bookHome: async (identityID, homeID, start, end) => {
      try {
        return unWrap(
          await fetch(`${algoliaBooking}/`, {
            headers,
            method: "POST",
            body: JSON.stringify({ identityID, homeID, start, end }),
          })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },

    assignHome: async function (identity, homeId) {
      const payload = (await this.getById(identity)).data;
      payload.homeId.push(homeId);
      this.create(identity, payload);
    },

    removeHome: async function (identity, homeId) {
      const payload = (await this.getById(identity)).data;
      const homes = payload.homeId.filter((id) => id != homeId);
      payload.homeId = homes;
      this.create(identity, payload);
    },

    create: async (identity, payload) => {
      try {
        return unWrap(
          await fetch(`${algoliaUser}/${identity.id}`, {
            headers,
            method: "PUT",
            body: JSON.stringify(payload),
          })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },

    getById: async (identity) => {
      try {
        return unWrap(
          await fetch(`${algoliaUser}/${identity.id}`, { headers })
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
  };
};
