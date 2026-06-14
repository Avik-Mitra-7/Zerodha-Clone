import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TopBar from "../components/TopBar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasGreeted = useRef(false);

  useEffect(() => {
    const verifySession = () => {
      // Check localStorage instead of domain cookies
      const isLoggedIn = localStorage.getItem("userLoggedIn");
      const savedUser = localStorage.getItem("username");

      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      // Authorize session immediately
      setIsVerified(true);
      setUsername(savedUser || "Trader");
      setIsLoading(false);

      // Trigger the welcome message safely
      if (!hasGreeted.current) {
        toast.success(`Welcome back, ${savedUser || "Trader"}!`, {
          position: "top-right",
          toastId: "session-greet",
          autoClose: 2000,
        });
        hasGreeted.current = true;
      }
    };

    verifySession();
  }, [navigate]);

  const Logout = () => {
    // Clear browser state on logout
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "/login"; 
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h2>Verifying Session...</h2>
      </div>
    );
  }

  if (!isVerified) return null;

  return (
    <>
      <TopBar username={username} />
      <div className="dashboard-container">
        <Dashboard username={username} />
      </div>
      <button
        className="floating-logout"
        onClick={Logout}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        LOGOUT
      </button>
      <ToastContainer />
    </>
  );
};

export default Home;