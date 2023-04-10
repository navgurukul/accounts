import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
function AlreadyLoggedIn({ redirected, setRedirected }) {
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const logout = searchParams.get("logout");
  const redirectUrl = searchParams.get("redirectUrl");
  useEffect(() => {
    const idToken = localStorage.getItem("token");
    if (!redirected) {
      if (logout?.length > 0) {
        localStorage.removeItem("token");
        window.location.href = `${redirectUrl}`;
        setRedirected(true);
      } else {
        window.location.href = `${redirectUrl}/authenticate?token=${idToken}`;
        setRedirected(true);
      }
    }
  }, []);
  return <div>AlreadyLoggedIn</div>;
}

export default AlreadyLoggedIn;
