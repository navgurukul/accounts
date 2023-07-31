import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import './style.css'
import backgroundImg from './assets/background.png'
import logo from './assets/logo.svg';
import googleImg from './assets/google.svg'
import loader from './assets/loader.gif'
function Login() {
  let [originUrl, setOriginUrl] = useState("");
  const [responseCount, setresponseCount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [originName, setOriginName] = useState('')

  //Setting origin name for UI and getting previous url
  useEffect(() => {
    localStorage.clear();
    setOriginUrl(document.referrer);
    if (originUrl == 'https://sso-login.d3laxofjrudx9j.amplifyapp.com/') setOriginName("Scratch")
    else if (originUrl == 'https://dashboard-delta-plum.vercel.app/') setOriginName("Partner Dashboard")
    else setOriginName("Meraki")
  }, [originUrl]);

  // for redirection to source
  useEffect(() => {
    if (responseCount >= 3) {
      setTimeout(() => {
        originUrl == 'https://dashboard-delta-plum.vercel.app/' ? window.location.href = `${originUrl}` : window.location.href = `${originUrl}login`
      }, 1000);

    }
  }, [responseCount]);

  //For gettting response from the apps
  window.addEventListener("message", function (event) {
    if (event.origin == "https://sso-login.dkchei85ij0cu.amplifyapp.com") setresponseCount((prev) => prev + 1)
    if (event.origin == "https://sso-login.d3laxofjrudx9j.amplifyapp.com") setresponseCount((prev) => prev + 1)
    if (event.origin == "https://dashboard-delta-plum.vercel.app") setresponseCount((prev) => prev + 1)

    else {
      console.warn("Unauthorized application sending response", event.origin);
    }
  });

  //Sign in function
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

    //posting message function 
    const postMessageToIframe = (iframeId, targetOrigin) => {
      const iframe = document.querySelector(iframeId);
      if (!iframe) {
        console.error(`Iframe with ID '${iframeId}' not found.`);
        return false;
      }
      const window = iframe.contentWindow;
      window.postMessage(message, targetOrigin);
      return true;
    };
    postMessageToIframe("#scratchiFrame", "https://sso-login.d3laxofjrudx9j.amplifyapp.com/");
    postMessageToIframe("#merakiiFrame", "https://sso-login.dkchei85ij0cu.amplifyapp.com/");
    postMessageToIframe("#dashboardiframe", "https://dashboard-delta-plum.vercel.app/");
  }
  return (
    <>
      {
        <div className="container">
          <img id="backgroundImg" src={backgroundImg} alt="" />
          <div id="login-container">
            <img id="ng-logo" src={logo} alt="" />
            <h2 id="learn-heading">Embark On Your Learning Journey</h2>
            <h5>Continue to {originName}</h5>
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
            {loading ?
              <img src={loader} alt="loader" id="loading-image" /> : null}
          </div>
        </div>
      }
      <iframe
        id="scratchiFrame"
        src="https://sso-login.d3laxofjrudx9j.amplifyapp.com"
        title="Scratch"
      ></iframe>
      <iframe
        id="merakiiFrame"
        src="https://sso-login.dkchei85ij0cu.amplifyapp.com/"
        title="Meraki"
      ></iframe>
      <iframe
        id="dashboardiframe"
        src="https://dashboard-delta-plum.vercel.app/"
        title="Meraki"
      ></iframe>
    </>
  );
}
export default Login;