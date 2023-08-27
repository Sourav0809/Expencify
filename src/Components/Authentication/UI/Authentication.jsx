import { FcGoogle } from "react-icons/fc";
const Authentication = () => {
  return (
    <div className=" font-popins">
      <h1 className=" text-4xl p-6 mt-4 font-semibold ">expencyFi</h1>
      <div className=" m-auto mt-28 lg:w-[80rem] w-full">
        <div className=" p-7 flex flex-col gap-3">
          <div>
            <h1 className=" text-5xl font-bold  ">Create Account</h1>
          </div>

          <div className=" mt-5">
            <button className=" w-[100%] bg-[#e0e0e0] rounded-md p-1 text-black text-lg flex gap-1 justify-center items-center ">
              <h1 className=" text-base">Connect With</h1>
              <FcGoogle className=" text-4xl" />
            </button>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Your E-mail..."
              className=" bg-[#e0e0e0] p-2 rounded-md"
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password..."
              className=" bg-[#e0e0e0] p-2 rounded-md"
            />
          </div>

          <div className=" mt-5">
            <button className=" py-2 px-10 bg-[#1877f2] font-semibold text-white rounded-md">
              Sign Up
            </button>
          </div>

          <div className=" mt-5">
            <h1>Already have an account?</h1>
            <h1 className="text-[#1877f2] text-lg font-medium cursor-pointer font-sans">
              Sign In
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
