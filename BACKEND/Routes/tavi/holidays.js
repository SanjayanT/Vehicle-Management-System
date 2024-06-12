const router = require("express").Router();
const holidaySetting = require("../../Models/holiday");

//create

router.route("/addHolidays").post((req,res)=>{

    const busyDate = req.body.busyDate;
    const event = req.body.event;
   
    const newHolidaySetting = new holidaySetting({
        busyDate,
        event
    })

    newHolidaySetting.save().then(()=>{
        res.json("Holidays Setting Up Successfull");
    }).catch((err)=>{
        console.log(err);
    });
});

// read

router.route("/").get(async(req,res)=>{
    holidaySetting.find().then((holidays)=>{
        res.json(holidays);
    }).catch((err)=>{
        console.log(err);
    })
})

//update

router.route("/updateHoliday/:id").put(async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    // let holidayId = req.params.id;

    const{busyDate, event} = req.body; 

    const updateHolidaySetting = {
        busyDate, 
        event
    }
    console.log(updateHolidaySetting)

    const updateHolidays = await holidaySetting.findByIdUpdate(id, updateHolidaySetting)  //await - waiting until the before update finish to execute next update
    .then(()=>{  
        res.status(200).send({status: "Holidays Setting Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating holidays", error: err.message});
    })
 })

//fetch data related to the id
router.route("/get/:id").get(async(req,res)=>{
    let holidayId = req.params.id;
    console.log(holidayId);

    const holiday = await holidaySetting.findById(holidayId)

    .then((holiday)=>{
        res.status(200).send({status: "Holiday Fetched", holiday});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Can't find the requested holiday", error: err.message});
    });
})



//delete

router.route("/deleteHoliday/:id").delete(async(req, res)=>{
    let holidayId = req.params.id;
    await holidaySetting.findByIdAndDelete(holidayId)
    .then(()=> {
        res.status(200).send({status: "Holidays Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stats: "Error with deleting holidays", error:err.message});
    })
 })

 module.exports = router;