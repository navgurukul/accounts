import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
// import { useNavigate } from "react-router-dom";

function AlreadyLoggedIn({ redirected, setRedirected, }) {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const logout = searchParams.get("logout");
  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev")) 
  // const redirectUrl = searchParams.get("redirectUrl");
  // const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
     setOriginUrl(localStorage.getItem("prev"));
    const message = {
      type: "USER_LOGIN",
      payload: {
        token: idToken,
        userDetails: user,
      },
    };
    const iframeLoadHandler = () => {
      const iframe = document.querySelector("iframe");
      const window = iframe.contentWindow;
      const targetOrigin = originUrl;
      window.postMessage(message, targetOrigin);
      return true
    };

    const iframe = document.querySelector("iframe");
    iframe.addEventListener("load", iframeLoadHandler);

    setTimeout(() => {
    window.location.href = `${originUrl}login`
    }, 6000);


    return () => {
      //cleanup
      iframe.removeEventListener("load", iframeLoadHandler);
      setTimeout(() => {
        localStorage.clear()
      }, 5000);
    };
  }, []);

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    const message = {
      type: 'USER_LOGIN',
      payload: { token: idToken },
    };
    const iframe = document.querySelector('iframe');
    const window = iframe.contentWindow;
    const targetOrigin = originUrl;

    window.postMessage(message, targetOrigin);

  }, []);
  return (
    <div>
      <h1>Already Logged In</h1>

      <iframe style={{width:"0px",height:"0px"}} src={originUrl} title="Sub"></iframe>
    </div>
  );
}

export default AlreadyLoggedIn;
