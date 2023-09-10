import React from "react";
import { deleteCategory } from "../../../store/actions/categoryAction";
import { useDispatch } from "react-redux";

const Category = (props) => {
  const dispacth = useDispatch();

  const ondeleteCategory = () => {
    dispacth(deleteCategory(props.id));
  };

  return (
    <div className="bg-gray-200 p-[0.5rem] px-10 flex justify-between items-center text-xl">
      <h1>{props.category}</h1>
      <button className="font-bold cursor-pointer" onClick={ondeleteCategory}>
        X
      </button>
    </div>
  );
};

export default Category;
