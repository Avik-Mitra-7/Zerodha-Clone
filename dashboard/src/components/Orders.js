import React, { useState, useEffect } from "react";

import axios from "axios";

// Assume 'userEmail' is passed as a prop from Home.jsx
const Orders = ({ userEmail }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return; // Wait for prop

      try {
        const res = await axios.get(
          `http://localhost:3002/allOrders?email=${userEmail}`,
        );
        setAllOrders(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false); // ALWAYS stop loading regardless of success/fail
      }
    };

    fetchOrders();
    // Refresh every 5 seconds for a "Live" feel
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [userEmail]);

  if (isLoading)
    return (
      <div className="orders">
        <h2>Syncing Ledger...</h2>
      </div>
    );

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            textAlign: "center",
            flexDirection: "column",
            fontFamily: "Inter, sans-serif", // Standard professional font
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#718096", // Modern Slate Gray
              marginBottom: "8px",
              fontWeight: "400",
            }}
          >
            You haven't placed any orders today
          </p>

          <p
            style={{
              fontSize: "14px",
              color: "#4a5568", // Darker Charcoal Slate
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              opacity: "0.8",
            }}
          >
            Get Started!
          </p>
        </div>
      ) : (
        <div className="orders-table">
          <h3 className="title">Orders ({allOrders.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Time</th>
                <th>Status</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td className="instrument-name">
                    {order.name} <span className="exchange">NSE</span>
                  </td>
                  <td>{order.qty}</td>
                  <td>₹{order.price.toFixed(2)}</td>
                  <td className="order-time">
                    {/* new Date() now works because of the schema update! */}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td>
                    <span className="status-text">COMPLETE</span>
                  </td>
                  <td>
                    <span className={`badge ${order.mode.toLowerCase()}`}>
                      {order.mode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
