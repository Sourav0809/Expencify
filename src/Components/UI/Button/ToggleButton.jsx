import React, { useState } from "react";

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButtonStyle = `w-14 h-7 bg-${
    isToggled ? "white" : "gray"
  }-500 rounded-full p-1 flex items-center`;
  const toggleCircleStyle = `w-6 h-6 bg-white rounded-full transform ${
    isToggled ? "translate-x-8" : "translate-x-0"
  }`;

  const handleToggle = () => {
    setIsToggled(() => {
      if (isToggled == false) {
        document.body.setAttribute("class", "bg-dark");
        return true;
      } else {
        document.body.setAttribute("class", "bg-normal");
        return false;
      }
    });
  };

  return (
    <div className=" fixed top-2 right-10">
      <button className={toggleButtonStyle} onClick={handleToggle}>
        <div className={toggleCircleStyle}></div>
      </button>
    </div>
  );
}

export default ToggleButton;
