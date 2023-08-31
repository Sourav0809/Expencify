const Expences = (props) => {
  return (
    <div className=" flex flex-col ">
      <div className="flex gap-2">
        <h4 className=" text-lg font-semibold">{props.expenceDate}</h4>
        <p className=" text-base pt-[0.3rem]">{props.expenceDay}</p>
      </div>
      <div
        className={`${
          props.isExpence ? "bg-red-300" : "bg-[#c5f976]"
        } px-4 py-2 rounded-md`}
      >
        <div className=" flex justify-between items-center text-lg font-bold font-popins">
          <h4>
            {props.expenceName + " "}
            <span className=" text-sm font-normal">
              / {" " + props.catagory}
            </span>
          </h4>
          <h4>${props.expencePrice}</h4>
        </div>
        <div>
          <h4 className=" text-sm">{props.expenceDate}</h4>
        </div>
        <div className="text-sm">
          <h4>{props.expenceTime}</h4>
        </div>
      </div>
    </div>
  );
};

export default Expences;
