const router = require("express").Router();
let hourSetting = require("../../Models/businessHour");


//create

router.route("/addHourSetting").post(async(req,res)=>{

    const day = req.body.day;
    const timeFrom = req.body.timeFrom;
    const timeTo = req.body.timeTo;
    
    const newHourSetting = new hourSetting({
        day,
        timeFrom,
        timeTo
    })

    newHourSetting.save().then(()=>{
        res.json("Business Hours Setting Up Successfull");
    }).catch((err)=>{
        console.log(err);
    })
})

// read

router.route("/").get((req,res)=>{
    hourSetting.find().then((businessHours)=>{
        res.json(businessHours);
    }).catch((err)=>{
        console.log(err);
    })
})

//update

router.route("/updateSetting/:id").put(async(req,res)=>{
    const {id}= req.params;
    console.log(id)
    const{day, timeFrom, timeTo} = req.body; 

    const updateSetting = {
        day, 
        timeFrom,
        timeTo
    }
    console.log(updateSetting)

    const updateHours = await hourSetting.findByIdAndUpdate(id,updateSetting)  //await - waiting until the before update finish to execute next update
    .then(()=>{  
        res.status(200).send({status: "Business Hours Setting Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating business hours", error: err.message});
    });
 });


//fetch data related to the id
router.route("/get/:id").get(async(req,res)=>{
    let settingId = req.params.id;
    console.log(settingId);

    const hour = await hourSetting.findById(settingId)
   
    .then((hour)=>{
        res.status(200).send({status: "Hour Fetched", hour});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Can't find the requested hour", error: err.message});
    });
})

//delete

router.route("/deleteSetting/:id").delete(async(req, res)=>{
    let settingId = req.params.id;
    await hourSetting.findByIdAndDelete(settingId)
    .then(()=> {
        res.status(200).send({status: "Business Hours Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stats: "Error with deleting business hours", error:err.message});
    })
 })

 module.exports = router;