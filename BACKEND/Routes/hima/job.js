const router = require("express").Router();

let jobModel = require("../../Models/jobs");

const mongoose = require('mongoose');

//Fetch data from the frontend

router.route("/addJob").post((req, res) => {
  const jobNumber = req.body.jobNumber;
  const jobDate = req.body.jobDate;
  const vehicleType = req.body.vehicleType;
  const RegNo= req.body.RegNo;
  const vehicleMake= req.body.vehicleMake;
  const vehicleModel= req.body.vehicleModel;
  const mileage= req.body.mileage;
  const year= req.body.year;
  const timeIn= req.body.timeIn;
  const timeout= req.body.timeout;
  const dateout= req.body.dateout;
  const name= req.body.name;
  const contactNumber= req.body.contactNumber;
  const email= req.body.email; 
  const serviceType= req.body.serviceType;
  const details= req.body.details;
  
  

  const newJob = new jobModel({
    jobNumber,
    jobDate,
    vehicleType,
    RegNo,
    vehicleMake,
    vehicleModel,
    mileage,
    year,
    timeIn,
    timeout,
    dateout,
    name,
    contactNumber,
    email,    
    serviceType,
    details,

    serviceStatus: serviceType.reduce((acc, type) => {
      acc[type] = false; // Default initialization, all tasks start as not completed
      return acc;
    }, {}),
    
  });

  //Pass data to the database

  newJob
    .save()
    .then(() => {
      res.json("New job added");
    })
    .catch((err) => {
      console.log(err);
    });
});


//Fetching data from the database
router.route("/viewjobs").get((req, res) => {
  jobModel
    .find()
    .then((jobs) => {
      res.json(jobs);
    })
    .catch((err) => {
      console.log(err);
    });
});




//Fetch data related to the job number
router.get('/details/:jobNumber', async (req, res) => {
  const jobNumber = req.params.jobNumber;

  try {
    // Query the database to find the document with the jobNumber
    const details = await jobModel.findOne({ jobNumber });

    if (!details) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json(details);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



//Delete Job function
router.route("/delete/:_id").delete(async (req, res) => {
  let jobId = req.params._id;

  await jobModel.findByIdAndDelete(jobId)
  .then(() => {
      res.status(200).send({status: "Job deleted"});
  }).catch((err) => {
      console.log(err.message);
      res.status(500).send({status: "Cannot delete the job", error: err.message});
  })
})


//Update job function
router.route("/updatejobs/:id").put(async (req,res) => {

  let jobNumber = req.params.id;
  const {
    jobnumber,
    jobDate,
    vehicleType,
    RegNo,
    vehicleMake,
    vehicleModel,
    mileage,
    year,
    timeIn,
    timeout,
    dateout,
    name,
    contactNumber,
    email,    
    serviceType,
    details,
    serviceStatus} = req.body;

  const updateJob = {
    jobnumber,
    jobDate,
    vehicleType,
    RegNo,
    vehicleMake,
    vehicleModel,
    mileage,
    timeIn,
    year,
    timeout,
    dateout,
    name,
    contactNumber,
    email,
    serviceType,
    details,
    serviceStatus,
  }

 const update = await jobModel
 .findByIdAndUpdate(jobNumber, updateJob)
 .then(() => {
      res.status(200).send({ status : "Job Updated successfully"});
  })
 .catch((err) => {
    console.log(err);
    res.status(500).send({ status : "Job cannot be updated" });
  });
});


//update job status

router.put("/updatejobstatus/:jobId", async (req, res) => {
  const jobId = req.params.jobId; // Custom job ID
  const { serviceStatus } = req.body;

  if (!serviceStatus) {
    return res.status(400).send({ status: "Service status is required" });
  }

  let formattedServiceStatus;

  // Check if serviceStatus is an array of strings
  if (Array.isArray(serviceStatus)) {
    formattedServiceStatus = serviceStatus;
  } else if (typeof serviceStatus === "string") {
    // If it's a single string, put it into an array
    formattedServiceStatus = [serviceStatus];
  } else if (typeof serviceStatus === "object") {
    // If it's an object, convert it to an array of strings
    formattedServiceStatus = Object.keys(serviceStatus);
  } else {
    // If it's not a valid format, return an error
    return res.status(400).send({ status: "Invalid service status format" });
  }

  try {
    const updatedJob = await jobModel.findOneAndUpdate(
      { jobNumber: jobId }, // Query by custom job ID
      { $set: { serviceStatus: formattedServiceStatus } },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).send({ status: "Job not found" });
    }

    res.status(200).send({
      status: "Service status updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    console.error("Error updating service status:", err);
    res.status(500).send({ status: "Service status could not be updated" });
  }
});


//Fetch data related to the id
router.route("/get/:id").get(async (req, res) => {
  let jobNumber = req.params.id;
  console.log();
  const job = await jobModel
    .findById(jobNumber)
    .then((job) => {
      res.status(200).send({ status: "Job fetched", job });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Can't find the requested job", error: err.message });
    });
});


//Fetch service type data
router.get("/trackjobs/:jobNumber", async (req, res) => {
  try {
    const jobNumber = req.params.jobNumber;

    const job = await jobModel.findOne({ jobNumber }); // Use findOne to fetch by unique job number

    if (!job) {
      return res.status(404).send("Job not found");
    }

    // Return the serviceType and possibly other relevant data (like serviceStatus)
    res.send({
      serviceType: job.serviceType,
      serviceStatus: job.serviceStatus || {}, // Include serviceStatus if implemented
    });

  } catch (error) {
    console.error("Error fetching job data:", error);
    res.status(500).send("Internal Server Error");
  }
});












module.exports = router;