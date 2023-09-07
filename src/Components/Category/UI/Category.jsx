const Category = (props) => {
  return (
    <div className=" bg-gray-200  px-5 py-1 flex justify-between items-center text-xl">
      <h1>{props.category}</h1>
      <h1 className=" font-bold cursor-pointer">X</h1>
    </div>
  );
};

export default Category;
