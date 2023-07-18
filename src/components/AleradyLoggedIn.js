import React, { useEffect, useState } from "react";

function AlreadyLoggedIn() {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const logout = searchParams.get("logout");
  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev"))

  const iframe = document.querySelector("meraki");
  const iframeScratch = document.querySelector("#scratch");

  const url = "https://meraki-k069df6h5-meraki-dev.vercel.app/"
  const urlScratch = "https://sso-login.d3laxofjrudx9j.amplifyapp.com"

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user, originUrl, "user")
    setOriginUrl(localStorage.getItem("prev"));
    const message = {
      type: "USER_LOGIN",
      payload: {
        token: idToken,
        userDetails: user,
      },
    };
    const iframeLoadHandler = (url) => {
      // const iframe = document.querySelector("iframe");

      const window = iframe.contentWindow;
      const scratchWindow = iframeScratch.contentWindow;
      const targetOrigin = url;
      const scratchTargetUrl = urlScratch;
      window.postMessage(message, targetOrigin);
      scratchWindow.postMessage(message, scratchTargetUrl);
      return true
    };

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

      <iframe style={{ width: "300px", height: "300px" }} id="meraki" src={url} title="Sub"></iframe>

      <iframe style={{ width: "300px", height: "300px" }} id="scratch" src={urlScratch} title="Sub"></iframe>
    </div>
  );
}

export default AlreadyLoggedIn;
