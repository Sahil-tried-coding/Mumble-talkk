import Chatbox from "@/component/Chatbox/Chatbox"
import LeftSIdeBar from "@/component/LeftSideBar/LeftSIdeBar"
import RightISideBar from "@/component/RightSideBar/RightISideBar"
import Shimmar from "@/component/Shimmar/Shimmar"
import { UserContext } from "@/Context/UserContext"
import { useContext, useEffect, useState } from "react"

const Chat = () => {
  const {chatData,userData} = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(chatData&&userData){
      setLoading(false)
    }
  },[chatData,userData])
  
  return (
    <div className="h-full my-[5rem] mx-[.5rem] sm:my-0 sm:mx-0 bg-purple-600 sm:h-[100vh] sm:bg-purple-400 sm:grid sm:place-items-center flex justify-center">
      {
        loading?<Shimmar/>:<div className="container w-[99%] bg-purple-600 max-w-[800px] max-h-max  sm:w-[95%] sm:max-w-[1000px] sm:h-[75vh] sm:bg-gray-200 sm:grid sm:rid-cols-3">
        <LeftSIdeBar/>
        <Chatbox/>
        <RightISideBar/>
      </div>
      }
      
    </div>
  )
}

export default Chat