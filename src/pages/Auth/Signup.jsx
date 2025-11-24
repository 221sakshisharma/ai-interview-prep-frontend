import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext);

  const handleSignUp =  async (e) => {
    e.preventDefault();

    let profileImageURL = "";

    if (!fullName) {
      setError("Please enter full name.");
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
        profileImageURL = imgUploadRes.imageURL

      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageURL
      })

      console.log(response)
      
      const { token } = response.data;
      
      if (token) {
        updateUser(response.data)
        navigate("/dashboard")
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message || "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="w-[90vw] max-w-[500px] p-6 flex flex-col justify-center">
      <div className="text-lg font-semibold text-black">Create An Account</div>
      <p className="text-xs text-slate-800 mt-[5px] mb-6">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John"
          type="text"
          label="Full Name"
        />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          type="text"
          label="Email Address"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 characters"
          type="password"
          label="Password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="form-submit-btn">
          Sign Up
        </button>

        <p className="text-xs text-slate-800 mt-2 ">
          Already have an Account?{" "}
          <button
            className="text-indigo-500 underline font-medium cursor-pointer"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
