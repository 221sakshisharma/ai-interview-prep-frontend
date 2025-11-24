import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Input = ({
    value,
    onChange,
    placeholder,
    type,
    label,
    required
}) => {
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (
    <>
        <label className="text-xs text-slate-800">{label}</label>
        <div className="form-input">
            <input 
                type={
                    type == "password" ? (showPassword ? "text": "password") : type
                }
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full outline-none"
            />

            
            {type == "password" &&

            (showPassword? 
                <FaRegEye
                    size={22}
                    className="text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                /> :
                <FaRegEyeSlash
                    size={22}
                    className="text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                />
            )
            }
        </div>
    </>
  )
}

export default Input