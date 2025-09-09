const express = require("express");
const connectDB = require("./db/db")
const dotenv = require("dotenv");
dotenv.config();

const app = express()
connectDB()

app.use(express.json())



const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World"})    
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
