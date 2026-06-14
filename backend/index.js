// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// // Routes & Models
// const authRoute = require("./Routes/AuthRoute");
// const { HoldingsModel } = require("./model/HoldingsModel");
// const { PositionsModel } = require("./model/PositionsModel");
// const { OrdersModel } = require("./model/OrdersModel");

// const app = express();
// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// // --- 1. Middleware Configuration ---
// app.use(
//   cors({
//     origin: ["http://localhost:3001"], // Your Frontend Dashboard Port
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Required for JWT session cookies
//   })
// );

// app.use(cookieParser());
// app.use(express.json());

// // --- 2. Routes ---

// // Auth Routes (Signup, Login, Verification)
// app.use("/", authRoute);

// /**
//  * GET: Fetch only orders belonging to the logged-in user.
//  * Triggered by: Dashboard -> Orders page
//  * Logic: Filters by userEmail passed in the query params.
//  */
// app.get("/allOrders", async (req, res) => {
//   try {
//     const { email } = req.query; // Capture email from: axios.get(url?email=...)
    
//     if (!email) {
//       return res.status(400).json({ message: "User email is required for filtering" });
//     }

//     // [TOPPER-LEVEL] Filter by userEmail and sort by most recent first
//     let userOrders = await OrdersModel.find({ userEmail: email }).sort({ createdAt: -1 });
    
//     //console.log(`📥 Found ${userOrders.length} orders for ${email}`);
//     res.json(userOrders);
//   } catch (err) {
//     console.error("Fetch Orders Error:", err);
//     res.status(500).json({ message: "Error fetching orders from database" });
//   }
// });

// /**
//  * POST: Save a new order tagged with the user's email.
//  * Triggered by: Watchlist -> Buy/Sell button
//  */
// app.post("/newOrder", async (req, res) => {
//   try {
//     const { name, qty, price, mode, userEmail } = req.body;

//     if (!userEmail) {
//       return res.status(400).send("User email is required to place an order");
//     }

//     let newOrder = new OrdersModel({
//       name,
//       qty,
//       price,
//       mode,
//       userEmail, // Links this trade to Aditya or Tony
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order saved successfully!" });
//   } catch (err) {
//     console.error("Save Order Error:", err);
//     res.status(500).send("Error saving order to database");
//   }
// });

// // Standard Data Routes
// app.get("/allHoldings", async (req, res) => {
//   try {
//     let allHoldings = await HoldingsModel.find({});
//     res.json(allHoldings);
//   } catch (err) {
//     res.status(500).send("Error fetching holdings");
//   }
// });

// app.get("/allPositions", async (req, res) => {
//   try {
//     let allPositions = await PositionsModel.find({});
//     res.json(allPositions);
//   } catch (err) {
//     res.status(500).send("Error fetching positions");
//   }
// });

// // --- 3. Server & DB Connection ---
// mongoose
//   .connect(uri, {
//     maxPoolSize: 10, 
//     serverSelectionTimeoutMS: 5000, 
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ DB Connection Error:", err);
//   });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes & Models
const authRoute = require("./Routes/AuthRoute");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// --- 1. Middleware Configuration ---
app.use(
  cors({
    origin: ["http://localhost:3001"], // Your Frontend Dashboard Port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());

// --- 2. Routes ---

app.use("/", authRoute);

/** * ORDERS: Fetch & Save
 */
app.get("/allOrders", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    // Filter by user and show newest first
    let userOrders = await OrdersModel.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode, userEmail } = req.body;
    if (!userEmail) return res.status(400).send("User email required");

    let newOrder = new OrdersModel({ name, qty, price, mode, userEmail });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (err) {
    res.status(500).send("Error saving order");
  }
});

/** * HOLDINGS: Filtered by User
 */
app.get("/allHoldings", async (req, res) => {
  try {
    const { email } = req.query;
    // Only find holdings belonging to this specific user
    let query = email ? { userEmail: email } : {}; 
    
    let userHoldings = await HoldingsModel.find(query);
    res.json(userHoldings);
  } catch (err) {
    console.error("Fetch Holdings Error:", err);
    res.status(500).send("Error fetching holdings");
  }
});

/** * POSITIONS: Filtered by User
 */
app.get("/allPositions", async (req, res) => {
  try {
    const { email } = req.query;
    let query = email ? { userEmail: email } : {};

    let userPositions = await PositionsModel.find(query);
    res.json(userPositions);
  } catch (err) {
    console.error("Fetch Positions Error:", err);
    res.status(500).send("Error fetching positions");
  }
});

// --- 3. Server & DB Connection ---
mongoose
  .connect(uri, {
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });