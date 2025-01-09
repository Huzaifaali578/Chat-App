import getUserDetailFromToken from "../commen/getUserDetailFromToken.js";
import userModel from "../models/userModel.js";

export async function getUserDatail(req, res) {
    try {
        const token = req.cookies.token;
        const user = await getUserDetailFromToken(token)
        console.log(user)
        return res.status(200).json({
            message: "User Detail",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error
        })
    }
}

export async function updateUserDetail(req, res) {
    try {
        const token = req.cookies.token;
        const user = await getUserDetailFromToken(token);

        const { name, profile_pic } = req.body;
        // update user name and profile_pic 
        const updateUser = await userModel.updateOne({ _id: user._id }, {
            name, 
            profile_pic
        })
        // console.log(updateUser)

        // after update get user updated Information
        const userUpdatedInformation = await userModel.findById(user._id)

        return res.status(200).json({
            message: "Update Successfully",
            data: userUpdatedInformation
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error
        })
    }
}