import { useState } from "react";
import expenceCtx from "./ExpenceCtx";
import axios from "axios";

const ExpenceCtxProvider = (props) => {
  const [expenceList, setExpenceList] = useState([]);

  const onAddExpence = async (expence) => {
    try {
      const storedExpence = await axios.post(
        "https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences.json",
        expence
      );

      console.log(storedExpence);
      setExpenceList((prev) => {
        return [expence, ...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const expenceCtxValues = {
    onAddExpence: onAddExpence,
    expenceList: expenceList,
    setExpenceList: setExpenceList,
  };

  return (
    <expenceCtx.Provider value={expenceCtxValues}>
      {props.children}
    </expenceCtx.Provider>
  );
};

export default ExpenceCtxProvider;
