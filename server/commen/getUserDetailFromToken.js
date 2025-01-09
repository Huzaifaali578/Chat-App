import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const getUserDetailFromToken = async(token) => {
    // decode token
    const decode = await jwt.decode(token, process.env.JWT_SECREAT_KEY)

    if (!decode) {
        return "token expied"
    }

    const user = await userModel.findById(decode.id).select("-password");
    return user
}

export default getUserDetailFromToken;