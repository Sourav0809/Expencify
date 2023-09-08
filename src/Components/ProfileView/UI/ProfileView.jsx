import axios from "axios";
import { BiSolidUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setVip, fetchVip } from "../../../store/actions//vipUserAction";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const ProfileView = () => {
  const userProfile = useSelector((state) => state.userProfile.userInfo);
  const userExpences = useSelector((state) => state.expences.expences);
  const { expences } = useSelector((state) => state.expences);
  const dispatch = useDispatch();
  const { isVip } = useSelector((state) => state.vipUser);
  console.log(isVip);
  // console.log(userExpences);

  // if the user refrest the page

  useEffect(() => {
    dispatch(fetchVip());
  }, []);

  const verifyEmailHandeler = async () => {
    const idToken = localStorage.getItem("idToken");
    try {
      const validationRes = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
        { requestType: "VERIFY_EMAIL", idToken: idToken }
      );
      toast.success("Verfication Link Sent !");
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  // seting the user to vip
  const setUserToVip = () => {
    let totalexpence = 0;

    expences.forEach((val) => {
      totalexpence += Number(val.expencePrice);
    });

    if (totalexpence >= 10000) {
      dispatch(setVip());
    } else {
      alert("Your Total Expence and Credit Must be 10000 or Above");
    }
  };

  // for csv format download
  const headers = [
    { label: "Is It Expence", key: "isExpence" },
    { label: "Expence Name", key: "expenceName" },
    { label: "Expence Date", key: "expenceDate" },
    { label: "Expence Day", key: "expenceDay" },
    { label: "Expence Time", key: "expenceTime" },
    { label: "Expence Price", key: "expencePrice" },
  ];

  return (
    <div className=" pl-[3.4rem]">
      <div className=" w-[95%] p-3  md:w-[45rem] border m-auto mt-20 text-center shadow-md">
        <h2 className="text-4xl text-blue-950 font-popins font-bold mt-6">
          Your Account
        </h2>

        <div className=" flex justify-center item-center mt-2">
          <BiSolidUserCircle className=" text-[8rem] text-blue-900" />
        </div>

        <div className=" w-full p-5 flex flex-col gap-2">
          <input
            disabled
            value={userProfile.displayName}
            className="w-full p-2 rounded-sm bg-[#9bddc2]"
          />
          <input
            disabled
            value={userProfile.email}
            className="w-full p-2 rounded-sm bg-[#9bddc2]"
          />
          <input
            disabled
            value={userProfile.mobile}
            className="w-full p-2 rounded-sm bg-[#9bddc2]"
          />
          <input
            disabled
            value="**********"
            className="w-full p-2 rounded-sm  bg-[#9bddc2]"
          />
          <div className=" flex justify-center item-center gap-2">
            {userProfile.emailVerified ? (
              <button
                disabled
                className="mt-3 py-2 bg-[#565be9d0] md:w-[100%] w-full font-semibold text-white rounded-sm"
              >
                Verfied User
              </button>
            ) : (
              <button
                onClick={verifyEmailHandeler}
                className="mt-3 py-2 bg-[#565be9d0] md:w-[100%] w-full font-semibold text-white rounded-sm"
              >
                Verfiy Email
              </button>
            )}
          </div>

          <div className=" mb-7">
            <h1 className=" text-base font-semibold">
              {userProfile.emailVerified
                ? "Your Account is Verified"
                : "Verify your account to use 100% of our app"}
            </h1>
            {isVip ? (
              <div className=" mt-2 font-bold bg-[#469170] px-4 py-2 rounded-sm text-white">
                <CSVLink data={userExpences} headers={headers}>
                  Download Expences
                </CSVLink>
              </div>
            ) : (
              <button className=" mt-2 font-bold " onClick={setUserToVip}>
                Unlock VIP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
