import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PageLoader from "../../UI/Loader/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../store/actions/userProfileAction";
import formatEmail from "../../../Functions/formatEmail";
import toast from "react-hot-toast";
const UserProfle = () => {
  const [loaderScreen, setLoaderScreen] = useState(true);
  // following state to manage user input
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const setUserDetails = useDispatch();
  const { userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    const updateUserProfile = async (idToken) => {
      if (idToken) {
        try {
          const { data } = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
            { idToken: idToken }
          );

          // for getting the userdetails that store in the database
          const getUserDetails = await axios.get(
            `https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
              userEmail
            )}/UserInfo.json`
          );
          if (getUserDetails.data) {
            const userMobile = Object.values(getUserDetails.data)[0].mobile;

            // Also need update user Profile if user refresh the page
            const userProfileDetails = {
              idToken: data.users[0].localId,
              displayName: data.users[0].displayName,
              mobile: userMobile,
              email: userEmail,
              emailVerified: data.users[0].emailVerified,
            };

            // storing the user details in the redux store
            if (data.users[0].displayName) {
              setUserDetails(userProfileAction.setUserInfo(userProfileDetails));
            }
          }
        } catch (error) {
          toast.error(" Error Occurred !");
        }
      }
      setLoaderScreen(false);
    };

    updateUserProfile(idToken);
  }, []);

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
      email: userEmail,
      emailVerified: false,
    };

    try {
      setLoaderScreen(true);
      const { data } = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
        submitedData
      );

      const storeUserInfo = await axios.post(
        `https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
          userEmail
        )}/UserInfo/.json`,
        submitedData
      );

      setUserDetails(userProfileAction.setUserInfo(submitedData));
      toast.success("User Profile Updated");
    } catch (error) {
      toast.error(" Error Occurred !");
    }
    setLoaderScreen(false);
  };

  return (
    <div>
      {loaderScreen ? (
        PageLoader
      ) : (
        <div>
          {/* {welcome text container } */}

          <div className=" mt-32 text-4xl font-popins font-bold text-center ">
            WELCOME
          </div>

          {/* user icon container  */}

          <div className=" mt-6 flex justify-center items-center">
            <FaUserCircle className=" text-8xl text-gray-400" />
          </div>

          <div className=" mt-7 p-7 w-full md:w-[50rem]  text-black m-auto">
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
                  {loaderScreen ? Loader : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfle;
