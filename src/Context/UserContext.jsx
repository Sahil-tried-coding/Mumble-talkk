import { auth, db } from "@/config/firbase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

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
  }
     catch (error) {
        console.log(error)    
    }
  }
 useEffect(()=>{
  loadUserData()
 })
  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };
  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
