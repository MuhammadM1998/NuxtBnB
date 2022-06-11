export default {
  isLoggedIn: (state) => {
    if (state.authUser === null) {
      return false;
    } else {
      return true;
    }
  },

  user: (state) => {
    if (state.authUser === null) {
      return null;
    } else {
      return state.authUser;
    }
  },
};
