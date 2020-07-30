import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { AuthContext } from "../../context/auth-context";

firebase.initializeApp({
  apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
  // authDomain: "surgeclasses.com",
  authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com",
  projectId: "surge-7a29b",
});

class FirebaseAuth extends Component {
  static contextType = AuthContext;
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    const auth = this.context;

    firebase.auth().onAuthStateChanged((user) => {
      let isSignedIn = !!user;
      if (isSignedIn) {
        auth.login();
      } else {
        auth.logout();
      }
      console.log("user", user);
      this.setState({ isSignedIn: isSignedIn });
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.isSignedIn && (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default FirebaseAuth;
