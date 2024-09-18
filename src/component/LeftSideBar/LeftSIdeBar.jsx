import assets from "@/assets/Chat_App_Assets/assets/assets";
import { db, LogoutApp } from "@/config/firbase";
import "../Shimmar/Simmar.css";
import { UserContext } from "@/Context/UserContext";
import new_logo from "../../assets_op//Picsart_24-09-16_13-35-58-618.png"
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LeftSIdeBar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false)

  const { userData, chatData, setMessagesId, setChatUser, messageId ,setChatVisible,chatVisible,chatUser, } =
    useContext(UserContext);
  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearchResult(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const dataSnap = await getDocs(q);
        if (!dataSnap.empty && dataSnap.docs[0].data().id != userData.id) {
          let userExits = false;

          chatData.map((user) => {
            if (user.rId == dataSnap.docs[0].id) {
              userExits = true;
            }
          });

          if (!userExits) {
            setUser(dataSnap.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearchResult(false);
      }
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  };

  const addChat = async () => {
    // Create a reference to the 'messages' collection
    const messagesRef = collection(db, "messages");

    // Auto-generate a new document in the 'messages' collection
    const newMessageRef = doc(messagesRef); // new document reference with auto-generated ID

    // Create a reference to the 'chats' collection
    const chatsRef = collection(db, "chats");

    try {
      // Save the new message in the 'messages' collection
      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Update the chats collection with the new message info
      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id, // Store the ID of the new message
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          lastSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id, // Store the ID of the new message
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          lastSeen: true,
        }),
      });


      const uSnap = await getDoc(doc(db,"users",user.id))
      const uData = uSnap.data();
      setChat({
        messageId: newMessageRef.id, // Store the ID of the new message
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true
          ,userData:uData

      })
      setShowSearchResult(false)
      setChatVisible(true)
    } catch (error) {
      console.error(error);
    }
  };

  const setChat = async (item) => {
    setMessagesId(item.messageId);
    setChatUser(item);
      setChatVisible(true)
    
  };

useEffect(()=>{
  const updateChatUserData = async()=>{
if(chatUser){
  const userRef = doc(db,"users",chatUser.userData.id)
  const userSnap = await getDoc(userRef)
  const userData = userSnap.data();
  setChatUser(prev => ({...prev,userData:userData}))
}
  }
  updateChatUserData()
},[chatData])


  return (
    <div className={`sm:bg-black relative sm:text-white sm:h-[75vh] bg-black w-[full] h-[80vh] text-white ${chatVisible ? "hidden sm:block" : ""}`}>
      <div className="sm:p-[20px] p-[20px]">
        <div className="sm:flex sm:justify-between sm:items-center flex justify-between items-center">
          <img className="sm:max-w-[140px] max-w-[140px]" src={new_logo} />
          <div className="relative menu sm:py-[10px] py-[10px]">
            <img
              className="sm:max-h-[20px] sm:opacity-[.6] sm:cursor-pointer max-h-[20px] opacity-[.6] cursor-pointer"
              src={assets.menu_icon}
              alt=""
            />
            <div className=" sub-menu hidden absolute  sm:top-[100%] sm:right-0 sm:w-[130px] sm:p-[20px] sm:bg-white sm:rounded-md sm:text-black top-[100%] right-0 w-[130px] p-[20px] bg-white rounded-md text-black">
              <p
                onClick={() => navigate("/profile")}
                className="sm:cursor-pointer sm:text-[14px] cursor-pointer text-[14px]"
              >
                Edit Profile
              </p>
              <hr className="sm:border-none sm:h-[1px] sm:bg-gray-400 sm:my-[8px] border-none h-[1px] bg-gray-400 my-[8px]" />
              <p onClick={LogoutApp} className="sm:cursor-pointer sm:text-[14px] cursor-pointer text-[14px]">
                Log-out
              </p>
            </div>
          </div>
        </div>
        <div className="sm:bg-blue-950 sm:flex sm:items-center sm:gap-[10px] sm:py-[10px] sm:px-[12px] sm:mt-[20px] bg-blue-950 flex items-center gap-[10px] py-[10px] px-[12px] mt-[20px]">
          <img className="sm:w-[16px] w-[16px]" src={assets.search_icon} />
          <input
            onChange={inputHandler}
            className="sm:bg-transparent sm:border-none sm:outline-none sm:text-[11px] sm:text-white sm:placeholder:text-white bg-transparent border-none outline-none text-[11px] text-white placeholder:text-white"
            type="text"
            placeholder="search here"
          />
        </div>
      </div>
      <div className="sm:flex sm:flex-col sm:h-[70%] sm:overflow-y-scroll flex flex-col h-[70%] overflow-y-scroll" >
        {showSearchResult && user ? (
          <div
            onClick={addChat}
            className="sm:flex sm:items-center sm:gap-[10px] sm:py-[10px] sm:px-[20px] sm:cursor-pointer sm:text-[13px] sm:hover:bg-purple-200 sm:hover:text-black flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-purple-200 hover:text-black"
          >
            <img
              className="sm:w-[35px] sm:aspect-[1/1] sm:rounded-full w-[35px] aspect-[1/1] rounded-full"
              src={user.avatar}
              alt=""
            />
            <div className="sm:flex sm:flex-col flex flex-col">
              <p>{user.username}</p>
              <span className="sm:text-gray-500 sm:text-[11px] sm:hover:text-black text-gray-500 text-[11px] hover:text-black">
                {user.bio}
              </span>
            </div>
          </div>
        ) : (
          chatData.map((item, index) => {
            return (
              <div
                onClick={() => setChat(item)}
                key={index}
                className={`sm:flex sm:items-center sm:gap-[10px] sm:py-[10px] sm:px-[20px] sm:cursor-pointer sm:text-[13px] sm:hover:bg-purple-200 sm:hover:text-black flex items-center gap-[10px] py-[16px] px-[20px] cursor-pointer text-[18px] hover:bg-purple-200 hover:text-black ${
                  item.messageSeen || item.messageId === messageId ? "" : "border"
                }`}
              >
                <img
                  className="sm:w-[35px] sm:aspect-[1/1] sm:rounded-full w-[35px] aspect-[1/1] rounded-full"
                  src={item.userData.avatar}
                  alt=""
                />
                <div className="sm:flex sm:flex-col flex flex-col">
                  <p>{item.userData.name}</p>
                  <span className="sm:text-gray-500 sm:text-[11px] sm:hover:text-black text-gray-500 text-[16px] hover:text-black">
                    {item.lastMessage}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LeftSIdeBar;
