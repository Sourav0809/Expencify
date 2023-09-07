import axios from "axios";
import { BiSolidUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";
const ProfileView = () => {
  const userProfile = useSelector((state) => state.userProfile.userInfo);
  console.log(userProfile);
  const [isVip, setIsVip] = useState(false);

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
              <button className=" mt-2 font-bold bg-[#469170] px-4 py-2 rounded-sm text-white">
                Download Expences
              </button>
            ) : (
              <button className=" mt-2 font-bold ">Unlock VIP</button>
            )}
          </div>
        </div>
      </div>
      s
    </div>
  );
};

export default ProfileView;
