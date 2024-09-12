// import { BrowserRouter,Routes,Route,createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
// import Chat from "./pages/chat/Chat";
// import Login from "./pages/Login/Login";
// import Profile from "./pages/ProfileUpdate/Profile";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./config/firbase";
// import { useEffect } from "react";

// function App() {
//   const navigate = useNavigate();  // Correctly using useNavigate for programmatic navigation

//   useEffect(() => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         navigate("/chat");  // Programmatically navigate to "/chat"
//       } else {
//         navigate("/");  // Programmatically navigate to "/"
//       }
//     });
//   }, [navigate]);  // Adding navigate as a dependency to the useEffect

//   const appRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />
//     },
//     {
//       path: "/chat",
//       element: <Chat />
//     },
//     {
//       path: "/profile",
//       element: <Profile />
//     },
//     {
//       path: "*",
//       element: <Navigate to="/" />
//     },
//   ]);

//   return (
//     <RouterProvider router={appRouter} />
//   );
// }

// export default App;

///////////////////////////
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

// sh1@gmail.com