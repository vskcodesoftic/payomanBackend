const express = require('express');
const { check } = require('express-validator')

const router = express.Router();

const merchantController = require('../controllers/merchant-controller')


router.get('/', (req, res, next) => {
 
  res.json({message: 'merchant page routes'});
});

//merchant signup
//for creating a new user
router.post('/signup',
[ check('name').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min : 6}),
  check('countryCode').isLength({min :2 , max:2}),
  check('businessName').not().isEmpty()
  
],merchantController.createMerchant);


//merchantlogin
router.post('/login' ,[ check('email').isEmail(), check('password').not().isEmpty()], merchantController.merchantLogin)

//update paswd
router.post('/u' ,[ check('email').isEmail(), check('password').not().isEmpty()], merchantController.updateMerchantPassword)


module.exports = router;