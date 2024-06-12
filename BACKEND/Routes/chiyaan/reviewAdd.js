const router = require("express").Router();
let reviewAdd = require("../../Models/reviewAdd");



//create - working

router.route("/Review").post((req,res)=>{

    const cmail = req.body.cmail;
    const rating = req.body.rating;
    const message = req.body.message; 
 
    const newReview = new reviewAdd({
        cmail,
        rating,
        message  
    })

    newReview.save().then(()=>{
        res.json("Review Done");
    }).catch((err)=>{
        console.log(err);
    });
});

//read - working

router.route("/").get((req,res)=>{
    reviewAdd.find().then((reviewAdd)=>{
        res.json(reviewAdd);
    }).catch((err)=>{
        console.log(err);
    })
})


//update

router.route("/updatereview/:id").post(async(req,res)=>{
    let revid = req.params.id;
    const{cmail, rating, message } = req.body; 

    const updatereview = {
        cmail,
        rating,
        message
    }
    const update = await reviewAdd.findByIdUpdate(revid, updatereview)  //await - waiting until the before update finish to execute next update
    .then(()=>{  
        res.status(200).send({status: "Details Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
 })

 //delete

 router.route("/delete/:id").delete(async(req, res)=>{
    let revid = req.params.id;
    await reviewAdd.findByIdAndDelete(revid)
    .then(()=> {
        res.status(200).send({status: "Review Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stats: "Error with deleting review", error:err.message});
    })
 })

 //fetch data of one booking
 router.route("/get/:id").get(async(req,res)=>{
    let revid = req.params.id;
    const review = await reviewAdd.findById(revid)  //primary key - .findOne(email)
    .then((review)=>{
        res.status(200).send({status: "Review Fetched", review})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get review", error: err.message});
    })
 })
 module.exports = router;