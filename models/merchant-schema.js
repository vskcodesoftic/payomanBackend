const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const merchantSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String , required: true},
    businessName :{ type :String, required : true },
    countryCode : {type : Number, required : true},
    phoneNumber : { type : Number, required : true},
    otpHex: { type: String },
    resetToken:{ type:String },
    expireToken:{ type:Date },
    profilePic :{type:String}    
}, { versionKey: false });

merchantSchema.plugin(uniqueValidator)


module.exports = mongoose.model('Merchant', merchantSchema);