const decode=require('../util/decode_jwt')
const db=require('../models/index')
const { Error } = require('sequelize');




exports.user_detail = async (req, res, next) => {
    try{
        const decoded_access_token = decode.decode_jwt(req, res, next);
        const pk=decoded_access_token.id;
        const user=await db.sequelize.models.user.findByPk(pk);
        res.json(user);
    }
    catch(err){
        next(new Error(err));
    }
    
};




exports.user_detail_change=async (req,res,next)=>{
    const verify_token=decode.decode_jwt(req, res, next);
    const pk=req.params.id;
    if(verify_token.id==pk){
        const update=req.body;
        const keys=Object.keys(update)
        const user=await db.sequelize.models.user.findByPk(pk);
        if(user==null) next(new Error("User not found"));
        try{
            keys.forEach(key => {
                user[key]=update[key];
                user.save();
                console.log(key);
            });

        }
        catch(err){
            console.error(err);
        }
    res.send(user);
    }
    else{
        next(new Error("The user does not have permission to update the record"));
    }
}


exports.user_delete=async (req,res,next)=>{
    const verify_token=decode.decode_jwt(req, res, next);
    const delete_id=req.params.id;
    const user=await db.sequelize.models.user.findByPk(delete_id);
    if(user && user.id==verify_token.id){
        await user.destroy();
        res.send(`The user id:${delete_id} data deleted succesfully.`);
    }
    else if(user){
        next(new Error("Does not have permission"));
    }
    else{
        next(new Error("User not exist"));
    }
   
}


