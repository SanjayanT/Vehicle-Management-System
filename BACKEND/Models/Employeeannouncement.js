const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema({


    date:{
        type: String,
        required: true
    },

    title : {
        type : String,
        required: true
    },

    announcement : {
        type : String,
        required: true
    }

    

})

const Employeeannouncement = mongoose.model("Employeeannouncement",announcementSchema);

module.exports = Employeeannouncement;