const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holidaySettingSchema = new Schema({

    busyDate : {
        type : Date,
        required : false
    },

    event : {
        type : String,
        required : false
    }
})

const holidaySetting = mongoose.model("holidaySetting", holidaySettingSchema);
module.exports = holidaySetting;