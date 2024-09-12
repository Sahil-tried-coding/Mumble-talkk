import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./Context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <UserContextProvider>
        <App />
        <Toaster closeButton />
      </UserContextProvider>
    </BrowserRouter>
  </>
);
