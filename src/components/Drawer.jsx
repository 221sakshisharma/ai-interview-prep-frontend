import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed top-20 right-0 z-40
        h-[calc(100vh-64px)]
        overflow-y-auto
        overflow-x-hidden
        transition-transform duration-300
        bg-white w-full md:w-[40vw]
        shadow-lg border-l border-gray-100
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="px-3 sticky top-0 z-10 flex items-center justify-between py-2 bg-white">
        <div id="drawer-right-label" className="text-base font-bold text-black">
          {title}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="px-5">
        {children}
      </div>
    </div>
  );
};

export default Drawer;

