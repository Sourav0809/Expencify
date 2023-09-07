import { useState } from "react";
import Category from "./UI/Category";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "../../store/actions/categoryAction";

const CategoryContainer = () => {
  const { categorys } = useSelector((state) => state.categorys);
  console.log(categorys);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const submitCategory = () => {
    const submitedCategory = {
      category: category,
      id: Math.random(),
    };
    dispatch(categoryAction(submitedCategory));
  };

  return (
    <div className=" mt-2 md:w-[50rem] w-full  m-auto pl-[5rem] ">
      <div className="mt-5 flex flex-col p-10">
        <h1 className=" text-4xl font-popins font-bold text-blue-950">
          Categorys
        </h1>
        <h1 className=" text-2xl mt-5 font-bold">Your Categorys</h1>

        <div className=" mt-7 flex flex-col gap-2">
          {categorys.map((val) => {
            return (
              <Category category={val.category} key={val.id} id={val.id} />
            );
          })}
        </div>

        <div className=" flex w-full gap-1 mt-8">
          <input
            placeholder="Add New Category"
            className="w-[80%] p-2 focus border border-black "
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            className=" w-[20%] bg-blue-400 rounded-sm text-white font-semibold"
            onClick={submitCategory}
          >
            Add Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;
