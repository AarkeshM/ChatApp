import jwt from "jsonwebtoken";

const isAunthenticated = async (req,res,next) => {
    try{
        const token  = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"user not aunthenticated."})
        };
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({message:"Invalid token"});
        };
        req.id = decode.userId;
        next();
    }catch(error){
        console.log(error);
    }
};
export default isAunthenticated;

const req = {
    id:"",
}
req.id = "azsxdcfvgb"