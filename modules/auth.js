import cookie from "cookie";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export default function () {
  const authConfig = this.options.publicRuntimeConfig.auth;
  const firebaseConfig = this.options.firebase.config;

  this.nuxt.hook("render:setupMiddleware", (app) => {
    app.use("/admin", (req, res, next) => {
      res.spa = true;
      next();
    });
  });

  this.nuxt.hook("render:setupMiddleware", (app) => {
    app.use("/api", handler);
  });

  async function handler(req, res, next) {
    let idToken;
    if (!req.headers.cookie) return rejectHit(res);
    else idToken = cookie.parse(req.headers.cookie)[authConfig.cookieName];

    const userIdentity = await getUser(idToken);
    if (!userIdentity) return rejectHit(res);
    req.identity = userIdentity;

    next();
  }

  async function getUser(idToken) {
    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    const identity = await getAuth(firebaseApp)
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const data = {
          id: decodedToken.uid,
          email: decodedToken.email,
          name: decodedToken.name,
          image: decodedToken.picture,
        };

        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    return identity;
  }

  function rejectHit(res) {
    res.statusCode = 401;
    res.end();
  }
}
