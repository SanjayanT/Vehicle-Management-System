const router = require("express").Router();
let customer = require("../../Models/customer");

//create - working

router.route("/Register").post(async (req, res) => {
  const cname = req.body.cname;
  const cnic = req.body.cnic;
  const cpass = req.body.cpass;
  const cpass2 = req.body.cpass2;
  const cphone = req.body.cphone;
  const cmail = req.body.cmail;
  const cvnum = req.body.cvnum;
  const cvtype = req.body.cvtype;
  const exisitingEmail = await customer.findOne({ cmail });
  if (exisitingEmail) {
    return res.status(404).json({ message: "The Email alrady exsist" });
  }
 
  const newCustomer = new customer({
    cname,
    cnic,
    cpass,
    cpass2,
    cphone,
    cmail,
    cvnum,
    cvtype,
  });

  newCustomer
    .save()
    .then(() => {
      res.json("Registeration Done");
    })
    .catch((err) => {
      console.log(err);
    });
});

//read - working

router.route("/").get((req, res) => {
  customer
    .find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update for update customer

router.route("/update/:id").put(async (req, res) => {
  const {id}= req.params;
    console.log(id)
  const { cname, cnic, cphone, cmail, cpass, cpass2, cvnum, cvtype } = req.body;

  const Updatecustomer = {
    cname,
    cnic,
    cphone,
    cmail,
    cpass,
    cpass2,
    cvnum,
    cvtype,
  };
  try {
    const updatedCustomer = await customer.findByIdAndUpdate(id, Updatecustomer);
    res.status(200).send({ status: "Details Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

//delete

router.route("/delete/:id").delete(async (req, res) => {
  let cusid = req.params.id;
  await customer
    .findByIdAndDelete(cusid)
    .then(() => {
      res.status(200).send({ status: "Profile deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ stats: "Error with deleting Profile", error: err.message });
    });
});

//fetch data related to the id
router.route("/get/:id").get(async(req,res)=>{
  let id = req.params.id;
  console.log(id);
  
  const list = await customer.findById(id)
 
  .then((list)=>{
      res.status(200).send({status: "Hour Fetched", list});
  })
  .catch((err)=>{
      console.log(err);
      res.status(500).send({status: "Can't fin the requested hour", errot: err.message});
  });
  //update for update customer2

router.route("/update2/:id").put(async (req, res) => {
  const {id}= req.params;
    console.log(id)
  const { cname, cnic, cphone, cmail, cpass, cpass2, cvnum, cvtype } = req.body;

  const UpdateCustomersSecond = {
    cname,
    cnic,
    cphone,
    cmail,
    cpass,
    cpass2,
    cvnum,
    cvtype
  };
  try {
    const UpdatedCustomersSecond = await customer.findByIdAndUpdate(id, UpdateCustomersSecond);
    res.status(200).send({ status: "Details Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});
})



module.exports = router;
