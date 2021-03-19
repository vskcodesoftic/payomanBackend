# APIDocs PayOman

PayOman Api Routes

## Open Endpoints
Open endpoints require no Authentication.

* [HomePage](login.md) : `POST /`

## Merchant Routes

*  [merchantLogin] : `POST /api/merchant/login`
*  [merchantSignup] : `POST /api/merchant/signup`
*  [updatePassword] : `POST /api/merchant/updatePassword`
*  [forgetPassword] : `POST /api/merchant/forgotPassword`
*  [resetPasswordLink] : `POST /api/merchant/resetPasswordLink/:token`
*  [bankDetails] :     `POST /api/merchant//bankDetails`
*  [remainingBalance] : `GET /api/merchant/remainingBalance`
*  [getMerchantBankDetails] : `GET /api/merchant/resetPasswordLink/getMerchantBankDetails`   
*  [profile] : `POST /api/merchant/profile`
*  [completeProfile] : `GET /api/merchant/completeProfile`


## Customer Routes

*  [login] : `POST /api/customer/login`
*  [signup] : `POST /api/customer/signup`
*  [updatePassword] : `POST /api/customer/updatePassword`
*  [forgetPassword] : `POST /api/customer/forgotPassword`
*  [resetPasswordLink] : `POST /api/customer/resetPasswordLink/:token`

*  [profile] : `GET /api/customer/profile`
*  [profile] : `POST /api/customer/profile`


do replace server with actual production url   >env>SERVER


## DevelopedByCodeSoftic