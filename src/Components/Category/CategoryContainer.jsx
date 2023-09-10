import React, { useEffect, useState } from "react";
import Category from "./UI/Category";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory } from "../../store/actions/categoryAction";
import PageLoader from "../UI/Loader/PageLoader";

const CategoryContainer = () => {
  const { categorys, loader } = useSelector((state) => state.categorys);
  const { darkMode } = useSelector((state) => state.darkMode);
  // for the input
  const [inputCatagory, setInputCatagory] = useState("");

  const dispatch = useDispatch();

  // when user submit the category

  const submitCategory = () => {
    const submittedCategory = {
      category: inputCatagory,
      id: Math.random(),
    };

    // storing the catagory in the database
    dispatch(setCatagory(submittedCategory));

    setInputCatagory("");
  };

  return (
    <>
      {loader ? (
        PageLoader
      ) : (
        <div className=" md:w-[50rem] w-full m-auto pl-[3.5rem]">
          <div className=" flex flex-col gap-4 justify-center p-10 font-popin">
            <h1
              className={`text-4xl s font-bold text-blue-950 h-3 ${
                darkMode && "text-white"
              } `}
            >
              Categories
            </h1>

            <div className="flex w-full gap-1 mt-7 pt-2">
              <input
                placeholder="Add New Category"
                className={`w-[70%] p-2  border border-black ${
                  darkMode && "text-black"
                }`}
                value={inputCatagory}
                onChange={(e) => setInputCatagory(e.target.value)}
              />
              <button
                className="w-[30%] bg-blue-400 px-4 py-1 rounded-md text-white font-semibold"
                onClick={submitCategory}
              >
                Add Now
              </button>
            </div>
            <h1 className="text-2xl mt-5 font-bold">Your Categories</h1>
            <div
              className={` flex flex-col gap-2 h-fit ${
                darkMode && "text-black"
              }`}
            >
              {categorys.length === 0 && (
                <p className="text-center">No Categorys Added</p>
              )}
              {categorys.map((val) => (
                <Category category={val.category} key={val.id} id={val.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryContainer;
