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
    // const iframeLoadHandler = () => {
    //   const iframe = document.querySelector("#scratchiFrame");
    //   const window = iframe.contentWindow;
    //   const targetOrigin = "https://sso-login.d3laxofjrudx9j.amplifyapp.com";
    //   window.postMessage(message, targetOrigin);
    //   return true
    // };

    const merakiLoadHandler = () => {
      const iframe = document.querySelector("#merakiiFrame");
      const window = iframe.contentWindow;
      const targetOrigin = "https://meraki-k069df6h5-meraki-dev.vercel.app";
      window.postMessage(message, targetOrigin);
      return true
    };

    // const iframe = document.querySelector("#scratchiFrame");
    // iframe.addEventListener("load", iframeLoadHandler);

    const meraki = document.querySelector("#merakiiFrame");
    meraki.addEventListener("load", merakiLoadHandler)

    setTimeout(() => {
    window.location.href = `${originUrl}login`
    }, 10000);


    // return () => {
    //   //cleanup
    //   iframe.removeEventListener("load", iframeLoadHandler);
    //   setTimeout(() => {
    //     localStorage.clear()
    //   }, 5000);
    // };
  }, []);


  return (
    <div>
      <h1>Already Logged In</h1>
      {/* <iframe style={{width:"300px",height:"300px"}} id="scratchiFrame" src="https://sso-login.d3laxofjrudx9j.amplifyapp.com/login" title="Scratch"></iframe> */}
      <iframe style={{width:"300px",height:"300px"}} id="merakiiFrame" src="https://meraki-k069df6h5-meraki-dev.vercel.app/login" title="Meraki"></iframe>
    </div>
  );
}
export default AlreadyLoggedIn;