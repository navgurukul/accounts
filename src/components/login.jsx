import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import './style.css'
import backgroundImg from './assets/background.png'
import logo from './assets/logo.svg';
import googleImg from './assets/google.svg'
import loader from './assets/loader.gif'
function Login() {
  let [originUrl, setOriginUrl] = useState("");
  const [count, setcount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [originName, setOriginName] = useState('')
  useEffect(() => {
    localStorage.clear();
    setOriginUrl(document.referrer);
    if (originUrl == 'https://sso-login.d3laxofjrudx9j.amplifyapp.com/') setOriginName("Scratch")
    else if (originUrl == 'https://dashboard-delta-plum.vercel.app/') setOriginName("Partner Dashboard")
    else setOriginName("Meraki")
  }, [originUrl]);

  useEffect(() => {
    if (count >= 3) {
      originUrl == 'https://dashboard-delta-plum.vercel.app/' ? window.location.href = `${originUrl}`: window.location.href = `${originUrl}login`
    }
  }, [count]);


  window.addEventListener("message", function (event) {
  
    if (
      event.origin == "https://sso-login.dkchei85ij0cu.amplifyapp.com" ||
      event.origin == "https://sso-login.d3laxofjrudx9j.amplifyapp.com" || event.origin == "https://dashboard-delta-plum.vercel.app"
    ) {
      setcount((prev) => prev + 1);
      // console.log(event.origin, "origin of message")
      // console.log(count, "value of count")
      setTimeout(() => {
        localStorage.clear()
        console.log(originUrl, count, "count value ", "origin url")
        originUrl == 'https://dashboard-delta-plum.vercel.app/' ? window.location.href = `${originUrl}`: window.location.href = `${originUrl}login`
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

// Usage:
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
        src="https://sso-login.d3laxofjrudx9j.amplifyapp.com/login"
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