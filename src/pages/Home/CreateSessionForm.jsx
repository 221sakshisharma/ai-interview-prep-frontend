import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import { useState } from "react";

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus} = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields");
            return
        }

        setError("");
        setIsLoading(true)

        try {

            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10,
            })

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: aiResponse.data
            })

            const sessionId = response.data?.session?._id

            if (sessionId) {
                navigate(`/interview-prep/${sessionId}`)
            }

        } catch(err) {
            setError(err.response?.data?.message || err.message || "Something Went Wrong! Please Try Again Later")
        } finally {
            setIsLoading(false)
        }

    }
 
  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Start a New Interview Journey</h3>
        <p className="text-xs text-slate-800 mt-[5px] mb-3">
            Fill out a quick details and unlock your personalised set of interview questions
        </p>

        <form onSubmit={handleCreateSession}>
            
            <Input
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
            type="text"
            label="Target Role"
            />

            <Input
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="(e.g., 1 year, 3 years, 5+ years)"
            type="number"
            label="Years of Experience"
            />
            
            <Input
            value={formData.topicsToFocus}
            onChange={(e) => handleChange("topicsToFocus", e.target.value)}
            label="Topics to Focus On"
            placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
            type="text"
            />

            <Input
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            label="Description"
            placeholder="Any specific goals or notes for this session"
            type="text"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className={`w-full flex gap-2 justify-center text-sm tracking-wider font-medium text-white bg-black py-2.5 rounded ${isLoading? "": "hover:bg-linear-to-r hover:from-indigo-400 hover:bg-indigo-500 cursor-pointer transition-colors"}`} disabled={isLoading}>
             {isLoading && <div className="questions-loader"></div>}Create Session
            </button>
        </form>
    </div>
  )
}

export default CreateSessionForm