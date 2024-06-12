const router = require("express").Router();
let Leaverequest = require("../../Models/Leaverequest");

//http://localhost:8090/staff/add

router.route("/addleaverequest").post((req,res)=>{

    const nic = req.body.nic;
    const name = req.body.name;
    const date = req.body.date;
    const noofdays = Number(req.body.noofdays);
    const reason = req.body.reason;
    // const status = req.body.status;
    
    const newLeaverequest = new Leaverequest({

        nic,
        name,
        date,
        noofdays,
        reason,
        //status
    })

    newLeaverequest.save().then(()=>{
        res.json("Leave Request Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//http://Localhost:8090/staff/
//Get all staff details

router.route("/").get((req,res)=>{

    Leaverequest.find().then((leaverequest)=>{
        res.json(leaverequest)
    }).catch((err)=>{
        console.log(err)
    })

})

//http//Localhost:8090/staff/update/..id

router.route("/editleaverequest/:id").put(async(req,res) => {

    let id = req.params.id;
    const {nic,name,date,noofdays,reason,status} = req.body;

    const updateLeaverequest = {
    nic,
      name,
      date,
      noofdays,
      reason,
      status,
    }

    // Check if any required field is empty
    const requiredFields = ["nic", "name", "date", "noofdays", "reason", "status"];
    const emptyFields = requiredFields.filter(field => !req.body[field]);
    
    if (emptyFields.length > 0) {
        return res.status(400).send({ message: `Fields cannot be empty: ${emptyFields.join(", ")}` });
    }

    //------------------
    const update = await Leaverequest.findByIdAndUpdate(id, updateLeaverequest)  //updateStaff means upadate panna vendiya data oda object
    .then(() => {


        res.status(200).send({status: "Leave Request updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating leave request", error: err.message});
    }) 
})


//http//Localhost:8090/staff/delete/33huihfudf88

router.route("/delete/:_id").delete(async (req, res) => {
    let userId = req.params._id;

    await Leaverequest.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Leave request deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete leave request", error: err.message});
    })
})

//http://localhost:8090/staff/get/65e4bcc5440bc24613ae7a76
//How to get one staff details
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const leave = await Leaverequest.findById(userId)
    .then((leave) => {
        res.status(200).send({status: "Leave request fetched", leave})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting leave request", error: err.message});
    })
})

module.exports = router;