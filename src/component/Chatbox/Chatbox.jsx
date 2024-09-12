import assets from "@/assets/Chat_App_Assets/assets/assets";

const Chatbox = () => {
  return (
    <div className="chat-box bg-gray-100 h-[75vh] relative ">
      <div className="chat-user  py-[10px] flex items-center gap-[10px] border-b-2 border-gray-400  px-[15px]">
        <img
          className="w-[38px] aspect-[1/1]  rounded-2xl"
          src={assets.profile_img}
          alt=""
        />
        <p className="font-semibold flex flex-1 text-gray-950 items-center gap-[5px]">
          Sahil Shaikh <img className="dot" src={assets.green_dot} alt="" />
        </p>
        <img className="w-[25px]" src={assets.help_icon} alt="" />
      </div>

        <div className="chat-message h-[calc(100%-70px)] pb-[50px] overflow-y-scroll flex flex-col-reverse ">
            <div className="s-msg flex items-end justify-end gap-[5px] px-[15px]">
                <p className="text-white p-[8px] max-w-[200px] bg-purple-400 mb-[30px] text-[11px] font-light rounded-xl rounded-br-none">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div className="text-center text-[9px]">
                    <img className="w-[27px] aspect-[1/1] rounded-[50px]" src={assets.profile_img} alt="" />
                    <p  >2:07 pm</p>
                </div>
            </div>


            <div className="s-msg flex items-end justify-end gap-[5px] px-[15px]">
                <img className="max-w-[230px] mb-[30px] rounded-md" src={assets.pic1}/>
                <div className="text-center text-[9px]">
                    <img className="w-[27px] aspect-[1/1] rounded-[50px]" src={assets.profile_img} alt="" />
                    <p  >2:07 pm</p>
                </div>
            </div>


            <div className="r-msg  flex flex-row-reverse items-end justify-end gap-[5px] px-[15px]">
                <p  className="text-white p-[8px] max-w-[200px] bg-purple-400 mb-[30px] text-[11px] font-light rounded-lg rounded-bl-none">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div className="text-center text-[9px]">
                    <img className="w-[27px] aspect-[1/1] rounded-[50px]" src={assets.profile_img} alt="" />
                    <p >2:10 pm</p>
                </div>
            </div>
        </div>









      <div className="chat-input flex items-center gap-[12px] py-[10px] px-[15px] bg-white bottom-0 left-0 right-0 absolute">
        <input
          className="flex-1 border-none outline-none placeholder:text-black"
          type="text"
          placeholder="Send a message"
        />
        <input
          className="flex-1 border-none "
          type="file"
          id="image"
          accept="image/jpeg , image/png "
          hidden
        />
        <label className="flex" htmlFor="image">
          <img className="w-[22px] cursor-pointer" src={assets.gallery_icon} />
        </label>
        <img className="w-[30px] cursor-pointer" src={assets.send_button} />
      </div>
    </div>
  );
};

export default Chatbox;
