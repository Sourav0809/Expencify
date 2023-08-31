import ReactDOM from "react-dom";
const Overlay = (props) => {
  return <div className="">{props.children}</div>;
};

const Wrapper = (props) => {
  return (
    <div className=" bg-[#0000089c] w-screen h-screen fixed flex justify-center items-center top-0 z-10 ">
      <Overlay>{props.children}</Overlay>
    </div>
  );
};

const ModalOverlay = document.getElementById("modaloverlays");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Wrapper>{props.children}</Wrapper>, ModalOverlay)}
    </>
  );
};

export default Modal;
