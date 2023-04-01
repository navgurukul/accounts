import axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import AlreadyLoggedIn from "./AleradyLoggedIn";

function Login() {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const redirectUrl = searchParams.get("redirectUrl");
  const [redirected, setRedirected] = useState(false);
  function onSignIn(googleUser) {
    let { id_token: idToken } = googleUser.getAuthResponse();
    localStorage.setItem("token", idToken);
    window.open(`${redirectUrl}/authenticate?token=${idToken}`, "_blank");
    window.open(``, "_blank").close();
    setRedirected(true);
  }
  function isUserLoggedIn() {
    return {
      isLoggedIn: localStorage.getItem("token")?.length > 0,
      token: localStorage.getItem("token"),
    };
  }

  return !isUserLoggedIn().isLoggedIn ? (
    <GoogleLogin
      clientId={
        "34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
      }
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
