import { useNavigate } from "@remix-run/react";
import { useState } from "react";

const StudentLogin = () => {
  const handleClientSideLogout = (action: string) => {
    if (action === "logout" || action === "delete") {
      localStorage.removeItem("userLogged");
    }
  };
  const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [userId, setUserId] = useState("")
  const [userIdError, setUserIdError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const handleLogin = () =>{
    setUserIdError("")
    setPasswordError("")
    if(userId !== "defaultuser@quiz.com"){
      setUserIdError("Invalid id! use id: defaultuser@quiz.com")
      return;
    }
    if(password !== "defaultPassword"){
      setPasswordError("Wrong Password! use password: defaultPassword")
      return;
    }
    navigate("/takeQuiz");
    
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Student Login</h2>
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-2"
          ></label>
          <input
            type="text"
            id="userId"
            placeholder="Enter user email id"
            onChange={(e)=>setUserId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
        {userIdError && <p className="text-red-500 text-sm mb-4">{userIdError}</p>}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          ></label>
          <input
            type="password"
            id="password"
            placeholder="Enter user password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
        {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
