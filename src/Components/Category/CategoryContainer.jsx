import React, { useEffect, useState } from "react";
import Category from "./UI/Category";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory, fetchCatagory } from "../../store/actions/categoryAction";

const CategoryContainer = () => {
  const { categorys } = useSelector((state) => state.categorys);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatagory());
  }, []);

  const submitCategory = () => {
    const submittedCategory = {
      category: category,
      id: Math.random(),
    };

    // storing the catagory in the database
    dispatch(setCatagory(submittedCategory));
  };

  return (
    <div className=" md:w-[50rem] w-full m-auto p-5">
      <div className=" flex flex-col gap-4 justify-center p-10 font-popin">
        <h1 className="text-4xl s font-bold text-blue-950 h-3">Categories</h1>

        <div className="flex w-full gap-1 mt-7 pt-2">
          <input
            placeholder="Add New Category"
            className="w-[80%] p-2 focus border border-black"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            className="w-[18%] bg-blue-400 px-4 py-1 rounded-md text-white font-semibold"
            onClick={submitCategory}
          >
            Add Now
          </button>
        </div>
        <h1 className="text-2xl mt-5 font-bold">Your Categories</h1>
        <div className=" flex flex-col gap-2 h-fit">
          {categorys.length === 0 && (
            <p className="text-center">No Categorys Added</p>
          )}
          {categorys.map((val) => (
            <Category category={val.category} key={val.id} id={val.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;
