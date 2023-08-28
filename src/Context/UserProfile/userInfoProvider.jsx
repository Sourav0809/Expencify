import { useState } from "react";
import userProfileCtx from "./userProfileCtx";

const userInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState("");

  const userInfoSetHandeler = (info) => {
    setUserInfo(info);
  };

  const providerValues = {
    userInfo: userInfo,
    setUserInfo: userInfoSetHandeler,
  };

  return (
    <userProfileCtx.Provider value={providerValues}>
      {props.children}
    </userProfileCtx.Provider>
  );
};

export default userInfoProvider;
