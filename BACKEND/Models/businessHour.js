const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hourSettingSchema = new Schema({

    day : {
        type : String,
        required : true
    },

    timeFrom : {
        type : String,
        required : true
    },

    timeTo : {
        type : String,
        required : true
    }
})

const hourSetting = mongoose.model("hourSetting", hourSettingSchema);
module.exports = hourSetting;