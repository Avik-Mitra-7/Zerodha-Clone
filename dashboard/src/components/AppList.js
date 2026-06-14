import React from "react";

const AppList = () => {
  
  const ecosystem = [
    { name: "Sensibull", desc: "Options trading platform" },
    { name: "GoldenPi", desc: "Bonds and debentures" },
    { name: "Streak", desc: "Algo trading and backtesting" },
    { name: "Kite Connect", desc: "Trading APIs for developers" },
    { name: "Tijori", desc: "Fundamental research" },
    { name: "Ditto", desc: "Insurance advisory" },
  ];

  return (
    <div
      style={{ padding: "40px", textAlign: "center", backgroundColor: "#fff" }}
    >
      <h1 style={{ fontWeight: 400, color: "#444", marginBottom: "10px" }}>
        Zerodha Ecosystem
      </h1>
      <p style={{ color: "#9b9b9b", marginBottom: "40px" }}>
        Specialized platforms to enhance your investment experience.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {ecosystem.map((item) => (
          <div
            key={item.name}
            style={{
              padding: "30px",
              border: "1px solid #eee",
              borderRadius: "4px",
              transition: "box-shadow 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#4285f4" }}>
              {item.name}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#666",
                marginBottom: "20px",
              }}
            >
              {item.desc}
            </p>
            <button
              className="btn-blue"
              style={{
                padding: "8px 20px",
                fontSize: "0.8rem",
                cursor: "pointer",
                backgroundColor: "#4285f4", 
                color: "#fff", 
                border: "none", 
                borderRadius: "4px", 
              }}
            >
              Launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppList;
  