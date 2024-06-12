const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// schema (it's like an template)

const managepartsSchema = new Schema({
    itemcode:{
        type:String,
        required: true
    },

    itemname:{
        type:String,
        required: true
    },
     
    category:{
        type:String,
        required: true
    },

  

    price:{
        type:String,
        required: true
    },

    suppliername:{
        type:String,
        required: true
    },


    reorderlevel: {
        type: Number, 
        required: true
    },


    stocklimit:{
        type:String,
        required: true
    },

    remark:{
        type:String,
        required: true
    },

   
    isactive:{
        type:String,
        required: true
    },

   
})


const manageparts = mongoose.model("manageparts",managepartsSchema);

module.exports = manageparts;