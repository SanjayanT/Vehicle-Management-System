const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payrollSchema = new Schema({

    nic : {
        type : String,
        required: true
    },

    name : {
        type : String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    otstatus : {
        type : String,
        required: true
    },

    otpayment : {
        type : Number,
        required: true
    },

    bonus : {
        type : Number,
        required: true
    },

    penaltyamt:{
        type: Number,
        required: true
    },

    salary:{
        type: Number,
        required: true
    }

})

const Employeepayroll = mongoose.model("Employeepayroll",payrollSchema);

module.exports = Employeepayroll;