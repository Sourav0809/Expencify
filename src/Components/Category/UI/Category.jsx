import React from "react";

const Category = (props) => {
  return (
    <div className="bg-gray-200 p-2 flex justify-between items-center text-xl">
      <h1>{props.category}</h1>
      <button className="font-bold cursor-pointer">X</button>
    </div>
  );
};

export default Category;
