import { useContext, useEffect, useState } from "react";
import MyRoutes from "../Routes/MyRoutes";
import axios from "axios";
import authContext from "../Context/AuthContext/authContext";
import PageLoader from "../Components/UI/Loader/PageLoader";
import userProfileCtx from "../Context/UserProfile/userProfileCtx";
import SideBar from "../Components/SideBar/SideBar";

const App = () => {
  const authCtx = useContext(authContext);
  const { userInfo } = useContext(userProfileCtx);
  const [loaderScreen, setLoaderScreen] = useState(true);
  useEffect(() => {
    const idToken = localStorage.getItem("idToken");

    const validateUser = async (idToken) => {
      if (idToken) {
        try {
          const { data } = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
            { idToken: idToken }
          );

          // storing the token into context
          authCtx.setIdToken(idToken);
          authCtx.setUserLoggedIn(true);
        } catch (error) {
          console.log(error);
        }
      }
      setLoaderScreen(false);
    };

    // calling the above function to validate the user
    validateUser(idToken);
  }, []);

  return (
    <>
      {loaderScreen ? (
        PageLoader
      ) : (
        <>
          {userInfo ? (
            <>
              {}
              <SideBar />
              <MyRoutes />
            </>
          ) : (
            <>
              <MyRoutes />
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
