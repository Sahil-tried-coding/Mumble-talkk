import assets from "@/assets/Chat_App_Assets/assets/assets";
import { auth, db } from "@/config/firbase";
import upload from "@/lib/upload";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { toast } from "sonner";

const Profile = () => {
  const [image, setImage] = useState(false);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [previmage, setPrevImage] = useState("");

  const navigate = useNavigate()


  const profileUpdateFunc = async(e) =>{
    e.preventDefault();
    try {
      if(!previmage && !image){
        toast("Upload an Image ");
        
      }
      const docRef = doc(db,"users",uid);
      if(image){
        const imageURL = await upload(image);
        setPrevImage(imageURL)
        await updateDoc(docRef,{
          bio:bio,
          name:name,
          avatar:imageURL,

        })
      }
      else{
        await updateDoc(docRef,{
          bio:bio,
          name:name,
        })
      }
    } catch (error) {
      toast(error.message)
    }
  }




  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // const userUid = user.uid;  // Use user.uid directly here
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const Data = await docSnap.data();
        console.log(docSnap.data())
        console.log(Data.bio)

        if (Data.name) {
          setName(Data.name);
        }
        if (Data.bio) {
          setBio(Data.bio);
        }
        if(Data.avatar){
          setPrevImage(Data.avatar)
        }
        
      }
      else{
        navigate("/")
      }
    });
  }, []);

  return (
    <div className="profile min-h-[100vh] bg-purple-950 flex items-center justify-center">
      <div className="  profile-container bg-white flex items-center justify-between min-w-[700px] rounded-md">
        <form onSubmit={profileUpdateFunc} className="flex flex-col gap-[20px] p-[40px]">
          <h3 className="font-semibold ">Profile Details</h3>
          <label
            className="flex items-center gap-[10px] text-gray-400 cursor-pointer"
            htmlFor="avatar"
          >
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpeg, .jpg "
              hidden
            />
            <img
              className="w-[50px] aspect-[1/1] rounded-full"
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
            />
            upload profile image
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-[10px] min-w-[300px] border-2 outline-2 outline-blue-600"
            type="text"
            placeholder="your Name"
            required
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-[10px] min-w-[300px] border-2 outline-2 outline-blue-600"
            placeholder="Write Profile Bio"
            required
          ></textarea>
          
          <button className="border-none text-white bg-black  p-[8px] text-[15px] cursor-pointer">
            Save
          </button>
        </form>
        <img
          className="max-w-[160px] aspect-[1/1] rounded-lg my-[20px] mx-auto "
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
        />
      </div>
    </div>
  );
};

export default Profile;
