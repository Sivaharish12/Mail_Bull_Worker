require('dotenv').config()
const express=require('express')
const app=express()
const user_route=require('./Router/user');
const token_route=require('./Router/token');
const { errors } = require('celebrate');


app.use(express.json());
app.use('/user',user_route);
app.use('/',token_route);

app.use(errors());
app.use('/',(err,req,res,next)=>{
    if (err.name === 'CelebrationError') {
        return res.status(400).send(err.validation.message);
    }
    res.status(400).send(err.message);
})



app.listen(5000);