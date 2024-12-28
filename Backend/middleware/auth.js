import jwt from 'jsonwebtoken';

export const authentication = (req,res,next)=>{
    const token = req.headers.authentication?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Access Denied.No token provided "

        });
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        
        return res.status(403).json({
            success:false,
            message:"Invalid or Expired Token"
        });
    }
}
