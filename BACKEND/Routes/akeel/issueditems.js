const router = require("express").Router();
const issueditems = require("../../Models/issueditems.js");



router.route("/add").post((req, res) => {
    const itemcode = req.body.itemcode;
    const itemname = req.body.itemname;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const issuedcode = req.body.issuedcode;
    

    const newIssueditems = new issueditems({
         itemcode,
         itemname,
         price,
         quantity,
         issuedcode,
        
    });

   newIssueditems.save().then(() => {
      res.json("issueditems added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// CRUD (all data retreve page) code segment
router.route("/").get((req, res) => {
    issueditems
      .find()
      .then((issueditems) => {
        res.json(issueditems);
      })
      .catch((err) => {
        console.log(err);
      });
  });

//CRUD (update page) code segment
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id; //code for get the individual id from the url
    const { itemcode, itemname,price,quantity,issuedcode } = req .body;
  
    //object for supplier update
    const updateissueditems = {

        itemcode,
        itemname,
        price,
       quantity,
       issuedcode,
    
    };
    const update = await issueditems
      .findByIdAndUpdate(userId, updateissueditems)
      .then(() => {
        res.status(200).send({ status: "issueditems updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ staus: "issueditems added can't be done" });
      });
  });

//CRUD (delete page) code segment

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await issueditems
      .findByIdAndDelete(userId)
      .then(() => {
        res.status(200).send({ status: "issueditems deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "issueditems can't be deletes", error: err.message });
      });
  });


  router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await issueditems.findById(userId).then((issueditems) => {
        res.status(200).send({ status: "issueditems fetched", issueditems });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Can't find issued items", error: err.message });
      });
  });


module.exports = router;