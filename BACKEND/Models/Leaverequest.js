const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({

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

    noofdays:{
        type: Number,
        required: true
    },

    reason : {
        type : String,
        required: true
    },

    status : {
        type : String,
        required: false
    }

    

    

})

const Leaverequest = mongoose.model("Leaverequest",leaveSchema);

module.exports = Leaverequest;