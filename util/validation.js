const { celebrate ,Joi} = require("celebrate");

exports.signup_validation= () => celebrate({
    body:Joi.object({
        name:Joi.string().min(3).max(20).required(),
        password:Joi.string().min(8).max(18).required(),
        confirm_password:Joi.string().valid(Joi.ref("password")).required(),
        state:Joi.string().optional(),
        number:Joi.number().optional(),
        mail: Joi.string()
    })
});



exports.login_validation=()=>celebrate({
    body:Joi.object({
        mail:Joi.string().min(3).required(),
        password:Joi.string().min(8).max(20).required(),
    })
});


exports.token_validation=celebrate({
    body:Joi.object({
        token:Joi.string().required()
    })
});

exports.token_header_validation = celebrate({
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(true),     //This unknown(true) will set all the other headers as optional except for the ones which is mentioned inside the Joi.objects
  });   

exports.user_update_validation=celebrate({
    body:Joi.object({
        name:Joi.string().min(3).max(20).optional(),
        password:Joi.string().min(8).max(18).optional(),
        state:Joi.string().optional(),
        number:Joi.number().optional(),
    })
})