
import {  Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/Login/Login";
import Profile from "./pages/ProfileUpdate/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firbase";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

function App() {
  const navigate = useNavigate();
  const {loadUserData} = useContext(UserContext)
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/chat");
        await loadUserData(user.uid)
      } else {
        navigate("/");
      }
    });
  },[]); // Don't forget to include 'navigate' in the dependency array!

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App
