import assets from "@/assets/Chat_App_Assets/assets/assets";
import { db } from "@/config/firbase";
import { UserContext } from "@/Context/UserContext";
import upload from "@/lib/upload";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";


const Chatbox = () => {
  const {mediaVisible,setMediaVisible, userData, messages, setMessages, chatUser, messagesId ,setChatVisible,chatVisible } =
    useContext(UserContext);
  const [input, setInput] = useState("");

  // const [showChat, setShowChat] = useState(false)
  // if(window.innerWidth>639){
  //   setChatVisible(true)
  // }
  const sendImage = async (e) => {
    try {
      const fileUrl = await upload(e.target.files[0]);
      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: Date.now(),
          }),
        });
        const usersId = [chatUser.rId, userData.id];

        usersId.forEach(async (id) => {
          const chatsRef = doc(db, "chats", id);
          const chatsSnapshot = await getDoc(chatsRef);
          if (chatsSnapshot.exists()) {
            const userChatData = chatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = "image";
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId == userData.id) {
              userChatData.chatsData[chatIndex].lastSeen = false;
            }
            await updateDoc(chatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  ////////////////////////////////////////
  const convertTimeStamp = (timeStamp) => {
    // Check if timeStamp is valid
    if (!timeStamp) return "Invalid time";

    // Convert Unix timestamp (milliseconds) to Date object
    let date = new Date(timeStamp);

    let hour = date.getHours();
    let minute = date.getMinutes();

    // Add leading zero to minutes if needed
    minute = minute < 10 ? "0" + minute : minute;

    // Convert to 12-hour format
    if (hour > 12) {
      return hour - 12 + ":" + minute + " AM";
    } else {
      return hour + ":" + minute + " PM";
    }
  };

  useEffect(() => {
    if (!messagesId) {
      console.error("messagesId is null or undefined");
      return;
    }
    if (messagesId) {
      const unsub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        if (!res.exists()) {
          console.error("Document does not exist");
          return;
        }
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unsub();
      };
    }
  }, [messagesId]);

  const sendMessaage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: Date.now(),
          }),
        });
        const usersId = [chatUser.rId, userData.id];

        usersId.forEach(async (id) => {
          const chatsRef = doc(db, "chats", id);
          const chatsSnapshot = await getDoc(chatsRef);
          if (chatsSnapshot.exists()) {
            const userChatData = chatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId == userData.id) {
              userChatData.chatsData[chatIndex].lastSeen = false;
            }
            await updateDoc(chatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
    setInput("");
  };

  return chatUser ? (
    <div className={`chat-box sm:bg-gray-100 sm:h-[75vh] sm:relative bg-gray-100 h-[100vh] relative   ${chatVisible?"":"hidden sm:block"} ${mediaVisible?"hidden":""}  `}>
      <div className="chat-user sm:py-[10px] sm:flex sm:items-center sm:gap-[10px] sm:border-b-2 sm:border-gray-400 sm:px-[15px] py-[10px] flex items-center gap-[10px] border-b-2 border-gray-400 px-[15px]">
        <img
          className="sm:w-[38px] sm:aspect-[1/1] sm:rounded-2xl w-[38px] aspect-[1/1] rounded-2xl"
          src={chatUser.userData.avatar}
          alt=""
        />
        <p className="sm:font-semibold sm:flex sm:flex-1 sm:text-gray-950 sm:items-center sm:gap-[5px] font-semibold flex flex-1 text-gray-950 items-center gap-[5px]">
          {chatUser.userData.username}{" "}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img className="sm:dot dot" src={assets.green_dot} alt="" />
          ) : null}
        </p>
        <img onClick={()=>setMediaVisible(true)} className="sm:w-[25px] w-[25px]" src={assets.help_icon} alt="" />
        <MdArrowForwardIos onClick={()=>setChatVisible(false)} className="cursor-pointer font-extrabold text-[25px] sm:hidden"/>
      </div>

      <div className="chat-message sm:h-[calc(100%-70px)] sm:pb-[50px] sm:overflow-y-scroll sm:flex sm:flex-col-reverse h-[calc(100%-70px)] pb-[50px] overflow-y-scroll flex flex-col-reverse">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                msg.sId === userData.id
                  ? "s-msg sm:flex sm:items-end sm:justify-end sm:gap-[5px] sm:px-[15px] flex items-end justify-end gap-[5px] px-[15px]"
                  : "r-msg sm:flex sm:flex-row-reverse sm:items-end sm:justify-end sm:gap-[5px] sm:px-[15px] flex flex-row-reverse items-end justify-end gap-[5px] px-[15px]"
              }
            >
              {msg["image"] ? (
                <img className="sm:w-[200px] sm:border-2 sm:h-[230px] w-[250px] border-2 h-[200px] mb-[20px]" src={msg.image} />
              ) : (
                <p
                  className={`sm:text-white sm:p-[8px] sm:max-w-[200px] sm:mb-[30px] sm:text-[11px] sm:font-light sm:rounded-lg  text-white p-[8px] max-w-[200px] mb-[30px] gap-[20px] text-[11px] font-light rounded-lg ${
                    msg.sId === userData.id
                      ? "sm:bg-purple-400 sm:rounded-br-none bg-purple-400 rounded-br-none"
                      : "sm:bg-purple-400 sm:rounded-bl-none bg-purple-400 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <div className="sm:text-center sm:text-[9px] text-center text-[9px]">
                <img
                  className="sm:w-[27px] sm:aspect-[1/1] sm:rounded-[50px] w-[27px] aspect-[1/1] rounded-[50px]"
                  src={
                    msg.sId === userData.id
                      ? userData.avatar
                      : chatUser.userData.avatar
                  }
                  alt=""
                />
                <p>{convertTimeStamp(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input sm:flex sm:items-center sm:gap-[12px] sm:py-[10px] sm:px-[15px] sm:bg-white sm:bottom-0 sm:left-0 sm:right-0 sm:absolute flex items-center gap-[12px] py-[10px] px-[15px] bg-white bottom-0 left-0 right-0 absolute">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="sm:flex-1 sm:border-none sm:outline-none sm:placeholder:text-black flex-1 border-none outline-none placeholder:text-black"
          type="text"
          placeholder="Send a message"
        />
        <input
          onChange={sendImage}
          className="sm:flex-1 sm:border-none flex-1 border-none"
          type="file"
          id="image"
          accept="image/jpeg , image/png "
          hidden
        />
        <label className="sm:flex flex" htmlFor="image">
          <img className="sm:w-[22px] sm:cursor-pointer w-[22px] cursor-pointer" src={assets.gallery_icon} />
        </label>
        <img
          onClick={sendMessaage}
          className="sm:w-[30px] sm:cursor-pointer w-[30px] cursor-pointer"
          src={assets.send_button}
        />
      </div>
    </div>
  ) : (
    <div className={`sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-[5px] sm:bg-gray-200 w-full flex flex-col justify-center items-center gap-[5px] bg-gray-200 ${mediaVisible?"hidden":""} ${chatVisible?"":"hidden"}`}>
      <img className="sm:w-[60px] w-[60px]" src={assets.logo_icon} alt="" />
      <p className="sm:text-[20px] sm:font-semibold sm:text-gray-900 text-[20px] font-semibold text-gray-900">
        chat anytime any where
      </p>
    </div>
  );
};

export default Chatbox;
