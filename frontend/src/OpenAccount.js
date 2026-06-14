import React from "react";

function OpenAccount() {
  const handleSignupClick = () => {
    // Redirects from landing page to dashboard login
    window.location.href = "https://zerodha-clone-dashboard-mauve.vercel.app/login";
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open a Zerodha account</h1>
        <p>
          Modern platforms and apps, $0 investments, and flat $20 intra-day and
          F&O trades.{" "}
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "25%", margin: "0 auto" ,backgroundColor: "#387ed1"}}
          onClick={handleSignupClick}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;
