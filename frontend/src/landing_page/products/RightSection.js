import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row p-5">
        {/* TEXT */}
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={learnMore}>Learn More</a>
          </div>
        </div>

        {/* GAP */}
        <div className="col-1 p-5"></div>

        {/* IMAGE */}
        <div className="col-5 p-5">
          <div style={{ marginLeft: "-200px", marginBottom:"30px" }}>
            <img src={imageURL} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
