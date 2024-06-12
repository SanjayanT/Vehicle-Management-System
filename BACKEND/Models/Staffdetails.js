const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({

    nic : {
        type : String,
        required: true
    },

    name : {
        type : String,
        required: true
    },

    designation : {
        type : String,
        required: true
    },

    address : {
        type : String,
        required: true
    },

    email : {
        type : String,
        required: true
    },

    mobileno:{
        type: Number,
        required: true
    },

    joindate:{
        type: String,
        required: true
    }

})

const Staffdetails = mongoose.model("Staffdetails",staffSchema);

module.exports = Staffdetails;