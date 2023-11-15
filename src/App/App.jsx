import { useEffect, useState } from "react";
import MyRoutes from "../Routes/MyRoutes";
import axios from "axios";
import PageLoader from "../Components/UI/Loader/PageLoader";
import SideBar from "../Components/SideBar/SideBar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { authAction } from "../store/actions/authAction";
import { setUserEmailAction } from "../store/actions/authAction";
import ToggleButton from "../Components/UI/Button/ToggleButton";
import { getExpence } from "../store/actions/expencesAction";
import { fetchCatagory } from "../store/actions/categoryAction";

const App = () => {
  const { userInfo } = useSelector((state) => state.userProfile);
  const { userEmail } = useSelector((state) => state.auth);
  const [loaderScreen, setLoaderScreen] = useState(true);
  const dispatch = useDispatch();

  // useffect for user validation
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
          dispatch(setUserEmailAction(data.users[0].email));
        } catch (error) {
          console.log(error);
        }
      }
      setLoaderScreen(false);
    };

    // calling the above function to validate the user
    validateUser(idToken);
  }, []);

  // useffect for fetching user expences and catagorys
  useEffect(() => {
    if (userEmail) {
      // fetching user expences
      dispatch(getExpence());
      // fetching user catagory

      dispatch(fetchCatagory());
    }
  }, [userEmail]);

  return (
    <>
      {console.log("line no 60 ")}
      {loaderScreen ? (
        PageLoader
      ) : (
        <>
          {userInfo ? (
            <>
              <ToggleButton />
              <SideBar />
              <MyRoutes />
            </>
          ) : (
            <>
              <ToggleButton />
              <MyRoutes />
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
