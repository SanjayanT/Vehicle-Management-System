const mongoose =require('mongoose');

const Schema = mongoose.Schema;

// Function to format dates
function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("en-US");
    return formattedDate;
}

const jobSchema = new Schema({
    jobNumber : {
        type : String,
        required : true,
        unique : true
    },
    jobDate : {
        type : Date,
        required : true,
        
    },
    vehicleType : {
        type : String, 
        required : true
    },
    RegNo : {
        type : String,
        required : true
    },
    vehicleMake: {
        type : String,
        required : true
    },
    vehicleModel : {
        type : String,
        required : true
    },
    mileage : {
        type : Number, 
        required : true
    },
    year: {
        type : Number,
        required : true
    },
    timeIn : {
        type : String, 
        required : true
    },
    dateout : {
        type : Date, 
       
    },
    timeout : {
        type : String, 
       
    },
    name : {
        type : String, 
        required : true
    },
    contactNumber : {
        type : String, 
        required : true
    },
    email : {
        type :String
        
    },
    serviceType: {
        type : [String], 
        required : true
    },
    details : {
        type : String
    },
    // serviceStatus: {
    //     type: [String],
         
    //   }
})


jobSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.jobDate = formatDate(obj.jobDate);
    obj.dateout = formatDate(obj.dateout);
    return obj;
};

const job = mongoose.model("jobs",jobSchema);

module.exports = job;
 
