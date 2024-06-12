const router = require("express").Router(); // Import the Express module and access its Router function to create a new router object.
let Package = require("../../Models/svc-package.js"); // Import the Package model from the specified path.

//add package
router.route("/add").post((req, res) => {
  
  const name = req.body.name;
  const description = req.body.description;
  const unitprice = parseInt(req.body.unitprice);
  console.log("test");
  const category = req.body.category;
  console.log(req.body);
  //validate data
 ;
  // validate unitprice as number
  if (isNaN(unitprice)) {
    return res.status(400).json({ message: "unitprice must be a number" });
  }

  //validate category is equal to interior or exterior
  if (category !== "Interior" && category !== "Exterior") {
    return res.status(400).json({ message: "category must be Interior or Exterior" });
  }
  // validate name and discription as string
  if (typeof name !== "string" || typeof description !== "string") {
    return res.status(400).json({ message: "name and description must be strings" });
  }
  
  console.log("test3");
  const newPackage = new Package({
    
    name,
    description,
    unitprice,
    category,
  });

  newPackage
    .save()
    .then(() => {
      console.log("test res");
      return res.json("Package Added");
    })
    .catch((err) => {
      console.log("test er");
      return console.log(err);
    });
});

//read package
router.route("/").get((req, res) => {
  Package.find()
    .then((packages) => {
      res.json(packages);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update package

router.route("/update/:id").put(async (req, res) => {
  let packageId = req.params.id;
  const { name, description, unitprice, category } = req.body;

  const updatePackage = {
    //pid,
    name,
    description,
    unitprice,
    category,
  };

  try {
    const resp = await Package.findByIdAndUpdate(packageId, updatePackage);

    if (!resp) {
      res.status(500).send({ status: "package with this id not found" }); //handeled error
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data" }); //unexpected error
    return;
  }

  res.status(200).send({ status: "Package Updated" });
});

//delete package

router.route("/delete/:id").delete(async (req, res) => {
  let packageId = req.params.id;

  await Package.findByIdAndDelete(packageId)
    .then(() => {
      res.status(200).send({ status: "Package Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete package", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let packageId = req.params.id;
  Package.findById(packageId)
    .then((packages) => {
      res.json(packages);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;//export router object.
