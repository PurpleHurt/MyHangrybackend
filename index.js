

// CONFIGURATION / MIDDLEWARE
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors');

app.use(cors())
//connect database
connectDB();

// app.get("/", (req,res)=> res.send("API running"));

//Init Middleware
app.use(express.json({extended:false}));
//Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/comment', require('./routes/api/comment'));
app.use('/api/recipe', require('./routes/api/recipe'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/recipe/newrecipe', require('./routes/api/recipe'));



const port = process.env.PORT || 5000 ; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

