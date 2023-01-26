const Career = require("../models/Career");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/createCareer", (req, res) => {
  const {position, company, desc} = req.body;
  const newCareer = new Career({
    position: position,
    company: company,
    desc: desc
  })

  newCareer.save((err, data) => {
    if (err) {
      return res.status(404).json({ "error": err})
    }
  })
});

//UPDATE
router.put("/career/:id", async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCareer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/career/:id", async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.status(200).json("Career has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Career
router.get("/career/:id", async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    res.status(200).json(career);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL Career
router.get("/career", async (req, res) => {
    try {
        const career = await Career.find()
        if (!career) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: career
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router;