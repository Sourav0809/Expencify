import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../store/actions/authAction";
import { setUserEmailAction } from "../../../store/actions/authAction";
import toast from "react-hot-toast";
import Loader from "../../UI/Loader/Loader";

const Authentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [loaderScreen, setLoaderScreen] = useState(false);
  const [onForgotPwd, setOnForgotPwd] = useState(false);
  const { darkMode } = useSelector((state) => state.darkMode);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                           SWITCH LOGIN OR SIGN UP                          */
  /* -------------------------------------------------------------------------- */
  const setIsloggedInHandeler = () => {
    setLoggedIn((prev) => {
      return !prev;
    });
    setOnForgotPwd(false);
  };

  const userEmailHandeler = (e) => {
    setUserEmail(e.target.value);
  };
  const userPwdHandeler = (e) => {
    setUserPwd(e.target.value);
  };

  /* -------------------------------------------------------------------------- */
  /*                           USER LOG IN AND SIGN UP                          */
  /* -------------------------------------------------------------------------- */

  const submitedFormHandeler = async (e) => {
    e.preventDefault();
    const submitedval = {
      email: userEmail,
      password: userPwd,
      returnSecureToken: false,
    };
    try {
      /* -------------------------------------------------------------------------- */
      /*                          FOR CREATING NEW ACCOUNT                          */
      /* -------------------------------------------------------------------------- */

      if (!loggedIn && !onForgotPwd) {
        setLoaderScreen(true);
        const { data } = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
          submitedval
        );

        // storing the token after user create an account
        localStorage.setItem("idToken", data.idToken);

        // storing the token into redux store and set user is logged in / autheticated
        dispacth(authAction.setIdToken(data.idToken));
        dispacth(authAction.userAuthenticated());
        dispacth(setUserEmailAction(data.email));
        toast.success("Account Created ! ");
        // navigate to user profile tab where user update their details
        navigate("/userprofile");
      }

      /* -------------------------------------------------------------------------- */
      /*                                 FOR LOG IN                                 */
      /* -------------------------------------------------------------------------- */

      if (loggedIn && !onForgotPwd) {
        setLoaderScreen(true);
        const { data } = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
          submitedval
        );

        // storing the token after user create an account
        localStorage.setItem("idToken", data.idToken);

        // storing the token into redux store and set user is logged in / autheticated
        dispacth(authAction.setIdToken(data.idToken));
        dispacth(authAction.userAuthenticated());
        dispacth(setUserEmailAction(data.email));
        toast.success("User Logged In ! ");
        navigate("/expenses");
      }

      /* -------------------------------------------------------------------------- */
      /*                             FOR FORGOT PASSWORD                            */
      /* -------------------------------------------------------------------------- */

      if (onForgotPwd) {
        setLoaderScreen(true);
        const forgotRes = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
          {
            requestType: "PASSWORD_RESET",
            email: userEmail,
          }
        );

        setLoggedIn(true);
        setOnForgotPwd(false);
        toast.success("Reset Link Sent On Your Email!");
      }
    } catch (error) {
      toast.error(error.response.data.error.message);
      setLoaderScreen(false);
    }

    setLoaderScreen(false);
    setUserEmail("");
    setUserPwd("");
  };

  return (
    <form className=" font-popins" onSubmit={submitedFormHandeler}>
      <h1
        className=" text-4xl p-6 mt-4 font-semibold "
        onClick={() => {
          location.reload();
        }}
      >
        expencyFi
      </h1>
      <div className=" m-auto  mt-28 lg:w-[70rem] w-full">
        <div className=" p-7 flex flex-col gap-3">
          <div>
            <h1 className=" text-5xl font-bold  ">
              {!loggedIn
                ? "Create Account"
                : onForgotPwd
                ? "Forgot Password"
                : "Log In"}
            </h1>
          </div>

          <div className=" mt-5">
            <button className=" w-[100%] bg-[#e0e0e0] rounded-md p-1 text-black text-lg flex gap-1 justify-center items-center ">
              <h1 className=" text-base">Connect With</h1>
              <FcGoogle className=" text-4xl" />
            </button>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Your E-mail..."
              className={`bg-[#e0e0e0] p-2 rounded-md ${
                darkMode && "text-black"
              } `}
              onChange={userEmailHandeler}
              value={userEmail}
              required
            />
          </div>

          {!onForgotPwd && (
            <div className=" flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password..."
                className={`bg-[#e0e0e0] p-2 rounded-md ${
                  darkMode && "text-black"
                }`}
                onChange={userPwdHandeler}
                value={userPwd}
                required
              />
            </div>
          )}
          <div>
            {loggedIn && (
              <p
                className=" text-red-600 text-sm cursor-pointer w-fit"
                onClick={() => {
                  setOnForgotPwd(true);
                }}
              >
                {!onForgotPwd && "Forgot Password"}
              </p>
            )}
          </div>

          <div className=" mt-5">
            <button
              type="submit"
              className=" py-2 px-10 bg-[#1877f2] font-semibold text-white rounded-md"
            >
              {!loggedIn
                ? loaderScreen
                  ? Loader
                  : "Sign Up"
                : loaderScreen
                ? Loader
                : onForgotPwd
                ? loaderScreen
                  ? Loader
                  : "Send Forgot Password Link"
                : "Log In"}
            </button>
          </div>

          <div className=" mt-5 w-fit">
            <h1>{!loggedIn ? "Already have an account?" : "New User?"}</h1>
            <h1
              onClick={setIsloggedInHandeler}
              className="text-[#1877f2] text-lg font-medium cursor-pointer font-sans"
            >
              {!loggedIn ? "Log In" : "Create New Account"}
            </h1>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Authentication;
