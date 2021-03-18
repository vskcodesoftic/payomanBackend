const express = require('express');
const { check } = require('express-validator')

const router = express.Router();

const customerController = require('../controllers/customer-controller')


router.get('/', (req, res, next) => {
 
  res.json({message: 'customer page routes'});
});

//customer signup
//for creating a new customer
router.post('/signup',
[ check('name').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min : 6}),
  check('countryCode').isLength({min :2 , max:2}),
  check('phoneNumber').not().isEmpty(),
  check('pin').not().isEmpty()
  
],customerController.createCustomer);


//merchantlogin
router.post('/login' ,[ check('email').isEmail(), check('password').not().isEmpty()], customerController.customerLogin)

module.exports = router;