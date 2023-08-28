import axios from "axios";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
const UserProfle = () => {
  // following state to manage user input
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const onNameChangeHandeler = (e) => {
    setName(e.target.value);
  };
  const onMobileChangeHandeler = (e) => {
    setMobileNumber(e.target.value);
  };

  // when user update the profile section
  const onUserSubmit = async () => {
    const idToken = localStorage.getItem("idToken");
    const submitedData = {
      idToken: idToken,
      displayName: name,
      mobile: mobileNumber,
    };

    const submitRes = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
      submitedData
    );
    console.log(submitRes);
  };

  return (
    <div>
      {/* {welcome text container } */}

      <div className=" mt-32 text-4xl font-popins font-bold text-center ">
        WELCOME
      </div>

      {/* user icon container  */}

      <div className=" mt-6 flex justify-center items-center">
        <FaUserCircle className=" text-8xl text-gray-400" />
      </div>

      <div className=" mt-7 p-7 w-full md:w-[60rem]  text-black m-auto">
        <div className=" p-2 flex flex-col gap-2">
          <div className=" flex flex-col ">
            <label htmlFor="name" className=" text-lg">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name ..."
              className="p-2 bg-[#e0e0e0] rounded-md "
              onChange={onNameChangeHandeler}
              value={name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className=" text-lg">
              Mobile Number
            </label>
            <input
              type="number"
              placeholder="Enter Your Number ..."
              className="p-2 bg-[#e0e0e0]  rounded-md"
              onChange={onMobileChangeHandeler}
              value={mobileNumber}
            />
          </div>
          <div className="flex justify-end items-end">
            <button
              className=" mt-3 py-2 bg-[#1877f2] md:w-[15%] w-full font-semibold text-white rounded-md"
              onClick={onUserSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfle;
