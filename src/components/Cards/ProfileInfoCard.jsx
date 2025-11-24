import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"

const ProfileInfoCard = () => {
  const { user, clearUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    clearUser()
    navigate("/")
  }

  return (
        user && <div className="flex items-end">
          <img
            src={user.profileImageURL}
            alt="profile_pic"
            className="w-10 h-10 bg-gray-300 border-gray-700 rounded-full mr-3"
          />

          <div>
            <div className="text-sm md:text-base text-black font-bold leading-2 md:leading-3">
              {user.fullName || ""}
            </div>

            <button
              className="text-red-500 text-xs md:text-sm font-semibold cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
  )
}

export default ProfileInfoCard
