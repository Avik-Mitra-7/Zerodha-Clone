import React from "react";

function Hero() {
  
  const handleSignupClick = () => {
    window.location.href = "https://zerodha-clone-dashboard-mauve.vercel.app/login";
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <div className="col-12 p-md-5">
          <img
            src="media/images/homeHero.png"
            alt="Invest in everything"
            className="img-fluid mb-5"
          />
          <h1 className="mt-5 display-5 fw-medium">Invest in everything</h1>
          <p className="fs-4 text-muted">
            Online platform to invest in stocks, mutual funds, and many more
          </p>
          
          {/* Native button that triggers the cross-port redirect on click */}
          <button
            type="button"
            onClick={handleSignupClick}
            className="btn btn-primary fs-5 ps-5 pe-5 pt-2 pb-2 mb-5" 
            style={{ backgroundColor: '#387ed1', borderColor: '#387ed1', borderRadius: '4px' }}
          >
            Signup Now
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Hero;

// import React from "react";

// function Hero() {
//   return (
//     <div className="container p-5 mb-5">
//       <div className="row text-center">
        
//         <div className="col-12 p-md-5">
//           <img
//             src="media/images/homeHero.png"
//             alt="Invest in everything"
//             className="img-fluid mb-5"
//           />
//           <h1 className="mt-5 display-5 fw-medium">Invest in everything</h1>
//           <p className="fs-4 text-muted">
//             Online platform to invest in stocks, mutual funds, and many more
//           </p>
//           <button
//             className="btn btn-primary fs-5 mb-5 signup-btn"
//             style={{ backgroundColor: "#387ed1", border: "none", padding: "10px 30px" }}
//           >
//             Signup Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;
