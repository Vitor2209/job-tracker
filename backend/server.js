const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const jobRoutes = require("./routes/jobRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/jobs", jobRoutes)

// Rota base
app.get("/", (req, res) => {
  res.send("Job Tracker API is running 🚀")
})

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB connected")

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  })

})
.catch((error) => {
  console.log("MongoDB connection error:", error)
})