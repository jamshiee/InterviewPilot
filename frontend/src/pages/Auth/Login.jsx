import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/userContext";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address!")
      return
    }

    if(!password){
      setError("Please enter a password")
      return
    }

    setError("")

    try {
      const res = await axiosInstance.post('/api/auth/login',{
        email,password
      })
      const {token} = res.data

      if(token){
        localStorage.setItem("token",token)
        updateUser(res.data)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Something went wrong. Please try again.")
      }
    }


  };

  return (
    <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <Label>Email Address</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />
        <Label>Password</Label>

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Minimum 8 Characters"
          type="password"
        />

        {error && <p className="text-sm text-red-500 items-center">{error}</p>}

        <button type="submit" className="btn-primary  items-center">Login</button>

        <p className="text-[13px] text-slate-800 mt-1 flex justify-center items-center">Don't have an account?{"  "}<button className="font-medium text-[#FF9324] underline cursor-pointer" onClick={()=>setCurrentPage('signup')}> Sign In</button></p>
      </form>
    </div>
  );
};
export default Login;
