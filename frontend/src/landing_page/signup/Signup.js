import React from "react";


function Signup() {
    const handleSignupRedirection = () => {
    window.location.href = "https://zerodha-clone-dashboard-mauve.vercel.app/login";
  };
  return (
    <div className="container mt-5 p-5">
      <div className="row align-items-center">
        {/* Left Side: Large Hero Illustration */}
        <div className="col-lg-7 col-md-12 p-5 text-center">
          <img 
            src={"/media/images/account_open.svg"} 
            style={{ width: "90%", maxWidth: "600px" }} 
            alt="Account-open" 
          />
        </div>

        {/* Right Side: The Single Primary Action */}
        <div className="col-lg-5 col-md-12 p-5">
          <h1 style={{ fontWeight: 500, color: "#444", fontSize: "2.5rem", lineHeight: "1.2" }}>
            Invest in everything
          </h1>
          <p className="text-muted mt-3" style={{ fontSize: "1.2rem" }}>
            Online platform to invest in stocks, derivatives, mutual funds, and more.
          </p>

          <div className="mt-5">
            
            <button 
              className="btn btn-primary p-3 px-5" 
              style={{ 
                backgroundColor: "#387ed1", 
                border: "none", 
                fontSize: "1.2rem", 
                borderRadius: "3px",
                fontWeight: "500" 
              }}
              onClick={handleSignupRedirection}
            >
              Sign up now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;