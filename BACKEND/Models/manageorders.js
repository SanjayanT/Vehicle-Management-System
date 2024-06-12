const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// schema (it's like an template)

const manageorderSchema = new Schema({
    itemcode:{
        type:String,
        required: true
    },

    itemname:{
        type:String,
        required: true
    },
     
    suppliername:{
        type:String,
        required: true
    },

    needquantity:{
        type:String,
        required: true
    },

    ordercode:{
        type:String,
        required: true
    },

  
   
   
})


const manageorders = mongoose.model("manageorders",manageorderSchema);

module.exports = manageorders;