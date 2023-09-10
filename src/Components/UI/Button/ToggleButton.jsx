import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { darkModeAction } from "../../../store/actions/darkModeAction";
import { useSelector } from "react-redux/es/hooks/useSelector";

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isToggled === true) {
      document.body.setAttribute("class", "bg-dark");
      dispatch(darkModeAction.switchTodark());
    } else {
      document.body.setAttribute("class", "bg-normal");
      dispatch(darkModeAction.switchToNormal());
    }
  }, [isToggled, dispatch]);

  const toggleButtonStyle = `w-14 h-7 ${
    isToggled ? " bg-gray-100" : "bg-purple-700"
  } rounded-full p-1 flex items-center`;
  const toggleCircleStyle = `w-6 h-6 bg-yellow-400 rounded-full transform ${
    isToggled ? "translate-x-6" : "translate-x-0"
  }`;

  const handleToggle = () => {
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };

  return (
    <div className=" fixed top-2 right-10  ">
      <button className={toggleButtonStyle} onClick={handleToggle}>
        <div className={toggleCircleStyle}></div>
      </button>
    </div>
  );
}

export default ToggleButton;
