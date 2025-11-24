import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';

const Login = ({ setCurrentPage }) => {

  const {updateUser} = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();


    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }


    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("")


    // login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token } = response.data;
      
      if (token) {
        updateUser(response.data)
        navigate("/dashboard")
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again later."
      );
    }
  }
  return (
<div className="w-[90vw] max-w-[500px] p-7 flex flex-col justify-center">
      <div className='text-lg font-semibold text-black'>Welcome Back</div>
      <p className="text-xs text-slate-800 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>

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

        {error && <p className="text-red-500 text-xs pb-2.5 -mt-1">{error}</p>}
        <button
          type="submit"
          className="form-submit-btn"
        >Login</button>
      </form>

      <p className='text-xs text-slate-800 mt-2 '>
        Dont have an Account?{" "}
        <button
          className='text-indigo-500 underline font-medium cursor-pointer'
          onClick={() => {
            setCurrentPage("signup")
          }}
        >
          Sign Up
        </button>
      </p>

    </div>
  )
}

export default Login