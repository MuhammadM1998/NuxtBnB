import initialState from "./state";

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER(state, authUser) {
    state.authUser = {
      displayName: authUser.displayName,
      photoURL: authUser.photoURL,
      email: authUser.email,
      id: authUser.uid,
    };
  },
};
