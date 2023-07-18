import React, { useEffect, useState } from "react";
function AlreadyLoggedIn() {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const logout = searchParams.get("logout");
  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev")) 

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user,  originUrl,"user")
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
    const scratchLoadHandler = () => {
      const urlScratch = "http://localhost:8080";
      const scratchFrame = document.querySelector("#scratch").contentWindow;
      const scratchWindow = scratchFrame.contentWindow;
      const scratchTargetUrl = urlScratch;
      scratchWindow.postMessage(message, scratchTargetUrl);
      return true
    };

    const iframe = document.querySelector("iframe");
    const scratchFrame = document.querySelector("#scratch")
    scratchFrame.addEventListener('load', scratchLoadHandler)
    iframe.addEventListener("load", iframeLoadHandler);

    setTimeout(() => {
    window.location.href = `${originUrl}login`
    }, 10000);


    return () => {
      //cleanup
      iframe.removeEventListener("load", iframeLoadHandler);
      setTimeout(() => {
        localStorage.clear()
      }, 5000);
    };
  }, []);
  // useEffect(() => {
  //   const idToken = localStorage.getItem("token");
  //   const message = {
  //     type: 'USER_LOGIN',
  //     payload: { token: idToken },
  //   };
  //   const iframe = document.querySelector('iframe');
  //   const window = iframe.contentWindow;
  //   const targetOrigin = "https://meraki-k069df6h5-meraki-dev.vercel.app/";
  //   window.postMessage(message, targetOrigin);
  // }, []);


  return (
    <div>
      <h1>Already Logged In</h1>
      <iframe style={{width:"300px",height:"300px"}} src="https://meraki-k069df6h5-meraki-dev.vercel.app/" title="Sub"></iframe>
      
      <iframe style={{width:"300px",height:"300px"}} id="scratch" src="http://localhost:8080" title="Sub"></iframe>
    </div>
  );
}
export default AlreadyLoggedIn;