import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

import { TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo_op from "../../assets_op/Picsart_24-09-16_13-35-58-618.png"
import assets from "@/assets/Chat_App_Assets/assets/assets";
import { SignupUsingGoogle } from "@/config/firbase";

import { Signup,LoginApp,  resetPass } from "@/config/firbase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")


  const loginHandler = (e) => {
    e.preventDefault()
    LoginApp(email,password)
    
    setEmail("")
    setPassword("")
  };
  const SignupHandler = (e) => {
    e.preventDefault()
    Signup(username,email,password)
    setEmail("")
    setUsername("")
    setPassword("")
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Logo Section */}
      <div className="hidden lg:flex lg:w-1/2 h-full justify-center items-center " id="bg">
        <div className="p-8">
          <img src={logo_op} alt="Logo" className="max-w-xs"/>
        </div>
      </div>

      {/* Main Content */}
      <div id="main" className="flex-1 flex justify-center items-center p-4 lg:p-8">
        <div
          className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-xl flex flex-col p-6 md:p-8"
        >
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-3xl md:text-4xl text-gray-800">Welcome</h1>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Fill in the details to get started with the best chat app.
            </p>
          </div>

          {/* Tabs Section */}
          <Tabs className="w-full" defaultValue="Log in">
            <TabsList className="flex w-full mb-6 border-b border-gray-300">
              <TabsTrigger
                className="flex-1 py-2 text-center text-lg font-semibold transition-all duration-300 
                data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
                value="Log in"
              >
                Log in
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 py-2 text-center text-lg font-semibold transition-all duration-300 
                data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
                value="Sign up"
              >
                Sign up
              </TabsTrigger>
            </TabsList>

            {/* Log in Form */}
            <TabsContent className="flex flex-col gap-4" value="Log in">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <Button
                onClick={loginHandler}
                className="w-full bg-purple-600 text-white hover:bg-purple-700 p-3 rounded-md transition-colors"
              >
                Log In
              </Button><Button
                onClick={SignupUsingGoogle}
                className="w-full bg-white text-black hover:bg-white p-3 rounded-md transition-colors border-2 border-black"
              >
               <img className="w-[40px]" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"/> Log in Using Google 
              </Button>
              <h4 className="font-semibold text-[14px]  text-gray-800">Forgot Password? <span className="text-purple-700 cursor-pointer " onClick={()=>resetPass(email)}>
              

                Click here to reset</span></h4>

            </TabsContent>

            {/* Sign up Form */}
            <TabsContent className="flex flex-col gap-4" value="Sign up">
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="UserName"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              
              <Button
                onClick={SignupHandler}
                className="w-full bg-purple-600 text-white hover:bg-purple-700 p-3 rounded-md transition-colors"
              >
                Sign Up
              </Button>
              <Button
                onClick={SignupUsingGoogle}
                className="w-full bg-white text-black hover:bg-white p-3 rounded-md transition-colors border-2 border-black"
              >
               <img className="w-[40px]" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"/> Get Started Using Google 
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Login;
