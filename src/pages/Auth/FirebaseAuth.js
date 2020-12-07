import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { AuthContext } from "../../context/auth-context";

firebase.initializeApp({
  // apiKey: "AIzaSyAVj74BhyKXgG-8r-YnBhhHmM-MOg_XBdA",
  // authDomain: "surgeclasses.com",
  // projectId: "surge-7a29b",
  // databaseURL: "https://surge-7a29b.firebaseio.com",

  apiKey: "AIzaSyAVj74BhyKXgG-8r-YnBhhHmM-MOg_XBdA",
  authDomain: "surge-7a29b.firebaseapp.com",
  databaseURL: "https://surge-7a29b.firebaseio.com",
  projectId: "surge-7a29b",
  storageBucket: "surge-7a29b.appspot.com",
  messagingSenderId: "786748692680",
  appId: "1:786748692680:web:5a983193c663fdc6972dfd",
  measurementId: "G-VMVGQTP8QB"
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
