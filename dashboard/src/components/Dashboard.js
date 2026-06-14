import React from "react";
import { Route, Routes } from "react-router-dom";

import Funds from "./Funds";
import Holdings from "./Holdings";
import AppList from "./AppList";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = ({ username }) => {
  return (
    <div className="dashboard-container">
      {/* CRITICAL FIX: Pass the username prop to the Provider.
        This allows BuyActionWindow to access generalContext.username 
      */}
      <GeneralContextProvider username={username}> 
        <WatchList />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Summary username={username} />} />
            
            {/* Orders correctly receives the filter prop */}
            <Route path="/orders" element={<Orders userEmail={username} />} />
            
            <Route path="/holdings" element={<Holdings/>} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<AppList />} />
          </Routes>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;

// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import Funds from "./Funds";
// import Holdings from "./Holdings";
// import AppList from "./AppList";
// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = ({ username }) => {
//   return (
//     <div className="dashboard-container">
//       <GeneralContextProvider>
//         <WatchList />
//       </GeneralContextProvider>
//       <div className="content">
//         <Routes>

//           <Route exact path="/" element={<Summary username={username} />} />
//           <Route path="/orders" element={<Orders userEmail={username} />} />
          
//           <Route path="/holdings" element={<Holdings />} />
//           <Route path="/positions" element={<Positions />} />
//           <Route path="/funds" element={<Funds />} />
//           <Route path="/apps" element={<AppList />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;