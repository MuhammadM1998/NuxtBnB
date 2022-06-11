export default function (context, inject) {
  inject("firebaseAuth", { renderGoogleLogin, signOut });

  function renderGoogleLogin(containerId) {
    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(context.$fireModule.auth());

    const config = {
      // signInFlow: "popup",
      signInOptions: [context.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log("Successfully signed in");
          return false;
        },
      },
    };
    ui.start(`#${containerId}`, config);
  }

  function signOut() {
    context.$fire.auth.signOut();
  }
}
