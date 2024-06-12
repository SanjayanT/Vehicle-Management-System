const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// schema (it's like an template)

const supplierSchema = new Schema({


    name : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    contact_2 : {
        type : String,
        required : true

    },
    Email :{
        type:String,
        required:true
    },
    Website :{
        type:String,
    },
    Main_supplies:{
        type: String,
        required:true
    },
    address : {
        type : String, 
        required : true
    },
    Additional_note:{
        type:String,
    }

})


const supplier = mongoose.model("Supplier",supplierSchema);

module.exports = supplier;
 
