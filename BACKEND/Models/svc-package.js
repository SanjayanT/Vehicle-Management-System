const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// schema 

const packageSchema = new Schema({
   
    name : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    unitprice : {
        type : Number, 
        required : true
    },
    category : {
        type : String, 
        required : true
    },
   
})


const package = mongoose.model("Packages",packageSchema);

module.exports = package;
 
