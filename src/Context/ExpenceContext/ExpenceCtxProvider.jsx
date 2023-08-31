import { useState } from "react";
import expenceCtx from "./ExpenceCtx";

const ExpenceCtxProvider = (props) => {
  const [expenceList, setExpenceList] = useState([]);

  const onAddExpence = (expence) => {
    setExpenceList((prev) => {
      return [expence, ...prev];
    });
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
