import getApis from "../algolia/apis";
import stripeLib from "stripe";
import { rejectHitBadRequest, sendJSON } from "../helpers";

export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;
  const apis = getApis(algoliaConfig);
  const secretKey = this.options.privateRuntimeConfig.stripe.secretKey;
  const stripe = stripeLib(secretKey);
  const cloudName = this.options.cloudinary.cloudName;
  const rootUrl = this.options.rootUrl;

  this.nuxt.hook("render:setupMiddleware", (app) => {
    app.use("/api/stripe/create-session", createSession);
  });

  this.nuxt.hook("render:setupMiddleware", (app) => {
    app.use("/hooks/stripe", async (req, res, next) => {
      const meta = req.body.data.object.metadata;
      await apis.user.bookHome(
        meta.identityID,
        meta.homeID,
        meta.start,
        meta.end
      );
      res.end(`${meta.identityID} booked ${meta.homeID}!`);
    });
  });

  async function createSession(req, res) {
    const body = req.body;

    if (
      !body ||
      !body.homeID ||
      !body.start ||
      !body.end ||
      !body.start >= body.end
    ) {
      return rejectHitBadRequest(res);
    }

    const home = (await apis.homes.get(body.homeID)).data;
    const nights = (body.end - body.start) / 86400;
    const session = await stripe.checkout.sessions.create({
      metadata: {
        identityID: req.identity.id,
        homeID: body.homeID,
        start: body.start,
        end: body.end,
      },
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${rootUrl}/home/${body.homeID}?result=sucess`,
      cancel_url: `${rootUrl}/home/${body.homeID}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "USD",
            unit_amount: home.pricePerNight * nights * 100,
            product_data: {
              name: "Reservation for " + home.title,
              images: [
                `https://res.cloudinary.com/${cloudName}/image/upload/${home.images[0]}`,
              ],
            },
          },
        },
      ],
    });

    sendJSON({ id: session.id }, res);
  }
}
