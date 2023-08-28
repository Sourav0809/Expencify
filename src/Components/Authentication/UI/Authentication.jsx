import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Authentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");

  // log in handeler fundtion to change the state for user to login to sign up
  const setIsloggedInHandeler = () => {
    setLoggedIn((prev) => {
      return !prev;
    });
  };

  const userEmailHandeler = (e) => {
    setUserEmail(e.target.value);
  };
  const userPwdHandeler = (e) => {
    setUserPwd(e.target.value);
  };

  // if user log in or sign up
  const submitedFormHandeler = async () => {
    const submitedval = {
      email: userEmail,
      password: userPwd,
      returnSecureToken: false,
    };
    try {
      // when user create an account
      if (!loggedIn) {
        const submitedRes = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
          submitedval
        );
        console.log(submitedRes);
      }

      // when user log in
      if (loggedIn) {
        const submitedRes = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
          submitedval
        );
        console.log(submitedRes);
      }
    } catch (error) {
      console.log(error);
    }

    setUserEmail("");
    setUserPwd("");
  };

  return (
    <div className=" font-popins">
      <h1 className=" text-4xl p-6 mt-4 font-semibold ">expencyFi</h1>
      <div className=" m-auto mt-28 lg:w-[80rem] w-full">
        <div className=" p-7 flex flex-col gap-3">
          <div>
            <h1 className=" text-5xl font-bold  ">
              {!loggedIn ? "Create Account" : "Log In"}
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
              className=" bg-[#e0e0e0] p-2 rounded-md"
              onChange={userEmailHandeler}
              value={userEmail}
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password..."
              className=" bg-[#e0e0e0] p-2 rounded-md"
              onChange={userPwdHandeler}
              value={userPwd}
            />
          </div>

          <div className=" mt-5">
            <button
              className=" py-2 px-10 bg-[#1877f2] font-semibold text-white rounded-md"
              onClick={submitedFormHandeler}
            >
              {!loggedIn ? "Sign Up" : "Log In"}
            </button>
          </div>

          <div className=" mt-5">
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
    </div>
  );
};

export default Authentication;
