import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const DashBoard = () => {
  const { expences } = useSelector((state) => state.expences);
  console.log(expences);
  // Separate expenses into two arrays based on 'isExpence' property
  const isExpenceArray = [];
  const isNotExpenceArray = [];

  expences.forEach((expense) => {
    if (expense.isExpence) {
      const existingExpense = isExpenceArray.find(
        (e) => e.expenceDate === expense.expenceDate
      );
      if (existingExpense) {
        existingExpense.expencePrice += expense.expencePrice;
      } else {
        isExpenceArray.push({
          expenceDate: expense.expenceDate,
          expencePrice: expense.expencePrice,
        });
      }
    } else {
      isNotExpenceArray.push(expense);
    }
  });

  // console.log("Is Expence Array:", isExpenceArray);
  // console.log("Is Not Expence Array:", isNotExpenceArray);

  const expencePriceArr = [];
  const expenceDateArr = [];
  const creditPriceArr = [];
  const creditDateArr = [];

  isExpenceArray.forEach((val) => {
    expenceDateArr.push(val.expenceDate);
    expencePriceArr.push(val.expencePrice);
  });

  isNotExpenceArray.forEach((val) => {
    creditDateArr.push(val.expenceDate);
    creditPriceArr.push(val.expencePrice);
  });

  /* -------------------------------------------------------------------------- */
  /*                         For visulaize the Expences                         */
  /* -------------------------------------------------------------------------- */
  const userExpence = {
    labels: expenceDateArr,
    datasets: [
      {
        label: "TOTAL EXPENCES",
        data: expencePriceArr,
        backgroundColor: ["red"],
        borderColor: ["red"],
      },
    ],
  };

  /* -------------------------------------------------------------------------- */
  /*                          For Visualize the credits                         */
  /* -------------------------------------------------------------------------- */

  const userCredit = {
    labels: creditDateArr,
    datasets: [
      {
        label: "TOTAL CREDITS",
        data: creditPriceArr,
        backgroundColor: ["green"],
        borderColor: ["green"],
      },
    ],
  };
  console.log(userCredit);

  return (
    <div className=" mt-5 flex flex-col gap-5">
      <div className="md:w-[60rem] w-full h-[25rem] m-auto pl-[3.8rem] border shadow-md flex justify-center items-center">
        <Bar data={userExpence} options={{}} className=" w-full p-6" />
      </div>
      <div className="md:w-[60rem] w-full h-[25rem] m-auto pl-[3.8rem] border shadow-md flex justify-center items-center">
        <Bar data={userCredit} options={{}} className=" w-full p-6" />
      </div>
    </div>
  );
};

export default DashBoard;
