import React from "react";

function Universe() {
  const handleSignupRedirection = () => {
    window.location.href = "https://zerodha-clone-dashboard-mauve.vercel.app/login";
  };

  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        
        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/smallcaselogo.png"
            alt="Smallcase logo"
            style={{ height: "40px", width: "auto" }}
          />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/sensibullLogo.svg"
            alt="Sensibull logo"
            style={{ height: "40px", width: "auto" }}
          />
          <p className="text-small text-muted">Options trading platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/streakLogo.png"
            alt="Streak logo"
            style={{ height: "40px", width: "auto" }}
          />
          <p className="text-small text-muted">Algo and Strategy platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="Zerodha Fundhouse logo"
            style={{ height: "40px", width: "auto" }}
          />
          <p className="text-small text-muted">Asset Management</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/goldenpiLogo.png"
            alt="GoldenPi logo"
            style={{ height: "40px", width: "auto" }}
          />
          <p className="text-small text-muted">Bonds trading platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/dittoLogo.png"
            alt="Ditto Insurance logo"
            style={{ height: "40px", width: "auto" }}
          />
          <p className="text-small text-muted">Insurance</p>
        </div>

        <button
          className="p-2 btn btn-primary fs-5 mb-5 mt-5"
          style={{ width: "25%", margin: "0 auto", backgroundColor: "#387ed1", border: "none" }}
          onClick={handleSignupRedirection}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
