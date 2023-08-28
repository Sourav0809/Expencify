import { useContext, useEffect } from "react";
import MyRoutes from "../Routes/MyRoutes";
import axios from "axios";
import authContext from "../Context/AuthContext/authContext";

const App = () => {
  const authCtx = useContext(authContext);

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");

    const validateUser = async (idToken) => {
      if (idToken) {
        try {
          const validationRes = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
            { idToken: idToken }
          );

          authCtx.setIdToken(idToken);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // calling the above function to validate the user
    validateUser(idToken);
  }, []);

  return (
    <>
      <MyRoutes />
    </>
  );
};

export default App;
