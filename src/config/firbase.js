// whenever you have to interact with database the function should be async

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: "AIzaSyArrHb0vOVd65Xr7FGVQsX5L8WN6DGXA1w",
  authDomain: "mumble-talk-17042.firebaseapp.com",
  projectId: "mumble-talk-17042",
  storageBucket: "mumble-talk-17042.appspot.com",
  messagingSenderId: "608397180850",
  appId: "1:608397180850:web:5e46deb2d3fe1354332eab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const Signup = async (username, email, password) => {
  try {
    if (!email || !password) {
      return alert("fill the information");
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);
    toast("user has been created");

    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      avatar: "",
      name:"",
      bio: "hey there this is the best app out there",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chats: [],
    });
  } catch (error) {
    console.log(error);
    toast(error.message.split("/")[1].split("-").join(" "));
  }
};

export const LoginApp = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast("user logged in successfully");
  } catch (error) {
    toast(error.message.split("/")[1].split("-").join(" "));
  }
};

export const LogoutApp = async () => {
  await signOut(auth);
};

export const SingupUsingGoogle = async () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};
