import axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import AlreadyLoggedIn from "./AleradyLoggedIn";

function Login() {
  // const urlParams = new URL(document.location.href);
  // const searchParams = urlParams.searchParams;
  // const redirectUrl = searchParams.get("redirectUrl");
  // const [redirected, setRedirected] = useState(false);

  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev"))
  const [count, setcount] = useState(0)
  let prevUrl

  useEffect(() => {
    localStorage.clear()
    prevUrl = document.referrer;
    localStorage.setItem("prev", prevUrl)
    setOriginUrl(localStorage.getItem("prev"));
  }, []);

  useEffect(() => {
    if (count === 2) window.location.href = `${originUrl}login`
  }, [count])


  window.addEventListener('message', function (event) {

    if (event.origin !== 'https://sso-login.dkchei85ij0cu.amplifyapp.com' || event.origin !== 'https://sso-login.d3laxofjrudx9j.amplifyapp.com') {
      console.warn('Unauthorized message origin. Ignoring the message.');
      return;
    }
    // Display the response received from the receiver
    var response = event.data;
    setcount((prev) => prev + 1)
    console.log('Received response from receiver:', JSON.stringify(response));
  });


  function onSignIn(googleUser) {
    let { id_token: idToken } = googleUser.getAuthResponse();
    localStorage.setItem("token", idToken);
    // if (!redirected) {
    //   window.location.href = `${redirectUrl}/authenticate?token=${idToken}`;
    // }
  }


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






    const originUrl = localStorage.getItem("prev")
    const userIdToken = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user, originUrl, "user")
    const message = {
      type: "USER_LOGIN",
      payload: {
        token: userIdToken,
        userDetails: user,
      },
    };
    const iframeLoadHandler = () => {
      console.log("fucntion is running")
      const iframe = document.querySelector("#scratchiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://sso-login.d3laxofjrudx9j.amplifyapp.com";
      window.postMessage(message, targetOrigin);
      return true
    };

    const merakiLoadHandler = () => {
      const iframe = document.querySelector("#merakiiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://sso-login.dkchei85ij0cu.amplifyapp.com/";
      window.postMessage(message, targetOrigin);
      return true
    };

    iframeLoadHandler()
    merakiLoadHandler()
    // const iframe = document.querySelector("#scratchiFrame");
    // iframe.addEventListener("load", iframeLoadHandler);

    // const meraki = document.querySelector("#merakiiFrame");
    // meraki.addEventListener("load", merakiLoadHandler)




    // setTimeout(() => {
    //   window.location.href = `${originUrl}login`
    // }, 3000);






    // if (!redirected ) {
    //   window.location.href = `authenticate?token=${idToken}`;
    // }
  }
  function isUserLoggedIn() {
    return {
      isLoggedIn: localStorage.getItem("token")?.length > 0,
      token: localStorage.getItem("token"),
    };
  }

  return (
    <>

      <GoogleLogin
        clientId="34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
        buttonText="Log In with Google "
        onSuccess={onSignIn}
        render={(renderProps) => (
          <button
            variant="contained"
            onClick={renderProps.onClick}
            style={{
              backgroundColor: "white",
              color: "black",
              margin: "10px 10px",
              fontSize: "20px",
              cursor: "pointer"
            }}
          >
            Log In with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
      <iframe style={{ width: "300px", height: "300px" }} id="scratchiFrame" src="https://sso-login.d3laxofjrudx9j.amplifyapp.com/login" title="Scratch"></iframe>
      <iframe style={{ width: "300px", height: "300px" }} id="merakiiFrame" src="https://sso-login.dkchei85ij0cu.amplifyapp.com/" title="Meraki"></iframe>
    </>
  )
}

export default Login;
