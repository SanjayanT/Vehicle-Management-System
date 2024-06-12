const router = require("express").Router();
let Staffdetails = require("../../Models/Staffdetails");

//http://localhost:8090/staff/add

router.route("/addstaff").post(async (req,res)=>{

    //async used for handle asynchronous operations

    const nic = req.body.nic;
    const name = req.body.name;
    const designation = req.body.designation;
    const address = req.body.address;
    const email = req.body.email;
    const mobileno = Number(req.body.mobileno);
    const joindate = req.body.joindate;

    // Check if a staff with the same NIC already exists
    const existingStaff = await Staffdetails.findOne({ nic });
    if (existingStaff) {
        return res.status(400).json({ message: 'The staff already exists with this NIC' });
    }
    //200 for success, 400 for bad request, 500 for internal server error
    //await ensures that the code execution waits until the database operation finishes before proceeding

    //If there are no any existing details, the new staff will be added here
    const newStaff = new Staffdetails({

        nic,
        name,
        designation,
        address,
        email,
        mobileno,
        joindate
    })
    
    //then / catch are used for handling asynchronous operations such as database queries

    newStaff.save().then(()=>{
        res.json("Staff Added")
    }).catch((err)=>{
        console.log(err); //debugging and identify issues
        res.status(500).json({ message: "Error adding staff", error: err.message });
                            
    })                     
})

//http://Localhost:8090/staff/
//Get all staff details

router.route("/").get((req,res)=>{

    Staffdetails.find().then((staffdetails)=>{
        res.json(staffdetails)
    }).catch((err)=>{
        console.log(err)
    })

})

//http//Localhost:8090/staff/update/..id

router.route("/editstaff/:id").put(async(req,res) => {

    let id = req.params.id;
    const {nic,name,designation,address,email,mobileno,joindate} = req.body;

    const updateStaff = {
    nic,
      name,
      designation,
      address,
      email,
      mobileno,
      joindate,
    }

    // Check if any required field is empty
    const requiredFields = ["nic", "name", "designation", "address", "email", "mobileno", "joindate"];
    const emptyFields = requiredFields.filter(field => !req.body[field]);
    
    if (emptyFields.length > 0) {
        return res.status(400).send({ message: `Fields cannot be empty: ${emptyFields.join(", ")}` });
    }

    //------------------
    try {
        // Check if the new NIC already exists for another staff member
        const existingStaff = await Staffdetails.findOne({ nic, _id: { $ne: id } }); // Exclude the current staff member being edited
        if (existingStaff) {
            return res.status(400).send({ message: 'Another staff member already exists with this NIC' });
        }

    // Update the staff member
    const update = await Staffdetails.findByIdAndUpdate(id, updateStaff)  //updateStaff means update panna vendiya data oda object
    
        res.status(200).send({status: "User updated"})
    } catch(err) {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    } 
})


//http//Localhost:8090/staff/delete/33huihfudf88

router.route("/delete/:_id").delete(async (req, res) => {
    let userId = req.params._id;

    await Staffdetails.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

//http://localhost:8090/staff/get/65e4bcc5440bc24613ae7a76
//How to get one staff details
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const staff = await Staffdetails.findById(userId)
    .then((staff) => {
        res.status(200).send({status: "User fetched", staff})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;