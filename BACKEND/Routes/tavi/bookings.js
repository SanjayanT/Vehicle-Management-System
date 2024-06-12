const router = require("express").Router();
let booking = require("../../Models/booking");

//create - working

router.route("/addBooking").post((req,res)=>{

    const fname = req.body.fname;
    const lname = req.body.lname;
    const address = req.body.address;
    const phoneNum = req.body.phoneNum;
    const eMail = req.body.eMail;
    const vNum = req.body.vNum;
    const vType = req.body.vType;
    const dDate = req.body.dDate;
    const tTime = req.body.tTime;
    const serviceBox = req.body.serviceBox;

    const newBooking = new booking({
        fname,
        lname,
        address,
        phoneNum,
        eMail, 
        vNum,
        vType,
        dDate,
        tTime,
        serviceBox
    })

    newBooking.save().then(()=>{
        res.json("Reservation Done");
    }).catch((err)=>{
        console.log(err);
    });
});

//read - working

router.route("/").get(async(req,res)=>{
    booking.find().then((bookings)=>{
        res.json(bookings);
    }).catch((err)=>{
        console.log(err);
    })
})

//update

router.route("/updateBooking/:id").put(async (req, res) => {
    const { id } = req.params;
    const { fname, lname, address, phoneNum, eMail, vNum, vType, dDate, tTime, serviceBox } = req.body;

    const updateBooking = {
        fname,
        lname,
        address,
        phoneNum,
        eMail,
        vNum,
        vType,
        dDate,
        tTime,
        serviceBox
    };

    try {
        const update = await booking.findByIdAndUpdate(id, updateBooking);
        if (!update) {
            return res.status(404).send({ status: "Booking not found" });
        }
        res.status(200).send({ status: "Booking Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

//fetch

router.route("/get/:id").get(async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await booking.findById(bookId);
        if (!book) {
            return res.status(404).send({ status: "Booking not found" });
        }
        res.status(200).send({ status: "Booking Fetched", book });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get booking", error: err.message });
    }
});


 //delete

 router.route("/delete/:id").delete(async(req, res)=>{
    let bookId = req.params.id;
    await booking.findByIdAndDelete(bookId)
    .then(()=> {
        res.status(200).send({status: "Booking Cancelled"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stats: "Error with deleting booking", error:err.message});
    })
 })

 
module.exports = router;