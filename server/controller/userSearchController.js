import userModel from "../models/userModel.js";

export async function searchUser(req, res) {
    try {
        const { search } = req.body;
        const query = new RegExp(search, "ig")

        const user = await userModel.find({
            "$or": [
                { name: query },
                {email: query}
            ]
        })

        return res.status(200).json({
            message: "All User",
            data: user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}