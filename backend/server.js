require('dotenv').config();           
const express = require("express");   
const mongoose = require("mongoose"); 
const cors = require("cors");         
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// ✅ middleware must come first
app.use(cors());
app.use(express.json());

// ✅ then routes

app.use("/api/todos", todoRoutes);

console.log("ENV:", process.env.MONGO_URI);

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});