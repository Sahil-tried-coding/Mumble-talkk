import "./Simmar.css";
import logo_op from "../../assets_op//Picsart_24-09-16_13-35-58-618.png";

const Shimmar = () => {
  return (
    <div className="container flex flex-col gap-[40px] items-center justify-center w-[75%] min-w-[600px] h-[65vh] overflow-hidden bg-gray-800 sm:flex sm:items-center sm:justify-center sm:w-[95%] sm:min-w-[600px] sm:h-[75vh] sm:bg-gray-800">
      <img src={logo_op} className="sm:hidden w-[260px]" alt="Logo" />
      <div className="loader"></div>
    </div>
  );
};

export default Shimmar;
