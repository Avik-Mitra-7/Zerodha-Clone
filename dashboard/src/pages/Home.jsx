import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TopBar from "../components/TopBar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasGreeted = useRef(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://zerodha-clone-9o2z.onrender.com",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          // 1. Update verification status first
          setIsVerified(true);
          setUsername(data.user);

          // 2. GREETING LOGIC: Only fire if we haven't greeted in THIS session
          // We check 'data.user' directly to ensure we have the name before toasting
          if (!hasGreeted.current && data.user) {
            toast.success(`Welcome back, ${data.user}!`, {
              position: "top-right",
              toastId: "session-greet", // Unique ID prevents duplicates
              autoClose: 2000,
            });
            hasGreeted.current = true; // Lock it so clicks on TopBar don't trigger it again
          }
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth Error:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]); // Navigation doesn't trigger this because 'cookies.token' stays the same

  const Logout = () => {
    removeCookie("token");
    // Hard refresh on logout to reset the 'hasGreeted' Ref for the next user
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