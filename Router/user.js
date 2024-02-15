const express=require('express');
const route=express.Router();
const Controller=require('../Controller/control');
const Inp_Validator=require('../util/validation');
const user_Controller=require('../Controller/user')


route.post('/signup',Inp_Validator.signup_validation(),Controller.Signup);
route.get('/email/:mail',Controller.verified)
route.get('/detail',Inp_Validator.token_header_validation,user_Controller.user_detail);
route.put('/:id',Inp_Validator.token_header_validation,Inp_Validator.user_update_validation,user_Controller.user_detail_change);
route.delete('/:id',Inp_Validator.token_header_validation,user_Controller.user_delete);

module.exports=route;