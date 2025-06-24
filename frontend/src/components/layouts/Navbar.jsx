import { Link } from "react-router-dom";
import ProfileInfoCard from "../ProfileInfoCard";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-2 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-8" />
            <h2 className="text-lg md:text-xl font-semibold  leading-5">
              InterviewPilot
            </h2>
          </div>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};
export default Navbar;
