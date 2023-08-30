import { useState } from "react";
import authContext from "./authContext";

const AuthProvider = (props) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState("");

  const setIdTokenHandeler = (idToken) => {
    setIdToken(idToken);
  };

  const authProviderValues = {
    isUserLoggedIn: isUserLoggedIn,
    idToken: idToken,
    setIdToken: setIdTokenHandeler,
    setUserLoggedIn: setUserLoggedIn,
  };

  return (
    <authContext.Provider value={authProviderValues}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
