import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import { ImCross } from "react-icons/im";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEditedExpence } from "../../../store/actions/expencesAction";
import Loader from "../../UI/Loader/Loader";

const EditExpenceForm = (props) => {
  // geting the edited expence values from store
  const { editedExpences, expences } = useSelector((state) => state.expences);

  // setting those values as an intial value
  const [expenceName, setExpenceName] = useState(editedExpences.expenceName);
  const [expencePrice, setExpencePrice] = useState(editedExpences.expencePrice);
  const [expenceDate, setExpenceDate] = useState(editedExpences.expenceDate);
  const [expenceTime, setExpenceTime] = useState(editedExpences.expenceTime);
  const [catagory, setCatagory] = useState(editedExpences.catagory);
  const [loaderScreen, setloaderScreen] = useState(false);
  const dispatch = useDispatch();

  /* -------------------------------------------------------------------------- */
  /*                           On editing a new Expence                          */
  /* -------------------------------------------------------------------------- */

  const onEditingExpence = async (e) => {
    e.preventDefault();

    // first update into server
    const updatedExpence = {
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

    try {
      if (expenceName && expenceDate && expencePrice && expenceTime) {
        setloaderScreen(true);

        const updatedRes = await axios.patch(
          `https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences/${editedExpences.firebaseId}.json`,
          updatedExpence
        );

        // updating in ui
        const editedExpenceArr = JSON.parse(JSON.stringify(expences)).map(
          (val) => {
            if (val.id === editedExpences.id) {
              val.expenceName = expenceName;
              val.expencePrice = expencePrice;
              val.isExpence = true;
              val.id = editedExpences.id;
              val.expenceDate = expenceDate;
              val.expenceTime = expenceTime;
              val.expenceDay = new Date(expenceDate).toLocaleString("en-US", {
                weekday: "long",
              });
              val.catagory = catagory;
            }
            return val;
          }
        );
        console.log(editedExpenceArr);
        dispatch(setEditedExpence(editedExpenceArr));
        props.hideEditExpence();
      }
    } catch (error) {
      console.log(error);
    }
    setloaderScreen(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                           On Editing a new Credit                           */
  /* -------------------------------------------------------------------------- */

  const onEditingCredit = async (e) => {
    e.preventDefault();

    // first update into server
    const updatedExpence = {
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

    try {
      if (expenceName && expenceDate && expencePrice && expenceTime) {
        setloaderScreen(true);
        const updatedRes = await axios.patch(
          `https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences/${editedExpences.firebaseId}.json`,
          updatedExpence
        );
        console.log(updatedRes);

        // updating in ui
        const editedExpenceArr = JSON.parse(JSON.stringify(expences)).map(
          (val) => {
            if (val.id === editedExpences.id) {
              val.expenceName = expenceName;
              val.expencePrice = expencePrice;
              val.isExpence = false;
              val.id = editedExpences.id;
              val.expenceDate = expenceDate;
              val.expenceTime = expenceTime;
              val.expenceDay = new Date(expenceDate).toLocaleString("en-US", {
                weekday: "long",
              });
              val.catagory = catagory;
            }
            return val;
          }
        );
        dispatch(setEditedExpence(editedExpenceArr));
        props.hideEditExpence();
      }
    } catch (error) {
      console.log(error);
    }
    setloaderScreen(false);
  };
  // /* -------------------------------------------------------------------------- */
  // /*                            To Delete The Expence                           */
  // /* -------------------------------------------------------------------------- */

  const deleteExpenceHandeler = async (e) => {
    e.preventDefault();
    try {
      const deletedRes = await axios.delete(
        `https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences/${editedExpences.firebaseId}.json`
      );

      const filterarr = expences.filter((val) => {
        return val.id !== editedExpences.id;
      });

      dispatch(setEditedExpence(filterarr));

      props.hideEditExpence();
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <Modal>
      <div className="  bg-blue-200 rounded-lg shadow-md w-[25rem] h-[27rem]">
        <div className=" flex justify-end items-end">
          <div
            className="bg-gray-500 inline-block p-3 rounded-tr-md rounded-bl-md cursor-pointer "
            onClick={props.hideEditExpence}
          >
            <ImCross className=" text-white" />
          </div>
        </div>

        <div className=" p-7">
          <div>
            <h1 className=" text-center font-semibold text-2xl font-popins">
              Edit Transaction
            </h1>
          </div>

          <div className=" mt-3 ">
            <form className="flex flex-col w-full gap-2">
              <input
                type="text"
                placeholder="Expence Name"
                className=" p-[.4rem] "
                onChange={(e) => {
                  setExpenceName(e.target.value);
                }}
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
                {!loaderScreen && (
                  <>
                    <button
                      type="submit"
                      className="p-2  bg-red-300 text-black mt-2 rounded-md font-semibold w-1/2"
                      onClick={onEditingExpence}
                    >
                      EXPENCE
                    </button>
                    <button
                      type="submit"
                      className="p-2 bg-green-400  mt-2 rounded-md text-white font-semibold w-1/2"
                      onClick={onEditingCredit}
                    >
                      CREDIT
                    </button>
                  </>
                )}
              </div>
              {loaderScreen && <div className=" mt-10 text-9xl">{Loader}</div>}
              <div>
                {!loaderScreen && (
                  <button
                    className="p-2 flex justify-center items-center  bg-red-500 text-white mt-2 rounded-md text-2xl font-bold w-full"
                    onClick={deleteExpenceHandeler}
                  >
                    <AiTwotoneDelete className=" text-white " />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenceForm;
