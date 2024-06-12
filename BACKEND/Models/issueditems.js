const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// schema (it's like an template)

const issueditemsSchema = new Schema({
    itemcode:{
        type:String,
        required: true
    },

    itemname:{
        type:String,
        required: true
    },
     
    price:{
        type:String,
        required: true
    },

    quantity:{
        type:String,
        required: true
    },

    issuedcode:{
        type:String,
        required: true
    },

  
   
   
})


const issueditems = mongoose.model("issueditems",issueditemsSchema);
module.exports = issueditems;