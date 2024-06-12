const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({

    cname : {
        type : String,
        required : true
    },
    cnic : {
        type : String,
        required : true
    },
    cphone : {
        type : String, 
        required : true
    },
    cpass: {
        type : String,
        required : true
    },
    cpass2: {
        type : String,
        required : true
    },

    cmail : {
        type : String,
        required : true
    },

    cvnum : {
        type : String,
        required : true
    },

    cvtype : {
        type : String,
        required : true
    }

})


const customer = mongoose.model("Register",customerSchema);

module.exports = customer;
 
