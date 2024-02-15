const jwt=require('jsonwebtoken')
const decode=require('../util/decode_jwt')
const db=require('../models/index')
const user=require('../models/user');
const { Error } = require('sequelize');
const mailf=require('../worker/producer/work_adder');
const { use } = require('../Router/user');


let count=0;

exports.Signup=async (req,res,next)=>{
    console.log(req.body);
    const {name,password,confirm_password,number,mail}=req.body;
    try{
        const user=await db.sequelize.models.user.create({name,password,confirm_password,number,mail});
        res.json(user)
        mailf(user.mail);
        console.log(user.mail);
        console.log("success!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

exports.verified=async (req,res,next)=>{
    const mail=req.params.mail;
    const user=await db.sequelize.models.user.findOne({where:{mail:mail}});
    if(user==null) next(new Error("User not found"));
    user.verified=true;
    user.save();
    res.send("Verified!");
}

exports.login=async (req,res,next)=>{
    console.log("LOGIN!");
    const mail=req.body.mail;
    const user=await db.sequelize.models.user.findOne({where :{mail:mail}});
    if(user==null) throw new Error("The user is empty");
    const user_obj_sign={id:user.id}
    console.log(user.verified);
    if(user.password===req.body.password && user.verified){
            const refresh_tocken=jwt.sign(user_obj_sign,process.env.REFRESH_TOKEN_SECRET);
            const access_token=jwt.sign(user_obj_sign,process.env.ACCESS_TOKEN_SECRET,{expiresIn : '30m'});
            res.json({access_token:access_token,refresh_tocken:refresh_tocken});
        
    }
    else{
        next( new Error(`Password Mismatch ${user.verified}`));
    }
}

exports.refresh_token=(req,res,next)=>{
    const token=req.body.token;
    const verify_token=jwt.decode(token);
    console.log(verify_token);
    if(verify_token){
        const access_token=jwt.sign({id:verify_token.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"});
        const decoded_access_token=jwt.decode(access_token);
        const expirationDate = new Date(decoded_access_token.exp * 1000);
        res.send({ access_token, expirationDate });
    }
    else {
    throw new Error("The Token is tampered");
    }
}


