import Navbar from "./Navbar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  return (

    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
