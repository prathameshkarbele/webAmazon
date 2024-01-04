import  jwt  from "jsonwebtoken";
import  {USER}  from "../Model/user̥Shemam.js";



export const athenticate = async(req,res,next) =>{
    const secretKey = process.env.KEY;
    try {
        const token = req.cookies.Amazonweb;
        const verifyToken = jwt.verify(token,secretKey)

        console.log(verifyToken,"VerifyToken")

        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token})
        console.log(rootUser,"rootUser")
        if(!rootUser) {throw new Error("User Not Found")};

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("unauthenticated: No token provide")
        console.log(error)
    }
}