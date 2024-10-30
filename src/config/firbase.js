

import { initializeApp } from "firebase/app";
import {
  signInWithRedirect, getRedirectResult,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "sonner";


const firebaseConfig = {
  apiKey: "AIzaSyCrcMyk7NsMnceITH9NMaA20H6dNmM5pLY",
  authDomain: "mumble-talk-845e7.firebaseapp.com",
  projectId: "mumble-talk-845e7",
  storageBucket: "mumble-talk-845e7.appspot.com",
  messagingSenderId: "436476197643",
  appId: "1:436476197643:web:eac1bf76409082ed57c00e"
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
      chatsData: [],
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

export const SignupUsingGoogle = async () => {
  const auth = getAuth();  // Ensure auth instance is available
  const provider = new GoogleAuthProvider();

  try {
    // Try to sign in with a popup first
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  } catch (error) {
    // If popup fails (for example, if blocked), fall back to redirect
    if (error.code === "auth/popup-blocked" || error.code === "auth/operation-not-supported-in-this-environment") {
      await signInWithRedirect(auth, provider);
    } else {
      console.log("Error signing in:", error);
    }
  }
};

// Handle the result after a redirect
export const handleRedirectResult = async () => {
  const auth = getAuth();
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log(result.user);
    }
  } catch (error) {
    console.log("Error after redirect:", error);
  }
};





// export const SignupUsingGoogle = async () => {
//   const provider = new GoogleAuthProvider();

//   signInWithPopup(auth, provider)
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));
// };


export const resetPass = async (email)=>{
  if(!email){
    toast("enter email")
  }
  try {
    const userRef = collection(db,"users")
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q)
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email)
      toast("password reset send on email !")
    }
    else{
      toast("email does not exits")
    }
  } catch (error) {
   console.log(error.message)
  }
}
