import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/actions/authAction";
import { userProfileAction } from "../../store/actions/userProfileAction";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const dispatchLogOut = useDispatch();
  const clearUserEmail = useDispatch();
  const clearUserInfo = useDispatch();

  const logOutHandler = () => {
    localStorage.removeItem("idToken");
    dispatchLogOut(authAction.setIdToken(""));
    dispatchLogOut(authAction.userLogOut());
    clearUserInfo(userProfileAction.setUserInfo(""));
    clearUserEmail(authAction.setUserEmail(null));
  };

  return (
    <div className="fixed flex flex-col justify-between items-center shadow-lg py-10 top-0 left-0 w-14 h-screen">
      <div className="flex flex-col justify-center items-center text-3xl gap-8 md:gap-5 text-orange-600">
        <NavLink to={"/"} className="cursor-pointer">
          <AiFillHome />
        </NavLink>
        <NavLink to={"/dashboard"} className="cursor-pointer">
          <BsFillBarChartFill />
        </NavLink>
        <NavLink to={"/categorys"} className="cursor-pointer">
          <BiSolidCategoryAlt />
        </NavLink>
      </div>
      <div className="flex flex-col justify-center items-center text-3xl gap-3 text-orange-600 pb-32 md:pb-0">
        <NavLink to={"/profile"} className={`cursor-pointer `}>
          <BiSolidUserCircle />
        </NavLink>
        <AiOutlineLogout onClick={logOutHandler} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBar;
