import assets from "@/assets/Chat_App_Assets/assets/assets"

const LeftSIdeBar = () => {
  return (
    <div className="ls sm:bg-black sm:text-white sm:h-[75vh] ">
        <div className="ls-top sm:p-[20px] ">
            <div className="ls-nav sm:flex sm:justify-between sm:items-center">
                <img className="sm:max-w-[140px]" src={assets.logo}/>
                <div className="menu relative py-[10px]">
                    <img className="sm:max-h-[20px] sm:opacity-[.6] sm:cursor-pointer" src={assets.menu_icon} alt="" />
                    <div className="sub-menu hidden absolute top-[100%] right-0 w-[130px] p-[20px] bg-white rounded-md text-black">
                        <p  className="cursor-pointer text-[14px]">Edit Profile</p>
                        <hr className="border-none h-[1px] bg-gray-400 my-[8px]"/>
                        <p  className="cursor-pointer text-[14px]">Log-out</p>
                    </div>
                </div>
            </div>
            <div className="ls-search sm:bg-blue-950 sm:flex sm:items-center sm:gap-[10px] sm:py-[10px] sm:px-[12px] sm:mt-[20px]" >
                <img className="sm:w-[16px]" src={assets.search_icon}/>
                <input className="sm:bg-transparent sm:border-none outline-none  sm:text-[11px] sm:text-white sm:placeholder:text-white" type="text" placeholder="search here"/>

            </div>
        </div>
        <div className="ls-list sm:flex sm:flex-col sm:h-[70%] sm:overflow-y-scroll ">
            {Array(12).fill("").map((item,index)=>{
                return <div key={index} className="friends  sm:flex sm:items-center sm:gap-[10px] sm:py-[10px] sm:px-[20px] sm:cursor-pointer sm:font-[13px] sm:hover:bg-purple-200 sm:hover:text-black">
                <img className="sm:w-[35px]  sm:aspect-[1/1] sm:rounded-full" src={assets.profile_img} alt="" />
                <div className="sm:flex sm:flex-col ">
                    <p>Sahil Shaikh</p>
                    <span className="sm:text-gray-500 sm:font-[11px] sm:hover:text-black">hello how are you?</span>
                </div>
            </div>
            })}
        </div>
    </div>
  )
}

export default LeftSIdeBar