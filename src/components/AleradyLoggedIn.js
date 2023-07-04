import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";

function AlreadyLoggedIn({ redirected, setRedirected, }) {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const logout = searchParams.get("logout");
  let [originUrl, setOriginUrl] = useState(localStorage.getItem("prev")) 

  useEffect(() => {
    const idToken = localStorage.getItem("token");
  
    let user = JSON.parse(localStorage.getItem("user"));
     setOriginUrl(localStorage.getItem("prev"));
     console.log(idToken, user)
    console.log(user,"user details")
    // const message = {
    //   type: "USER_LOGIN",
    //   payload: {
    //     token: idToken,
    //     userDetails: user,
    //   },
    // };
    // const iframeLoadHandler = () => {
    //   const iframe = document.querySelector("iframe");
    //   const window = iframe.contentWindow;
    //   const targetOrigin = originUrl;
    //   window.postMessage(message, targetOrigin);
    //   return true
    // };

    // const iframe = document.querySelector("iframe");
    // iframe.addEventListener("load", iframeLoadHandler);

    // setTimeout(() => {
    // window.location.href = `${originUrl}login`
    // }, 6000);


    // return () => {
    //   //cleanup
    //   iframe.removeEventListener("load", iframeLoadHandler);
    //   setTimeout(() => {
    //     localStorage.clear()
    //   }, 5000);
    // };
  }, []);

  // useEffect(() => {
  //   const idToken = localStorage.getItem("token");
  //   console.log(idToken)
  //   const message = {
  //     type: 'USER_LOGIN',
  //     payload: { token: idToken },
  //   };
  //   const iframe = document.querySelector('iframe');
  //   const window = iframe.contentWindow;
  //   const targetOrigin = 'http://localhost:3001';

  //   window.postMessage(message, targetOrigin);
  //   console.log("heloo")

  // if (!redirected) {
  //   if (logout?.length > 0) {
  //     localStorage.removeItem("token");
  //     window.location.href = `${redirectUrl}`;
  //     setRedirected(true);
  //   } else {
  //     window.location.href = `${redirectUrl}/authenticate?token=${idToken}`;
  //     setRedirected(true);
  //   }
  // }
  // }, []);
  return (
    <div>
      <h1>Already Logged In</h1>

      {/* <iframe style={{width:"0px",height:"0px"}} src={originUrl} title="Sub"></iframe> */}
    </div>
  );
}

export default AlreadyLoggedIn;
