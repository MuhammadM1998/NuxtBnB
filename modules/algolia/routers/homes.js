import { rejectHitBadRequest, hasBadBody, sendJSON } from "../../helpers";
import { v4 as uuidv4 } from "uuid";

export default (apis) => {
  return async (req, res) => {
    // URL /api/homes/user/
    if ((req.method === "GET") & (req.url === "/user/")) {
      return await getHomesByUser(req.identity.id, res);
    }

    if (req.method === "DELETE") {
      const homeId = req.url.replace(/\//g, "");
      return await deleteHome(req.identity, homeId, res);
    }

    if (req.method === "POST") {
      if (hasBadBody(req)) return rejectHitBadRequest(res);
      await createHome(req.identity, req.body, res);
      return;
    }
    rejectHitBadRequest(res);
  };

  async function getHomesByUser(userId, response) {
    const payload = (await apis.homes.getByUserId(userId)).data.hits;
    sendJSON(payload, response);
  }

  async function createHome(identity, body, res) {
    const homeId = uuidv4();

    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    };

    const response = await apis.homes.create(homeId, payload);
    if (!response.ok) {
      res.statusCode = 500;
      res.end();
      return;
    }

    await apis.user.assignHome(identity, homeId);
    sendJSON({ homeId }, res);
  }

  async function deleteHome(identity, homeId, res) {
    await Promise.all([
      apis.homes.delete(homeId),
      apis.user.removeHome(identity, homeId),
    ]);
    sendJSON({}, res);
  }
};
