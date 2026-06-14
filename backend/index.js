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
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://zerodha-clone-rosy-xi.vercel.app",
      "https://zerodha-clone-dashboard.vercel.app" 
    ],
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