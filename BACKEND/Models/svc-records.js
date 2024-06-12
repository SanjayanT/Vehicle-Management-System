//import mongoose from 'mongoose';
const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//shema
const serviceRecordSchema = new Schema({
   

   

    service :{
        type : String,
        required : true
    },
    customer : {
        type : String, 
        required : true
    },
    date : {
        type : Date, 
        required : true
    },
    category : {
        type : String, 
        required : true
    },
   
    
})


const ServiceRecord = mongoose.model('ServiceRecord',serviceRecordSchema);

module.exports = ServiceRecord;