import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-200/50 bg-white
       backdrop-blur-[10px] sticky top-0 z-50">
        <Link to="/dashboard">
          <div className="text-lg md:text-2xl text-black font-medium tracking-tight">
            Interview Prep AI
          </div>
        </Link>

        <ProfileInfoCard />
      </div>
  );
};

export default Navbar;
