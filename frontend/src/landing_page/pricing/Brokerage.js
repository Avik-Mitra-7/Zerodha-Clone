import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-8 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage Calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5" }}
            className="text-muted"
          >
            <li>
              Call and trade and RMS auto-squareoff:Additional charges of $50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              $20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or $100 per executed order for
              equity(whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or $200 per executed order for
              equity(whichever is lower)
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged $40 per executed order instead of $20 per executed
              order.{" "}
            </li>
          </ul>
        </div>
        <div className="col-4 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5" }}
            className="text-muted"
          >
            <li>₹0 brokerage on equity delivery trades</li>
            <li>₹20 or 0.03% brokerage for intraday & F&O</li>
            <li>STT & exchange transaction charges apply</li>
            <li>GST (18%) applicable on brokerage</li>
            <li>SEBI charges & stamp duty applicable</li>
            <li>DP charges applicable on sell transactions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
