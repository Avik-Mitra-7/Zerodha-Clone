import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://zerodha-clone-9o2z.onrender.com/signup",
        { ...inputValue },
        { withCredentials: true },
      );

      const { success, message } = data;
      if (success) {
        toast.success(message);
        setTimeout(() => navigate("/login"), 800);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Signup failed. Server unreachable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="kite-auth-page">
      <div className="auth_card">
        <div className="kite-logo">
          <img
            src="https://kite.zerodha.com/static/images/kite-logo.svg"
            alt="Kite"
          />
        </div>

        <h2>Open a Kite Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email address"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleOnChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn-kite">
            {isLoading ? "Creating..." : "Continue"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Signup;
