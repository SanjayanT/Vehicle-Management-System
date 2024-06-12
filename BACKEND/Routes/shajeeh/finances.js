const router = require("express").Router();
let Finance = require("../../Models/Finance");

//CRUD (CREATE) code segment
router.route("/add").post(async(req,res)=>{

    const transactionCode = req.body.transactionCode;
    const date = req.body.date;
    const description = req.body.description;
    const paymentType = req.body.paymentType;
    const amount = Number(req.body.amount);
    const accounts = req.body.accounts;
    const department = req.body.department;

    const existingtransaction = await Finance.findOne({ transactionCode });
    if (existingtransaction) {
        return res.status(400).json({ message: 'The Transaction already exists with this Transaction Code' });
    }

    const newFinance = new Finance({
        transactionCode,
        date,
        description,
        paymentType,
        amount,
        accounts,
        department,

    });


    newFinance.save()
    .then(()=>{
        res.json("Transaction Added");
    }).catch((err)=>{
        console.log(err);
    });

});

// CRUD (READ) code segment
router.route("/").get((req,res)=>{

    Finance.find()
    .then((finances)=>{
        res.json(finances)
    }).catch((err)=>{
        console.log(err)
    });
});

// CRUD (UPDATE) code segment
router.route("/update/:id").put(async(req,res)=>{
    let transactionId = req.params.id;
    const {transactionCode, date , description, paymentType, amount,accounts,department} = req.body;

    const updateFinance = {
        transactionCode,
        date,
        description,
        paymentType,
        amount,
        accounts,
        department
    }

    const update = await Finance.findByIdAndUpdate(transactionId, updateFinance)
    .then(()=>{
        res.status(200).send({status:"Transaction Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error update"});
    });
});

// CRUD (DELETE) code segment
router.route("/delete/:id").delete(async(req,res)=>{
    let transactionId = req.params.id;

    await Finance.findByIdAndDelete(transactionId)
    .then(()=>{
        res.status(200).send({status:"Transaction Deleted"});
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status:"Error Delete"})
    });
});

router.route("/get/:id").get(async(req,res)=>{
    let transactionId = req.params.id;
    const transcation = await Finance.findById(transactionId)
    .then((Finance)=>{
        res.status(200).send({status:"transaction fetched",Finance})
    }).catch((err)=>{
        console.log(err.massage);
        res.status(500).send({status:"Error with get Transaction",error : err.massage})
    });
});

module.exports = router;