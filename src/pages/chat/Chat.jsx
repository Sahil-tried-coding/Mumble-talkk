import Chatbox from "@/component/Chatbox/Chatbox"
import LeftSIdeBar from "@/component/LeftSideBar/LeftSIdeBar"
import RightISideBar from "@/component/RightSideBar/RightISideBar"

const Chat = () => {
  
  
  return (
    <div className="h-[100vh] bg-purple-400 grid place-items-center">
      <div className="container w-[95%] max-w-[1000px] h-[75vh] bg-gray-200 grid grid-cols-3">
        <LeftSIdeBar/>
        <Chatbox/>
        <RightISideBar/>
      </div>
    </div>
  )
}

export default Chat