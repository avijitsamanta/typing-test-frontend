import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TypingTest from "../components/TypingTest";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!"); 
    alert("Logout successful!");
    navigate("/login");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} /> {/* Include Navbar */}
      <div className="container mt-5 text-center">
        <h1>Typing Speed Test</h1>
        <TypingTest />
      </div>
    </>
  );
};

export default HomePage;
