const router = require("express").Router();
let Employeeannouncement = require("../../Models/Employeeannouncement");

//http://localhost:8090/staff/add

router.route("/addannouncement").post((req,res)=>{

    const date = req.body.date;
    const title = req.body.title;
    const announcement = req.body.announcement;
    
    
    const newAnnouncement = new Employeeannouncement({

        date,
        title,
        announcement

    })

    newAnnouncement.save().then(()=>{
        res.json("Announcement Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//http://Localhost:8090/staff/
//Get all staff details

router.route("/").get((req,res)=>{

    Employeeannouncement.find().then((employeeannouncement)=>{
        res.json(employeeannouncement)
    }).catch((err)=>{
        console.log(err)
    })

})

//http//Localhost:8090/staff/update/..id

router.route("/editannouncement/:id").put(async(req,res) => {

    let id = req.params.id;
    const {date,title,announcement} = req.body;

    const updateAnnouncement = {
        date,
        title,
        announcement,
      
    }

    // Check if any required field is empty
    const requiredFields = ["date", "title", "announcement"];
    const emptyFields = requiredFields.filter(field => !req.body[field]);
    
    if (emptyFields.length > 0) {
        return res.status(400).send({ message: `Fields cannot be empty: ${emptyFields.join(", ")}` });
    }

    //------------------
    const update = await Employeeannouncement.findByIdAndUpdate(id, updateAnnouncement)  //updateAnnouncement means upadate panna vendiya data oda object
    .then(() => {

        res.status(200).send({message: "Announcement updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message: "Error with updating announcement", error: err.message});
    }) 
})


//http//Localhost:8090/staff/delete/33huihfudf88

router.route("/delete/:_id").delete(async (req, res) => {
    let userId = req.params._id;

    await Employeeannouncement.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Announcement deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting announcement", error: err.message});
    })
})

//http://localhost:8090/staff/get/65e4bcc5440bc24613ae7a76
//How to get one staff details
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const announcement = await Employeeannouncement.findById(userId)
    .then((announcement) => {
        res.status(200).send({status: "Announcement fetched", announcement})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting announcement", error: err.message});
    })
})

module.exports = router;