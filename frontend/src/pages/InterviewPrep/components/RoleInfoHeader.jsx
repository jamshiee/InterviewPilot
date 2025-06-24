const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white px-8 relative">
      <div className="container mx-auto   md:px-0">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-semibold">{role}</h2>
                  <p className="text-sm text-medium text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-[12px] font-semibold   text-white  bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default RoleInfoHeader;
