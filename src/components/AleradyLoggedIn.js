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
        window.open(`${redirectUrl}`, "_blank");
        window.close();
        setRedirected(true);
      } else {
        window.open(`${redirectUrl}/authenticate?token=${idToken}`, "_blank");
        window.close();
        setRedirected(true);
      }
    }
  }, []);
  return <div>AlreadyLoggedIn</div>;
}

export default AlreadyLoggedIn;