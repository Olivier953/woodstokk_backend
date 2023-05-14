const express = require("express")
const cors = require("cors")
const { mongoose } = require("mongoose")
const app = express()
app.use(express.json())
const userRoute = require("./routes/userRoute")
app.use(cors())

const mongoURL = 
"mongodb+srv://exotico:lG73HyFcNaCI8eck@cluster0.b0tscnh.mongodb.net/woodstokk"

app.use("/user", userRoute)

mongoose.connect(mongoURL)
.then(() => console.log("connected to mongoDB"))
.catch((err) => console.log(err))

app.listen(5000, () => {
    console.log("Server started at 5000!")
})
