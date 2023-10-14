import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import Expences from "./UI/Expences";
import { useState } from "react";
import AddExpenceForm from "./UI/AddExpenceForm";
import PageLoader from "../UI/Loader/PageLoader";
import EditExpenceForm from "./UI/EditExpenceForm";
import { useDispatch, useSelector } from "react-redux";
import { editExpence } from "../../store/actions/expencesAction";
import searchExpences from "../../Functions/searchExpences";

const ExpencesContainer = () => {
  const [addExpence, setViewAddExpence] = useState(false);
  const { darkMode } = useSelector((state) => state.darkMode);
  const [viewEditExpence, setViewEditExpence] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const expenceList = useSelector((state) => state.expences.expences);

  const { loader } = useSelector((state) => state.expences);

  /* -------------------------------------------------------------------------- */
  /*                               On Expence Edit                              */
  /* -------------------------------------------------------------------------- */
  const onExpenceEdit = (id) => {
    if (id) {
      setViewEditExpence(true);
      dispatch(editExpence(id));
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                     Calculating Total Expence & Credit                     */
  /* -------------------------------------------------------------------------- */
  let calExpence = 0;
  let calCredit = 0;
  expenceList.forEach((val) => {
    if (val.isExpence) {
      calExpence += Number(val.expencePrice);
    }
    if (!val.isExpence) {
      calCredit += Number(val.expencePrice);
    }
  });

  // To reduce the newtwork call we can directly filtered

  const filteredExpence = searchExpences(searchValue, expenceList);

  return (
    <>
      {loader && PageLoader}
      {addExpence && !loader && !viewEditExpence && (
        <AddExpenceForm
          hideAddExpence={() => {
            setViewAddExpence(false);
          }}
        />
      )}
      {viewEditExpence && !addExpence && !loader && (
        <EditExpenceForm
          hideEditExpence={() => {
            setViewEditExpence(false);
          }}
        />
      )}
      <div className="  m-auto mt-5 w-[100%] px-6 pl-16 md:w-[50rem] md:px-0 md:pl-0  ">
        <div className="p-5">
          <div>
            <h1
              className=" font-mono
   font-bold text-3xl"
            >
              Transactions
            </h1>
          </div>
          <div
            className={`mt-2 flex justify-start items-center gap-1 ${
              darkMode && "text-black"
            } `}
          >
            <div className="w-[65%] md:w-[80%] bg-yellow-200 flex justify-center items-center rounded-md">
              <div className=" flex justify-center items-center p-2">
                <AiOutlineSearch />
              </div>
              <input
                type="text"
                placeholder="Search.."
                className=" bg-yellow-200 w-full  py-[0.2rem] border-none outline-none"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            <div className="w-[30%] md:w-[20%]">
              <input
                type="date"
                placeholder="DD-MM-YYYY"
                className=" border border-black w-full px-2 py-[0.2rem] rounded-md"
              />
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                            TOTAL PRICE CONTAINER                           */
          /* -------------------------------------------------------------------------- */}
          <div className=" flex  justify-between items-center font-semibold font-mono text-2xl p-5">
            <div className=" flex justify-center items-center">
              <h1>TOTAL</h1>
            </div>
            <div className=" flex justify-center items-center gap-4">
              <h1 className="text-red-600">&#x20B9;{calExpence}</h1>
              <h1 className=" text-green-600">&#x20B9;{calCredit}</h1>
            </div>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                         ADDED EXPENCES CONTAINER                            */
          /* -------------------------------------------------------------------------- */}
          <div className=" flex flex-col gap-[0.5rem] ">
            {expenceList.length === 0 && (
              <h1 className=" text-center mt-16 text-xl">No Expences !!</h1>
            )}
            {filteredExpence.map((val) => {
              return (
                <Expences
                  expenceName={val.expenceName}
                  expenceDate={val.expenceDate}
                  expenceDay={val.expenceDay}
                  catagory={val.catagory}
                  expencePrice={val.expencePrice}
                  key={val.id}
                  id={val.id}
                  expenceTime={val.expenceTime}
                  isExpence={val.isExpence}
                  onClick={onExpenceEdit}
                />
              );
            })}
          </div>

          <div className=" fixed md:right-[20vw] right-[10vw] bottom-[20vh]">
            <MdOutlineAddCircle
              className={` text-5xl text-red-400 fill-indigo-900 bg-white rounded-[50%] cursor-pointer ${
                darkMode && " text-white"
              }`}
              onClick={() => setViewAddExpence(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpencesContainer;
