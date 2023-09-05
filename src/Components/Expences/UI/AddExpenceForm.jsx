import React, { useContext, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import { ImCross } from "react-icons/im";
import { setExpence } from "../../../store/actions/expencesAction";
import { useDispatch } from "react-redux";

const AddExpenceForm = (props) => {
  const [expenceName, setExpenceName] = useState("");
  const [expencePrice, setExpencePrice] = useState("");
  const [expenceDate, setExpenceDate] = useState("");
  const [expenceTime, setExpenceTime] = useState("");
  const [catagory, setCatagory] = useState("Not Selected");
  const dispatch = useDispatch();

  /* -------------------------------------------------------------------------- */
  /*                           On adding a new Expence                          */
  /* -------------------------------------------------------------------------- */

  const onAddingExpence = (e) => {
    e.preventDefault();
    if (expenceName && expenceDate && expencePrice && expenceTime) {
      const expenceDetails = {
        expenceName: expenceName,
        expencePrice: expencePrice,
        isExpence: true,
        id: Math.random().toString(),
        expenceDate: expenceDate,
        expenceTime: expenceTime,
        expenceDay: new Date(expenceDate).toLocaleString("en-US", {
          weekday: "long",
        }),
        catagory: catagory,
      };

      dispatch(setExpence(expenceDetails));
      props.hideAddExpence();
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                           On adding a new Credit                           */
  /* -------------------------------------------------------------------------- */

  const onAddingCredit = (e) => {
    e.preventDefault();
    if (expenceName && expenceDate && expencePrice && expenceTime) {
      const expenceDetails = {
        expenceName: expenceName,
        expencePrice: expencePrice,
        isExpence: false,
        id: Math.random().toString(),
        expenceDate: expenceDate,
        expenceTime: expenceTime,
        expenceDay: new Date(expenceDate).toLocaleString("en-US", {
          weekday: "long",
        }),
        catagory: catagory,
      };
      dispatch(setExpence(expenceDetails));
      props.hideAddExpence();
    }
  };

  return (
    <Modal>
      <div className="  bg-blue-200 rounded-lg shadow-md w-[25rem] h-[27rem]">
        <div className=" flex justify-end items-end">
          <div
            className="bg-gray-500 inline-block p-3 rounded-tr-md rounded-bl-md cursor-pointer "
            onClick={props.hideAddExpence}
          >
            <ImCross className=" text-white" />
          </div>
        </div>

        <div className=" p-7">
          <div>
            <h1 className=" text-center font-semibold text-2xl font-popins">
              Add New Transaction
            </h1>
          </div>

          <div className=" mt-3 ">
            <form className="flex flex-col w-full gap-2">
              <input
                type="text"
                placeholder="Expence Name"
                className=" p-[.4rem] "
                onChange={(e) => setExpenceName(e.target.value)}
                value={expenceName}
              />
              <div className=" flex gap-2">
                <input
                  type="date"
                  className=" w-1/2 p-1 "
                  onChange={(e) => setExpenceDate(e.target.value)}
                  value={expenceDate}
                />
                <input
                  type="time"
                  className=" w-1/2  p-1 flex"
                  onChange={(e) => setExpenceTime(e.target.value)}
                  value={expenceTime}
                />
              </div>
              <select
                id="category"
                name="category"
                className=" p-[.4rem]"
                defaultValue={catagory}
                onChange={(e) => setCatagory(e.target.value)}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Fuel">Fuel</option>
                <option value="Movie">Movie</option>
                <option value="Dinner">Dinner</option>
              </select>
              <input
                type="number"
                placeholder="Expence Price"
                className=" p-[.4rem]"
                onChange={(e) => setExpencePrice(e.target.value)}
                value={expencePrice}
              />
              <div className=" flex justify-center items-center gap-2">
                <button
                  type="submit"
                  className="p-2  bg-red-300 text-black mt-2 rounded-md font-semibold w-1/2"
                  onClick={onAddingExpence}
                >
                  EXPENCE
                </button>
                <button
                  type="submit"
                  className="p-2 bg-green-400  mt-2 rounded-md text-white font-semibold w-1/2"
                  onClick={onAddingCredit}
                >
                  CREDIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpenceForm;
