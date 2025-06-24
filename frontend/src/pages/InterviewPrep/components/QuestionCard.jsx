import {
  LuChevronRight
} from "react-icons/lu";

const QuestionCard = ({ question, setAnswer, isSelected  }) => {
  const toggleExpand = () => {
    setAnswer();
  };

  return (
    <div
      className={`${isSelected ? "scale-102 border-orange-400 " : ""} bg-white  border  border-gray-100/60 group  rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 `}
    >
      <div
        onClick={toggleExpand}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex gap-3.5">
          <span className={` ${isSelected && "text-orange-400"} text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]`}>
            Q
          </span>

          <h3 className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20">
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 rlativee">
          <button className="text-gray-400 hover:text-gray-500 cursor-pointer ">
            <LuChevronRight
              size={20}
              className={`transform transition-transform duration-300 
                
              `}
            />
          </button>
        </div>
      </div>

      {/* <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: `${height}px` }}>
        <div ref={contentRef} className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg">
             <AIResponsePreview content={answer}/> 
        </div>
      </div> */}
    </div>
  );
};
export default QuestionCard;
