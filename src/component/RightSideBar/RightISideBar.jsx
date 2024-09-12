import assets from "@/assets/Chat_App_Assets/assets/assets";
import { LogoutApp } from "@/config/firbase";

const RightISideBar = () => {
  return (
    <div className="rs text-white bg-black  relative h-[75vh] overflow-y-scroll ">
      <div className="rs-profile pt-[20px] text-center max-w-[70%] items-center justify-center m-auto">
        <img className="w-[110px] aspect-[1/1] rounded-full mx-auto" src={assets.profile_img} alt="" />
        <h3 className="text-[18px] text-center font-semibold flex justify-center items-center gap-[5px] my-[5px] text-nowrap">
          Harshada suryvainsh <img src={assets.green_dot} alt="" />
        </h3>
        <p className="text-[10px] opacity-[80%] font-light">Hey i am harshada using mumble talk</p>
      </div>
      <hr className="border-gray-400 my-[15px]"/>
      <div className="rs-media px-[20px] text-[13px]">
        <p>Media</p>
        <div id="media-img" className="max-h-[180px] overflow-y-scroll grid   mt-[8px] gap-[5px]">
          <img className="w-[60px] rounded-sm cursor-pointer" src={assets.pic1} alt="" />
          <img className="w-[60px] rounded-sm cursor-pointer" src={assets.pic2} alt="" />
          <img className="w-[60px] rounded-sm cursor-pointer" src={assets.pic3} alt="" />
          <img className="w-[60px] rounded-sm cursor-pointer" src={assets.pic4} alt="" />
          <img className="w-[60px] rounded-sm cursor-pointer" src={assets.pic1} alt="" />
          <img className="w-[60px] rounded-sm cursor-pointer" src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={LogoutApp} className="absolute bottom-[20px] left-[50%] translate-x-[-50%] bg-purple-500 text-white border-none text-[12px] font-semibold py-[5px] px-[35px] rounded-md cursor-pointer">Log out</button>
    </div>
  );
};

export default RightISideBar;
