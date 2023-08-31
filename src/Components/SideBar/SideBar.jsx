import React, { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import authContext from "../../Context/AuthContext/authContext";
import userProfileCtx from "../../Context/UserProfile/userProfileCtx";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  const authCtx = useContext(authContext);
  const userCtx = useContext(userProfileCtx);

  const logOutHandeler = () => {
    localStorage.removeItem("idToken");
    authCtx.setUserLoggedIn(false);
    authCtx.setIdToken("");
    userCtx.setUserInfo("");
  };

  return (
    <div className=" bg-white fixed flex flex-col justify-between items-center shadow-lg py-10 top-0 left-0  w-14 h-screen">
      <div className=" flex flex-col justify-center items-center text-3xl gap-8 md:gap-5 text-orange-600 ">
        <NavLink to={"/"}>
          <AiFillHome className="cursor-pointer" />
        </NavLink>
        <NavLink to={"/dashboard"}>
          <BsFillBarChartFill className="cursor-pointer" />
        </NavLink>
        <BiSolidCategoryAlt className="cursor-pointer" />
      </div>
      <div className=" flex flex-col justify-center items-center text-3xl gap-3 text-orange-600 pb-32 md:pb-0   ">
        <NavLink to={"/profile"}>
          <BiSolidUserCircle className="cursor-pointer" />
        </NavLink>
        <AiOutlineLogout onClick={logOutHandeler} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBar;
