import { useEffect, useState } from "react";
import MyRoutes from "../Routes/MyRoutes";
import axios from "axios";
import PageLoader from "../Components/UI/Loader/PageLoader";
import SideBar from "../Components/SideBar/SideBar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { authAction } from "../store/actions/authAction";

const App = () => {
  const { userInfo } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
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

          // storing the token into redux store
          dispatch(authAction.userAuthenticated());
          dispatch(authAction.setIdToken(idToken));
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
