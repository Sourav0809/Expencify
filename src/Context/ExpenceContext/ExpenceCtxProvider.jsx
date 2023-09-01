import { useState } from "react";
import expenceCtx from "./ExpenceCtx";
import axios from "axios";

const ExpenceCtxProvider = (props) => {
  const [expenceList, setExpenceList] = useState([]);
  const [editedExpenceName, setEditedExpenceName] = useState("");
  const [editedexpencePrice, setEditedExpencePrice] = useState("");
  const [editedExpenceDate, setEditedExpenceDate] = useState("");
  const [editedExpenceTime, setEditedExpenceTime] = useState("");
  const [editedExpenceid, setEditedExpenceid] = useState("");
  const [editedCatagory, setEditedCatagory] = useState("");
  const [defaultFirebaseId, setDefaultFirebaseId] = useState("");
  const onAddExpence = async (expence) => {
    try {
      const data = await axios.post(
        "https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences.json",
        expence
      );
      const newExpenceObj = { firebaseId: data.name, ...expence };
      setExpenceList((prev) => {
        return [newExpenceObj, ...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onEditExpence = (id) => {
    expenceList.forEach((expence) => {
      if (expence.id === id) {
        setEditedExpenceName(expence.expenceName);
        setEditedExpencePrice(expence.expencePrice);
        setEditedExpenceTime(expence.expenceTime);
        setEditedExpenceDate(expence.expenceDate);
        setEditedCatagory(expence.catagory);
        setEditedExpenceid(id);
        setDefaultFirebaseId(expence.firebaseId);
      }
    });
  };

  const editedExpencesVal = {
    expenceName: editedExpenceName,
    expencePrice: editedexpencePrice,
    expenceDate: editedExpenceDate,
    expenceTime: editedExpenceTime,
    catagory: editedCatagory,
    expenceId: editedExpenceid,
    firebaseId: defaultFirebaseId,
  };

  const expenceCtxValues = {
    onAddExpence: onAddExpence,
    expenceList: expenceList,
    setExpenceList: setExpenceList,
    onEditExpence: onEditExpence,
    editedExpencesVal: editedExpencesVal,
  };

  return (
    <expenceCtx.Provider value={expenceCtxValues}>
      {props.children}
    </expenceCtx.Provider>
  );
};

export default ExpenceCtxProvider;
