
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import "./index.css";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_jcmNGQrXV",
  client_id: "7kkicfmsl9b0ikcmjf0qos0nc8",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "phone openid email",
  prompt: "login", // Force login prompt
  //automaticSilentRenew: false, // Disable silent renew
  //silent_redirect_uri: "http://localhost:5173/oidc-silent-renew.html",  // Silent renew URL
  //post_logout_redirect_uri: "http://localhost:5173/"
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);