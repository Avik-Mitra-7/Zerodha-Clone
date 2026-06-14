import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  
  const userEmail = generalContext.username;

  const handleSellClick = async () => {
    // Safety check for user session
    if (!userEmail) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL", // Correct mode
        userEmail: userEmail, 
      });

      toast.info(`Sold ${stockQuantity} shares of ${uid} successfully!`, {
        position: "top-right",
      });

      generalContext.closeSellWindow();
    } catch (err) {
      toast.error("Sell Order Failed");
      console.error("Sell Order Failed:", err);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div
      className="container"
      id="sell-window"
      draggable="true"
      style={{ borderBottom: "4px solid #ff5722" }}
    >
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        {/* Dynamic margin display makes it look professional */}
        <span>
          Margin available: ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div>
          <button
            className="btn btn-red"
            onClick={handleSellClick}
            style={{ backgroundColor: "#ff5722" }}
          >
            Sell
          </button>
          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
            style={{ backgroundColor: "#ff5722" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
