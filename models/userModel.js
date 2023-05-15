const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, 
{
    timestamps : true
}
)
console.log("ma")

const userModel = mongoose.model("userInfo", userSchema)

module.exports = userModel
