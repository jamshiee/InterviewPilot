import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      {user && <div className="bg-gray-50 min-h-screen">{children}</div>}
    </div>
  );
};
export default DashboardLayout;
