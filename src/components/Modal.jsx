
const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex bg-black/30 backdrop-blur-xs justify-center items-center w-full h-full">
      <div
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}
      >

        <div className={`${hideHeader? "": "items-center flex justify-between border-b border-gray-200 py-4 px-6"}`}>
          {!hideHeader && <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>}
        <button 
          type="button" 
          className={`text-gray-300 bg-transparent hover:text-gray-900 flex justify-center items-center ${hideHeader? "absolute top-8 right-8": ""}  cursor-pointer`}
          onClick={onClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6-6m-6 6l-6 6m6-6l6 6"
            />
          </svg>
        </button>
        </div>


        {/* Modal Content */}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
