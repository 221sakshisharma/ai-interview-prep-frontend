import { LuTrash } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-400/40 rounded-xl p-2 overflow-hidden cursor-pointer"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer group flex items-stretch"
        style={{ background: colors.bgcolor }}
      >
        <div className="shrink-0 w-12 bg-white rounded-md flex items-center justify-center mr-4">
          <span className="text-lg font-semibold text-black">{getInitials(role)}</span>
        </div>

        {/* content container */}

        <div className="grow">
          <div className="flex justify-between items-start">
            {/* Title and Skills */}
            <div>
              <h2 className="text-[17px] font-medium ">{role}</h2>
              <p className="text-xs text-medium text-gray-900">
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center text-sm text-rose-500 font-medium bg-rose-200 px-3 py-1 rounded-full text-nowrap border-2 border-rose-200 hover:border-rose-400 hover:text-red-600 cursor-pointer transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash></LuTrash>
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4">
          <div className="text-[10px] font-medium text-gray-900 border border-gray-800 px-2 py-0.5 rounded-full">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] font-medium text-gray-900 border border-gray-800 px-2 py-0.5 rounded-full">
            {questions} Q&A
          </div>

          <div className="text-[10px] font-medium text-gray-900 border border-gray-800 px-2 py-0.5 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-600 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
