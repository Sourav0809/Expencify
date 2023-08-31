import axios from "axios";
import Button from "../../UI/Button/Button";
import { useContext } from "react";
import authContext from "../../../Context/AuthContext/authContext";
import userProfileCtx from "../../../Context/UserProfile/userProfileCtx";
import { toast } from "react-toastify";
const ProfileView = () => {
  const authCtx = useContext(authContext);
  const userCtx = useContext(userProfileCtx);
  const verifyEmailHandeler = async () => {
    const idToken = localStorage.getItem("idToken");
    try {
      const validationRes = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
        { requestType: "VERIFY_EMAIL", idToken: idToken }
      );
      toast.success("Verfication Link Sent !");
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  // if user want to log out

  const logOutHandeler = () => {
    localStorage.removeItem("idToken");
    authCtx.setUserLoggedIn(false);
    authCtx.setIdToken("");
    userCtx.setUserInfo("");
  };

  return (
    <div>
      <div className=" mt-36 text-center text-5xl">Your Profile</div>;
      <div className=" flex justify-center items-center gap-2">
        <Button>
          <span onClick={verifyEmailHandeler}>Verify Email</span>
        </Button>
        <Button>
          <span onClick={logOutHandeler}>Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;
