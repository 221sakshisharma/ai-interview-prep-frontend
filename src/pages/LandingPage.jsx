import { useContext, useState } from "react";
import { LuSparkles } from "react-icons/lu";
import HERO_IMAGE from "../assets/hero-landing.png";
import { APP_FEATURES } from "../utils/data";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/Signup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="relative overflow-hidden min-h-screen bg-indigo-50">
  {/* Radial glowing background */}
<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(238,242,255,1)_0%,rgba(224,231,255,0.85)_25%,rgba(199,210,254,0.75)_50%,rgba(165,180,252,0.65)_75%,rgba(129,140,248,0.7)_100%)] pointer-events-none"></div>

  <header className="relative z-10 flex items-center justify-between px-10 py-5">
    <div className="text-lg md:text-2xl text-black font-medium tracking-tight">
      Interview Prep AI
    </div>

    {user ? (
      <ProfileInfoCard />
    ) : (
      <button
        className="bg-indigo-500 px-6 py-2.5 text-xs md:text-sm text-white font-semibold rounded-full tracking-wide hover:bg-black transition-colors cursor-pointer"
        onClick={() => setOpenAuthModal(true)}
      >
        Login / Sign Up
      </button>
    )}
  </header>

  <div className="relative z-10 px-10 mt-14 space-y-16">
    <div className="flex flex-col md:flex-row md:items-center md:gap-10 space-y-10">
      <div className="w-full md:w-1/2 space-y-4 flex flex-col items-start">
        <div className="flex items-center gap-2 text-xs text-indigo-500 font-semibold bg-indigo-100 px-3 py-1.5 rounded-full border border-indigo-500">
          <LuSparkles />
          AI Powered
        </div>

        <h1 className="text-4xl md:text-5xl text-black font-semibold leading-[1.15]">
          Ace Interviews with <br />
          <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#6366f1,#818cf8)] animate-text-shine font-semibold">
            AI-Powered
          </span>{" "}
          Learning
        </h1>
      </div>

      <div className="w-full md:w-1/2">
        <p className="text-sm md:text-base text-gray-900 mb-6 text-justify leading-relaxed">
          Get role-specific questions, expand answers when you need them,
          dive deeper into concepts, and organize everything your way.
          From preparation to mastery, your ultimate interview toolkit is here.
        </p>

        <button
          className="px-6 py-2.5 bg-black hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold rounded-full tracking-wide transition-colors cursor-pointer"
          onClick={handleCTA}
        >
          Get Started
        </button>
      </div>
    </div>
  </div>

  {/* HERO IMAGE with soft blending glow behind it */}
  <div className="relative w-full mt-16 flex justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(199,210,254,0.65)_0%,rgba(216,225,255,0.3)_40%,transparent_80%)] blur-3xl"></div>

    <img src={HERO_IMAGE} alt="Hero" className="relative z-10 w-full md:w-[80vw] mx-auto" />
  </div>
</div>


      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setCurrentPage("login");
          setOpenAuthModal(false);
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
