const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

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

    attendance:{
        type: Number,
        required: true
    }

    

})

const Employeeattendance = mongoose.model("Employeeattendance",attendanceSchema);

module.exports = Employeeattendance;