import "./App.css"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Login from "./components/login";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase

function App() {
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const auth = getAuth(app);
  auth.languageCode = "it";
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
        window.localStorage.setItem("token", token);
        window.open("http://localhost:3000/home", "_self");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
