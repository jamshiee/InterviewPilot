import ProfilePicSelector from "@/components/ProfilePicSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import uploadImage from "@/utils/uploadImage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/userContext";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const res = await axiosInstance.post("/api/auth/register", {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below{" "}
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <ProfilePicSelector
          Selector
          image={profilePic}
          setImage={setProfilePic}
        />
        <Label>Full Name</Label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="Lucifer"
          type="text"
        />
        <Label>Email Address</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="lucifer@example.com"
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

        <button type="submit" className="btn-primary  items-center">
          Sign Up
        </button>

        <p className="text-[13px] text-slate-800 mt-1 flex justify-center items-center">
          Already have an account?{"  "}
          <button
            className="font-medium text-[#FF9324] underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            {" "}
            Login
          </button>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
