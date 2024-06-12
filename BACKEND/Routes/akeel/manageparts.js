const router = require("express").Router();
const manageparts = require("../../Models/manageparts.js");


router.route("/add").post(async(req, res) => {
    const itemcode = req.body.itemcode;
    const itemname = req.body.itemname;
    const category = req.body.category;
   
    const suppliername = req.body.suppliername;
    const price = req.body.price;
    const reorderlevel = req.body.reorderlevel;
    const stocklimit = req.body.stocklimit;
    const remark = req.body.remark;
    const isactive = req.body.isactive;


    const existingitemcode=await manageparts.findOne({itemcode});
    if (existingitemcode){
      return res.status(400).json({message:"the item already exists with this itemcode"});
    }

    const newManageparts = new manageparts({
         itemcode,
         itemname,
         category,
        
         suppliername,
         price,
         reorderlevel,
         stocklimit,
         remark,
         isactive,
    });

   newManageparts.save().then(() => {
      res.json("parts added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// CRUD (all data retreve page) code segment
router.route("/").get((req, res) => {
    manageparts
      .find()
      .then((manageparts) => {
        // res.status(200).json({msg: "item updated successfully."});
        res.json(manageparts);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  

//CRUD (update page) code segment
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id; //code for get the individual id from the url
    const { itemcode, itemname, category,suppliername,price,reorderlevel,stocklimit,remark,isactive } = req .body;
  
    //object for supplier update
    const updatemanageparts = {

        itemcode,
        itemname,
        category,
        
        suppliername,
        price,
        reorderlevel,
        stocklimit,
        remark,
        isactive,
    
    };
    const update = await manageparts
      .findByIdAndUpdate(userId, updatemanageparts)
      .then(() => {
        res.status(200).send({ status: "parts updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ staus: "parts added can't be done" });
      });
  });

//CRUD (delete page) code segment

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await manageparts
      .findByIdAndDelete(userId)
      .then(() => {
        res.status(200).send({ status: "parts deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "parts can't be deletes", error: err.message });
      });
  });


  router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await manageparts
      .findById(userId)
      .then((manageparts) => {
        res.status(200).send({ status: "parts fetched", manageparts });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Can't find parts", error: err.message });
      });
  });

  router.get('/checkReorderLevel', async (req, res) => {
    try {
        const items = await manageparts.find();
        const alerts = items.filter(item => item.stocklimit < item.reorderlevel);
        res.json(alerts);
    } catch (error) {
        console.error("Error checking reorder levels:", error);
        res.status(500).json({ error: "Failed to check reorder levels" });
    }
});



module.exports = router;
