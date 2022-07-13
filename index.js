
// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
const express = require("express");
const app = express();
const connectDB = require("./config/db");

//connect database
connectDB();



const port = process.env.PORT || 5000 ; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
app.get("/", (req,res)=> res.send("API running"));