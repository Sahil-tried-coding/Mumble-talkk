import assets from "@/assets/Chat_App_Assets/assets/assets";
import { auth, db } from "@/config/firbase";
import { UserContext } from "@/Context/UserContext";
import upload from "@/lib/upload";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [previmage, setPrevImage] = useState("");

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const profileUpdateFunc = async (e) => {
    e.preventDefault();
    try {
      if (!previmage && !image) {
        toast("Upload an Image");
        return;
      }

      const docRef = doc(db, "users", uid);

      if (image) {
        const imageURL = await upload(image);
        setPrevImage(imageURL);
        await updateDoc(docRef, {
          avatar: imageURL,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      toast(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (data.name) {
          setName(data.name);
        }
        if (data.bio) {
          setBio(data.bio);
        }
        if (data.avatar) {
          setPrevImage(data.avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-purple-950 flex items-center justify-center">
      <div className="bg-white w-[90%] flex flex-col lg:flex-row items-center justify-between lg:min-w-[700px] lg:max-w-[800px] rounded-md shadow-lg p-6 space-y-8 lg:space-y-0 lg:space-x-6">
        <form onSubmit={profileUpdateFunc} className="flex flex-col gap-6 w-full lg:w-1/2">
          <h3 className="font-bold text-lg text-gray-800">Profile Details</h3>

          {/* Image Upload Section */}
          <label className="flex items-center gap-4 text-gray-600 cursor-pointer" htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpeg, .jpg"
              hidden
            />
            <img
              className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt="Profile"
            />
            Upload Profile Image
          </label>

          {/* Name Input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="Your Name"
            required
          />

          {/* Bio Input */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write Profile Bio"
            required
          ></textarea>

          {/* Save Button */}
          <button className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-all">
            Save
          </button>
        </form>

        {/* Display Updated Profile Image */}
        <div className="flex justify-center items-center lg:w-1/2">
          <img
            className="w-40 h-40 lg:w-[160px] lg:h-[160px] rounded-lg object-cover"
            src={image ? URL.createObjectURL(image) : previmage ? previmage : assets.logo_icon}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
