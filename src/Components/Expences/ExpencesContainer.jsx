import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import Expences from "./UI/Expences";
import { useContext, useEffect, useState } from "react";
import AddExpenceForm from "./UI/AddExpenceForm";
import expenceCtx from "../../Context/ExpenceContext/ExpenceCtx";
import axios from "axios";

const ExpencesContainer = () => {
  const [addExpence, setViewAddExpence] = useState(false);
  const { expenceList, setExpenceList } = useContext(expenceCtx);

  /* -------------------------------------------------------------------------- */
  /*                     On page Refresh                                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchExpences = async () => {
      try {
        const { data } = await axios.get(
          "https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences.json"
        );
        setExpenceList(Object.values(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpences();
  }, []);

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

  return (
    <>
      {addExpence && (
        <AddExpenceForm
          hideAddExpence={() => {
            setViewAddExpence(false);
          }}
        />
      )}
      <div className="  m-auto mt-5 w-[100%] px-6 pl-16 md:w-[50rem] md:px-0 md:pl-0  ">
        <div className="p-3">
          <div>
            <h1
              className=" font-mono
   font-bold text-3xl"
            >
              Transactions
            </h1>
          </div>
          <div className=" mt-2 flex justify-start items-center gap-1 ">
            <div className="w-[65%] md:w-[80%] bg-yellow-200 flex justify-center items-center rounded-md">
              <div className=" flex justify-center items-center p-2">
                <AiOutlineSearch />
              </div>
              <input
                type="text"
                placeholder="Search.."
                className=" bg-yellow-200 w-full  py-[0.2rem] border-none outline-none"
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
          <div className="   flex justify-between items-center font-semibold font-mono text-2xl p-5">
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
            {expenceList.map((val) => {
              return (
                <Expences
                  expenceName={val.expenceName}
                  expenceDate={val.expenceDate}
                  expenceDay={val.expenceDay}
                  catagory={val.catagory}
                  expencePrice={val.expencePrice}
                  key={val.id}
                  expenceTime={val.expenceTime}
                  isExpence={val.isExpence}
                />
              );
            })}
          </div>

          <div className=" absolute bottom-[10vh] right-[10vw]">
            <MdOutlineAddCircle
              className=" text-5xl text-red-400 cursor-pointer"
              onClick={() => setViewAddExpence(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpencesContainer;
