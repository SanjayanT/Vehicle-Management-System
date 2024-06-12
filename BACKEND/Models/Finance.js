const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financeSchema = new Schema({

    transactionCode :{
        type : String,
        required : true
    },

    date : { 
        type : String,
        required : true
    },
    
    description : { 
        type : String,
        required : true
    },
   
    paymentType : { //Card(credit/debit) or cash
        type : String,
        required : true
    },
    
    amount : { 
        type : Number,
        required : true
    },
    
    accounts : { //Income or Expanses
        type : String,
        required : true
    },
    
    department : { 
        type : String,
        required : true
    },

})

const Finance = mongoose.model("Finance",financeSchema);

module.exports = Finance;