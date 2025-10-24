import genToken from "../config/genToken.js";
import User from "../model/usermodel.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        let { firstName,lastName,email,password,confirmPassword } = req.body;
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ message: "Already Exist email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter Strong Password" })
        }
        const hassedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hassedPassword,
            confirmPassword
        });
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none"
        })
        // return res.status(200).json(user)
        res.status(201).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePic: user.profilePic || null
});
    } catch (error) {
        console.log("Signup Error", error)

    }
}


export const signin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email Incorrect" })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Password Incorrect" })
        }
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none"
        })
        // return res.status(200).json(user)
        res.status(201).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePic: user.profilePic || null
});
    } catch (error) {
        console.log("Signin Error", error)

    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout Succesfully " })
    } catch (error) {
        console.log("Logout Error", error)

    }
}