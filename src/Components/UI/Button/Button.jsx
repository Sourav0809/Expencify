import React from "react";

const Button = (props) => {
  return (
    <button className=" mt-3 py-2 bg-[#1877f2] md:w-[15%] w-full font-semibold text-white rounded-md">
      {props.children}
    </button>
  );
};

export default Button;
