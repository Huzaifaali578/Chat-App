import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    // console.log(req.body)
    try {
        const { name, email, password, profile_pic } = req.body;
        // check email is already exist
        const checkUser = await userModel.findOne({ email });
        // if user exist
        if (checkUser) {
            return res.status(400).json({
                message: "User is already exist",
                error: true
            })
        };
        // if user not exist hashinsh pasaword
        const hashedPassword = await bcrypt.hash(password, 10)
        const payload = {
            name,
            email,
            password: hashedPassword,
            profile_pic
        };
        // save user to db
        const user = new userModel(payload);
        const userSaved = await user.save();
        res.status(200).json({
            message: "User create successFully",
            data: userSaved,
            success: true
        })


    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
};

export async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        // check email exist
        const userCheck = await userModel.findOne({ email }).select("-password");

        if (!userCheck) {
            return res.status(400).json({
                message: "User Not Found",
                error: true
            })
        };

        res.status(200).json({
            message: "user found",
            data: userCheck
        })
        
    }catch(error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export async function signIn(req, res) {
    try {
        const { password, userId } = req.body;
        // console.log(password)
        // check user 
        const user = await userModel.findOne({ _id : userId });
        // console.log(user)
        const hashedPassword = user.password
        // compare password
        const confirmPassword = await bcrypt.compare(password, hashedPassword)
        if (!confirmPassword) {
            return res.status(400).json({
                message: "wrong password",
                error: true
            })
        };
        // JWT Token
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: "1d" })

        const cookieOptions = {
            http: true,
            secure: true
        }
        
        res.cookie("token", token, cookieOptions ).status(200).json({
            message: "Login successfull",
            token: token,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export async function Logout(req, res) {
    try {
        const cookieOptions = {
            http: true,
            secure: true
        }
        return res.cookie("token", '', cookieOptions).status(200).json({
            message: "LogOut Successfull"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error
        })
    }
}