import { auth, db } from "@/config/firbase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [mediaVisible,setMediaVisible] = useState(false);
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const Data = userSnap.data();
      setUserData(Data);

      if (Data.avatar && Data.name) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });
      setInterval(async () => {
        if (auth) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);

      const unsub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatsData;

        const temp = [];

        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();

          temp.push({ ...item, userData });
        }
        setChatData(temp.sort((a, b) => a.updatedAt - b.updatesAt));
      });
      return () => {
        unsub();
      };
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messagesId,
    setMessagesId,
    messages,
    setMessages,
    chatUser,
    setChatUser,
    chatVisible,
    setChatVisible,
    mediaVisible,setMediaVisible
  };
  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
