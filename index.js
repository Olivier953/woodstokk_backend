const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const { mongoose } = require("mongoose")
const app = express()
app.use(express.json())
const userRoute = require("./routes/userRoute")
app.use(cors())

app.use("/user", userRoute)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("connected to mongoDB"))
.catch((err) => console.log(err))

app.listen(5000, () => {
    console.log("Server started at 5000!")
})
