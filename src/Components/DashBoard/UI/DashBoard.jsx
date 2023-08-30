import axios from "axios";
import Button from "../../UI/Button/Button";

const DashBoard = () => {
  const verifyEmailHandeler = async () => {
    console.log("hellp");
    const idToken = localStorage.getItem("idToken");
    try {
      const validationRes = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
        { requestType: "VERIFY_EMAIL", idToken: idToken }
      );
      console.log(validationRes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" mt-36 text-center text-5xl">DashBoard</div>;
      <div className=" flex justify-center items-center">
        <Button>
          <span onClick={verifyEmailHandeler}>Verify Email</span>
        </Button>
      </div>
    </div>
  );
};

export default DashBoard;
