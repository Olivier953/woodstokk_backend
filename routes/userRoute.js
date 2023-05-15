const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")
const dotenv = require('dotenv')
dotenv.config()


router.post("/register", async (req, res) => {
    try {
        const userExist = await User.findOne({email : req.body.email})
        if(userExist){
            return res
            .status(400)
            .send({message : "User already exists", success : false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newuser = new User(req.body)
        await newuser.save();
        res
        .status(200)
        .send({message : "user created successfully", succes : true})
    } catch (error) {
        res
        .status(500)
        .send({message : "error creating user", succes : false, error})
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email : req.body.email})
        if(!user){
            return res
            .status(200)
            .send({ message : "User doesn't exist", success : false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res
            .status(200)
            .send({message : "password is incorrect", success : false})
        }else {
            const token = jwt.sign({id: user._id}, (process.env.JWT_SECRET), {
                expiresIn: "1d",
            })
            res
            .status(200)
            .send({ message:"login susccessful", success: true, data: token})
        }
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .send({message: "error logged in", success: false, error})
    }

})

router.post("/userinfo", authMiddleware, async (req, res) => {
            try {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user){
            return res
            .status(200)
            .send({ message : "User doesnt exist", success: false })
        }else{
            res.status(200).send({
                message: "User found", success: true, 
                data: user
        })
        }
    } catch (error) {
         return res.status(500)
            .send({ message : "error getting user info", success: false, error })
    }

})

module.exports = router