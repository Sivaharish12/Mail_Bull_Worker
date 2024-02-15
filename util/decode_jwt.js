const jwt=require('jsonwebtoken')

exports.decode_jwt=(req,res,next)=>{
        const auth_header=req.headers['authorization'];
        const access_token=auth_header.split(' ')[1];
        const decoded_access_token=jwt.decode(access_token);
        return decoded_access_token;
    }