// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = inputValue;

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   const handleError = (err) =>
//     toast.error(err, { position: "bottom-left" });

//   const handleSuccess = (msg) =>
//     toast.success(msg, { position: "bottom-left" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isLoading) return; 
//     setIsLoading(true);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:3002/login",
//         { ...inputValue },
//         { withCredentials: true }
//       );

//       const { success, message } = data;
//       if (success) {
//         handleSuccess(message);
//         setTimeout(() => {
//           navigate("/");
//         }, 800);
//       } else {
//         handleError(message);
//       }
//     } catch (error) {
//       handleError("Server connection lost. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setInputValue({ email: "", password: "" });
//     }
//   };

//   return (
//     <div className="form_container">
//       <form onSubmit={handleSubmit}>
//         <h2>Login Account</h2>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={handleOnChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             placeholder="Enter your password"
//             onChange={handleOnChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Verifying..." : "Submit"}
//         </button>
//         <span>
//           Don't have an account? <Link to={"/signup"}>Signup</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };
// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const { email, password } = inputValue;

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
        "http://localhost:3002/login",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        toast.success(message);
        setTimeout(() => navigate("/"), 800);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Server connection lost.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="kite-auth-page">
      <div className="auth_card">
        <div className="kite-logo">
          <img src="https://kite.zerodha.com/static/images/kite-logo.svg" alt="Kite" />
        </div>
        
        <h2>Login to Kite</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email (e.g: user123@gmail.com)"
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
            {isLoading ? "Verifying..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
          <p className="forgot-link">Forgot password?</p>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Login;