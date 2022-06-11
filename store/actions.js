import Cookie from "js-cookie";

export default {
  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit("RESET_STORE");
      Cookie.remove(this.$config.auth.cookieName);
      return;
    }

    commit("SET_AUTH_USER", authUser);

    try {
      const idToken = await authUser.getIdToken(true);
      Cookie.set(this.$config.auth.cookieName, idToken, {
        expires: 1 / 24,
        sameSite: "lax",
      });
    } catch (e) {
      console.error(e);
    }
  },
};
