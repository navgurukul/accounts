import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";

function Login() {
  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev"));
  const [count, setcount] = useState(0);
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
      var response = event.data;
      setcount((prev) => prev + 1);
    } else {
      console.warn("Unauthorized application sending response" , event.origin);
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
    // localStorage.setItem("user", JSON.stringify(googleData));

    // localStorage.setItem("token", idToken);

    const originUrl = localStorage.getItem("prev");
    // const userIdToken = localStorage.getItem("token");
    // let user = JSON.parse(localStorage.getItem("user"));
    const message = {
      type: "USER_LOGIN",
      payload: {
        token: idToken,
        userDetails: googleData,
      },
    };
    const iframeLoadHandler = () => {
      const iframe = document.querySelector("#scratchiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://sso-login.d3laxofjrudx9j.amplifyapp.com";
      window.postMessage(message, targetOrigin);
      return true;
    };

    const merakiLoadHandler = () => {
      const iframe = document.querySelector("#merakiiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://sso-login.dkchei85ij0cu.amplifyapp.com/";
      window.postMessage(message, targetOrigin);
      return true;
    };

    iframeLoadHandler();
    merakiLoadHandler();
    setTimeout(() => {
      localStorage.clear()
      window.location.href = `${originUrl}login`
    }, 2000);
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
              cursor: "pointer",
            }}
          >
            Log In with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
      <iframe
        style={{ width: "301px", height: "301px" }}
        id="scratchiFrame"
        src="https://sso-login.d3laxofjrudx9j.amplifyapp.com/login"
        title="Scratch"
      ></iframe>
      <iframe
        style={{ width: "301px", height: "301px" }}
        id="merakiiFrame"
        src="https://sso-login.dkchei85ij0cu.amplifyapp.com/"
        title="Meraki"
      ></iframe>
    </>
  );
}

export default Login;
