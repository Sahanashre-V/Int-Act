const express = require("express");
const connectDB = require("./db/db")
const dotenv = require("dotenv");
dotenv.config();

const userAuth = require("./routes/auth") 


const app = express()
connectDB()

app.use(express.json())



const PORT = process.env.PORT || 5000;

app.use("/api/auth",userAuth)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
