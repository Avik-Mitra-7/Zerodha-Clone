// // // const Apps = () => {
// // //   return <h1>Apps</h1>;
// // // };

// // // export default Apps;

// // // import { Route, Routes } from "react-router-dom";
// // // import { Login, Signup } from "../pages";
// // // import Home from "../pages/Home";

// // // function Apps() {
// // //   return (
// // //     <div className="Apps">
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/signup" element={<Signup />} />
// // //       </Routes>
// // //     </div>
// // //   );
// // // }

// // // export default Apps;

// // // dashboard/src/components/Apps.js
// // // import { Routes, Route } from "react-router-dom";
// // // import { Login, Signup, Home } from "../pages";
// // // import Dashboard from "..pages/Home"; // Import your main Zerodha component

// // import React from "react";
// // import { Routes, Route } from "react-router-dom";
// // import { Login, Signup } from "./pages"; // This uses your pages/index.js exporter
// // import Home from "./pages/Home";

// // function Apps() {
// //   return (
// //     <Routes>
// //       <Route path="/*" element={<Home />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/signup" element={<Signup />} />

// //       {/* Once logged in, Home.jsx will verify and then you can show the Dashboard */}

// //     </Routes>
// //   );
// // }

// // export default Apps;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { Login, Signup } from "./pages";
// import Home from "./pages/Home";

// function Apps() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       {/* Wildcard MUST come last to act as the protected dashboard root */}
//       <Route path="/*" element={<Home />} />
//     </Routes>
//   );
// }

// export default Apps;


import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "./pages"; 
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify"; // [1] Import here
import "react-toastify/dist/ReactToastify.css";

function Apps() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      {/* [2] This single container handles ALL toasts for the whole app */}
      <ToastContainer limit={1} margin-top="50px" /> 
    </>
  );
}

export default Apps;