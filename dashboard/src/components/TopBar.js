
import React from "react";
import Menu from "./Menu";

// Receive username as a prop from Home.jsx
const TopBar = ({ username }) => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">22150.40</p>
          <p className="percent"> +0.15%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">73142.20</p>
          <p className="percent"> -0.05%</p>
        </div>
      </div>

      {/* Pass the username down to the Menu for the profile icon */}
      <Menu username={username} />
    </div>
  );
};

export default TopBar;