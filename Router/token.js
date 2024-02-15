const express=require('express');
const route=express.Router();
const Controller=require('../Controller/control');
const Inp_Validator=require('../util/validation');

route.post('/login',Inp_Validator.login_validation(),Controller.login);
route.post('/refreshtoken',Inp_Validator.token_validation,Controller.refresh_token);

module.exports=route;