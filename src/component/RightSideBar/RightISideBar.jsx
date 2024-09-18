import assets from "@/assets/Chat_App_Assets/assets/assets";
import { LogoutApp } from "@/config/firbase";
import { UserContext } from "@/Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const RightISideBar = () => {
  const{chatUser,messages,mediaVisible,setMediaVisible,setChatVisible,chatVisible} = useContext(UserContext)

  const [msgImage, setMsgImage] = useState([])
  useEffect(()=>{

    let tempVar = [];
    messages.map((msg)=>{
      if(msg.image){
        tempVar.push(msg.image)
      }
    })
    setMsgImage(tempVar)
  },[messages])

  return chatUser ?  (
    <div className={`rs sm:text-white    sm:bg-black  sm:relative sm:h-[75vh] sm:overflow-y-scroll  text-white   bg-black  relative h-[80vh] overflow-y-scroll ${mediaVisible?"":"hidden sm:block"} ${chatVisible?"":"hidden sm:block"}`}>
        <MdOutlineArrowForwardIos onClick={()=>setMediaVisible(false)} className="sm:hidden cursor-pointer font-extrabold text-[25px] m-[20px]"/>
      <div className="rs-profile sm:pt-[20px] sm:text-center sm:max-w-[70%] sm:items-center sm:justify-center sm:m-auto pt-[10px] text-center max-w-[70%] items-center justify-center m-auto ">
        <img className=" sm:w-[110px] sm:aspect-[1/1] sm:rounded-full sm:mx-auto w-[110px] aspect-[1/1] rounded-full mx-auto mb-[10px]" src={chatUser.userData.avatar} alt="" />
        <h3 className="sm:text-[18px] sm:text-center sm:font-semibold sm:flex sm:justify-center sm:items-center sm:gap-[5px] sm:my-[5px] sm:text-nowrap  capitalize text-center text-[20px]  flex justify-center items-center gap-[5px] my-[5px] text-nowrap  mb-[10px] font-bold">
        {chatUser.userData.name}{
            Date.now() - chatUser.userData.lastSeen <= 70000 ? <img className="dot" src={assets.green_dot} alt="" />:null
          }
        </h3>
        <p className="sm:text-[10px] sm:opacity-[80%] sm:font-semibold  opacity-[80%] text-[16px]   mb-[10px] font-bold">{chatUser.userData.bio}</p>
      </div>
      <hr className="sm:border-gray-400 sm:my-[15px] border-gray-400 my-[15px]"/>
      <div className="rs-media sm:px-[20px] sm:text-[13px] text-[16px] px-[20px] ">
        <p className="text-[12px]   mb-[10px] font-bold">Media</p>
        <div id="media-img" className="sm:max-h-[180px] sm:overflow-y-scroll sm:grid   sm:mt-[8px] sm:gap-[5px] max-h-[500px] overflow-y-scroll grid   mt-[8px] gap-[5px]">
          {
            msgImage.map((url,index)=>(
              <img key={index} onClick={()=>window.open(url)} src={url} className="w-[150px] rounded-sm cursor-pointer sm:w-[60px] sm:rounded-sm sm:cursor-pointer"/>
            ))
          }
        </div>
      </div>
      <button onClick={LogoutApp} className="sm:absolute sm:bottom-[20px] sm:left-[50%] sm:text-nowrap sm:translate-x-[-50%] sm:bg-purple-500 sm:text-white sm:border-none sm:text-[12px] sm:font-semibold sm:py-[5px] sm:px-[35px] sm:rounded-md sm:cursor-pointer absolute bottom-[20px] left-[50%] translate-x-[-50%] bg-purple-500 text-white border-none text-[12px] font-semibold py-[5px] px-[35px] rounded-md cursor-pointer">Log out</button>
    </div>
  ):(
    <div className={`sm:text-white  sm:bg-black  sm:relative sm:h-[75vh] sm:overflow-y-scroll text-white  bg-black  relative h-[75vh] overflow-y-scroll ${mediaVisible?"":"hidden sm:block"} ${chatVisible?"":"hidden sm:block"}`}>
      <button onClick={LogoutApp} className="sm:absolute sm:bottom-[20px] sm:left-[50%] sm:text-nowrap sm:translate-x-[-50%] sm:bg-purple-500 sm:text-white sm:border-none sm:text-[12px] sm:font-semibold sm:py-[5px] sm:px-[35px] sm:rounded-md sm:cursor-pointer absolute bottom-[20px] left-[50%] translate-x-[-50%] bg-purple-500 text-white border-none text-[12px] font-semibold py-[5px] px-[35px] rounded-md cursor-pointer">Log out</button>
    </div>
  )
};

export default RightISideBar;
