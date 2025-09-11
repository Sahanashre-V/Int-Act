const express = require("express");
const connectDB = require("./db/db")
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const userAuthRoute = require("./routes/authRoute") 
const classRoute = require("./routes/classRoute");
const subjectRoute = require("./routes/subjectRoute")
const quizRoute = require("./routes/quizRoute")

const app = express()
connectDB()
 
app.use(cors())

app.use(express.json())



const PORT = process.env.PORT || 5000;

app.use("/api/auth",userAuthRoute)
app.use("/api/class",classRoute)
app.use("/api/subject",subjectRoute)
app.use("/api/quiz",quizRoute)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
