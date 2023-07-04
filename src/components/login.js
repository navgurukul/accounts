import axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import AlreadyLoggedIn from "./AleradyLoggedIn";

function Login() {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const redirectUrl = searchParams.get("redirectUrl");
  const [redirected, setRedirected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  let prevUrl

    useEffect(() => {
      // const referringPageOrigin = new URL(document.referrer).origin;
      // console.log("Referring Page Origin:", referringPageOrigin);
      // setOrigin(referringPageOrigin)
      localStorage.clear()
       prevUrl = document.referrer;
      localStorage.setItem("prev", prevUrl)
    }, []);
  

  function onSignIn(googleUser) {
    let { id_token: idToken } = googleUser.getAuthResponse(); 
    
    let profile = googleUser.getBasicProfile();
    const googleData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      idToken,
    };
    localStorage.setItem("user", JSON.stringify(googleData))

    localStorage.setItem("token", idToken);
    if (!redirected) {
      window.location.href = `${redirectUrl}/authenticate?token=${idToken}`;
    }
  }
  function isUserLoggedIn() {
    return {
      isLoggedIn: localStorage.getItem("token")?.length > 0,
      token: localStorage.getItem("token"),
    };
  }

  return !isUserLoggedIn().isLoggedIn ? (
    <GoogleLogin
   
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log In with Google "
      onSuccess={onSignIn}
      render={(renderProps) => (
        <button
          variant="contained"
          onClick={renderProps.onClick}
          style={{
            backgroundColor: "white",
            color: "black",
            margin: "10px 0",
            fontSize: "18px",
          }}
        >
          Log In with Google
        </button>
      )}
      cookiePolicy={"single_host_origin"}
    />
  ) : (
    <AlreadyLoggedIn redirected={redirected} setRedirected={setRedirected} />
  );
}

export default Login;
