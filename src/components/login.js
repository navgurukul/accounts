import axios from "axios";
import React from "react";
import GoogleLogin from "react-google-login";

function Login() {
  console.log();
  const urlParams = new URL(document.location.href);
  const searchParams = urlParams.searchParams;
  const redirectUrl = searchParams.get("redirectURL");
  function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let { id_token: idToken } = googleUser.getAuthResponse();
    console.log("ID: ", idToken); // Do not send to your backend! Use an ID token instead.

    return axios({
      url: `https://dev-api.merakilearn.org/users/auth/google`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
      data: {
        idToken: idToken,
        mode: "web",
      },
    }).then((res) => {
      console.log(res);
      //   window.localStorage.setItem("token", res.data.token);
      //   window.open(`${redirectUrl}/authenticate?token=${idToken}`);
      //   window.close();
    });

    const googleData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      idToken,
    };
  }
  return (
    <GoogleLogin
      clientId={
        "34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
      }
      buttonText="Log In with Google "
      onSuccess={onSignIn}
      redirectUri={redirectUrl}
      render={(renderProps) => (
        <button
          variant="contained"
          onClick={renderProps.onClick}
          style={{
            backgroundColor: "white",
            color: "black",
            margin: "10px 0",
            fontSize: "18px",
          }}
        >
          Log In with Google
        </button>
      )}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default Login;
