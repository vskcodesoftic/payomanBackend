
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const { validationResult } = require('express-validator')
const  Customer = require('../models/customer-schema')

const HttpError = require('../models/http-error');

const {  sendEmail  ,sendEmailOtpLink } = require('../services/mail.service');


//Customer signup

const createCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        const error =  new HttpError("invalid input are passed,please pass valid data",422)
        return next(error)
    }
    const { name, email, password , pin , countryCode , phoneNumber } = req.body;
   
     
    let existingUser
    try{
         existingUser = await Customer.findOne({ email : email })
    }
    catch(err){
        const error = await new HttpError("something went wrong,creating a user failed",500)
        return next(error)
    }
    if(existingUser){
        const error = new HttpError("user already exists",422)
        return next(error)
    }
  
    
    let hashedPassword;
  
   try{
    hashedPassword = await bcrypt.hash(password, 12)
   } 
   catch(err){
       const error = new HttpError("could not create customer",500);
       return next(error)
   }


    const createdCustomer = new Customer({
        name,
        email,
        password: hashedPassword,
        pin,
        countryCode,
        phoneNumber,
     
    })

    try {
        await createdCustomer.save();
      } catch (err) {
        const error = new HttpError(
          'Creating Customer failed, please try again.',
          500
        );
        console.log(err)
        return next(error);
      }

      let token;
      try{
        token = await jwt.sign({
            userId : createdCustomer.id,
            email : createdCustomer.email 
             },
            process.env.JWT_KEY,
            {expiresIn :'1h'}
            )

      }
     catch (err) {
        const error = new HttpError(
          'CreatingCustomer failed, please try again.',
          500
        );
        return next(error);
      }
    
     
    res.status(201).json({ userId : createdCustomer.id,email : createdCustomer.email ,countrycode :createdCustomer.countryCode , phoneNumber :createdCustomer.phoneNumber, token: token})
}


//Customer login 
const  customerLogin = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        const error =  new HttpError("invalid input are passed,please pass valid data",422)
        return next(error)
    }

    const { email,password } = req.body;

    let customer
    try{
         customer = await Customer.findOne({ email : email  })
    }
    catch(err){
        const error = await new HttpError("something went wrong,logging in failed",500)
        return next(error)
    }

    if(!customer){
        const error = new HttpError("invalid credentials could not log in",401)
        return next(error)
    }
  
   let isValidPassword = false; 
   try{
         isValidPassword = await bcrypt.compare(password, customer.password)
   }
   catch(err){
    const error = await new HttpError("invalid credentials try again",500)
    return next(error)
}

if(!isValidPassword){
    const error = new HttpError("invalid credentials could not log in",401)
    return next(error)
}

let token;
try{
  token = await jwt.sign({
      userId : customer.id,
      email : customer.email },
      process.env.JWT_KEY,
      {expiresIn :'1h'}
      )

}
catch (err) {
  const error = new HttpError(
    'LogIn failed, please try again.',
    500
  );
  return next(error);
} 

res.json({ 
    message : 'customer logged in successful' , 
    userId : customer.id,
    email : customer.email , 
    token: token})

}







exports.createCustomer =    createCustomer;
exports.customerLogin = customerLogin;
