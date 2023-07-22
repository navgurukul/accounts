import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import './style.css'
import backgroundImg from './assets/background.png'
import logo from './assets/logo.svg';
import googleImg from './assets/google.svg'
import loader from './assets/loader.gif'
function Login() {
  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev"));
  const [count, setcount] = useState(0);
  const [loading, setLoading] = useState(false)
  let prevUrl;

  useEffect(() => {
    localStorage.clear();
    prevUrl = document.referrer;
    localStorage.setItem("prev", prevUrl);
    setOriginUrl(localStorage.getItem("prev"));
  }, []);

  useEffect(() => {
    if (count === 2) window.location.href = `${originUrl}login`;
  }, [count]);
  window.addEventListener("message", function (event) {
    if (
      event.origin == "https://sso-login.dkchei85ij0cu.amplifyapp.com" ||
      event.origin == "https://sso-login.d3laxofjrudx9j.amplifyapp.com"
    ) {
      setcount((prev) => prev + 1);
      setTimeout(() => {
        localStorage.clear()
        window.location.href = `${originUrl}login`
      }, 3000);
    } else {
      console.warn("Unauthorized application sending response", event.origin);
    }
  });
  function onSignIn(googleUser) {
    let { id_token: idToken } = googleUser.getAuthResponse();
    localStorage.setItem("token", idToken);
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
    const message = {
      type: "USER_LOGIN",
      payload: {
        token: idToken,
        userDetails: googleData,
      },
    };
    setLoading(true)
    const iframeLoadHandler = () => {
      console.log(message, "message to be posterd")
      const iframe = document.querySelector("#scratchiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://sso-login.d3laxofjrudx9j.amplifyapp.com";
      window.postMessage(message, targetOrigin);
      return true;
    };

    const merakiLoadHandler = () => {
      console.log(message, "message to be posted from meraki")
      const iframe = document.querySelector("#merakiiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://sso-login.dkchei85ij0cu.amplifyapp.com/";
      window.postMessage(message, targetOrigin);
      return true;
    };

    console.log(iframeLoadHandler(),merakiLoadHandler(), "i r=frame load handler")
    iframeLoadHandler();
    merakiLoadHandler();

  }
  return (
    <>
      {
        loading ?
          <img src={loader} alt="loader" id="loading-image"/> :
          <div className="container">
            <img id="backgroundImg" src={backgroundImg} alt="" />
            <div id="login-container">
              <img id="ng-logo" src={logo} alt="" />
              <h2 id="learn-heading">Embark On Your Learning Journey</h2>

              <h5>Continue to Meraki</h5>
              <GoogleLogin
                clientId="34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
                buttonText="Log In with Google "
                onSuccess={onSignIn}
                render={(renderProps) => (
                  <button
                    variant="contained"
                    onClick={renderProps.onClick}
                    id="login-button"
                  >
                    <img id="login-image" src={googleImg} alt="" />
                  </button>
                )}
                cookiePolicy={"single_host_origin"}
              />

            </div>

          </div>
      }
        <iframe
              id="scratchiFrame"
              src="https://sso-login.d3laxofjrudx9j.amplifyapp.com/login"
              title="Scratch"
            ></iframe>
            <iframe
              id="merakiiFrame"
              src="https://sso-login.dkchei85ij0cu.amplifyapp.com/"
              title="Meraki"
            ></iframe>
    </>
  );
}
export default Login;