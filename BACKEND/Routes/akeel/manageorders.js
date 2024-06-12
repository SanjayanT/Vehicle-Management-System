const router = require("express").Router();
const manageorders = require("../../Models/manageorders.js");




router.route("/add").post((req, res) => {
    const itemcode = req.body.itemcode;
    const itemname = req.body.itemname;
    const suppliername = req.body.suppliername;
    const needquantity = req.body.needquantity;
    const ordercode = req.body.ordercode;
    

    const newManageorders = new manageorders({
         itemcode,
         itemname,
         suppliername,
         needquantity,
         ordercode,
        
    });

   newManageorders.save().then(() => {
      res.json("order added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// CRUD (all data retreve page) code segment
router.route("/").get((req, res) => {
    manageorders
      .find()
      .then((manageorders) => {
        res.json(manageorders);
      })
      .catch((err) => {
        console.log(err);
      });
  });

//CRUD (update page) code segment
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id; //code for get the individual id from the url
    const { itemcode, itemname,suppliername,needquantity,ordercode } = req .body;
  
    //object for supplier update
    const updatemanageorders = {

        itemcode,
        itemname,
        suppliername,
         needquantity,
         ordercode,
    
    };
    const update = await manageorders
      .findByIdAndUpdate(userId, updatemanageorders)
      .then(() => {
        res.status(200).send({ status: "order updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ staus: "order added can't be done" });
      });
  });

//CRUD (delete page) code segment

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await manageorders
      .findByIdAndDelete(userId)
      .then(() => {
        res.status(200).send({ status: "order deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "order can't be deletes", error: err.message });
      });
  });


  router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await manageorders
      .findById(userId)
      .then((manageorders) => {
        res.status(200).send({ status: "order fetched", manageorders});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Can't find order", error: err.message });
      });
  });


module.exports = router;