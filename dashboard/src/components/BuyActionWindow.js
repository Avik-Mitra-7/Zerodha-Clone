import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // [GENERAL FIX] Get the logged-in user from Context dynamically
  const userEmail = generalContext.username;

  const handleBuyClick = async () => {
    // Topper-Level Safety Check: Ensure a user is actually logged in
    if (!userEmail) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    try {
      // Send the order to Port 3002 with the owner's email
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity), // Ensure it's a number
        price: Number(stockPrice), // Ensure it's a number
        mode: "BUY",
        userEmail: userEmail, // This ensures Aditya only sees Aditya's trades!
      });

      toast.success(`Bought ${stockQuantity} shares of ${uid} successfully!`, {
        position: "top-right",
      });

      // Close the modal after a successful trade
      generalContext.closeBuyWindow();
    } catch (err) {
      console.error("Buy Order Error:", err);
      toast.error("Buy Order Failed. Please try again.");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
