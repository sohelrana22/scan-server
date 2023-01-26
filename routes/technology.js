const imageMiddle = require("../extras/imageMiddle");
const Technology = require("../models/Technology");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/createTechnology", imageMiddle.single('photo'), (req, res) => {
  const {title, subtitle, desc} = req.body;
  const newTechnology = new Technology({
    title: title,
    subtitle: subtitle,
    desc: desc,
    photo: req.file.destination + "/" + req.file.filename
  })

  newTechnology.save((err, data) => {
    if (err) {
      return res.status(404).json({ "error": err})
    }
  })
});

//UPDATE
router.put("/technology/:id", async (req, res) => {
  try {
    const updatedTechnology = await Technology.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTechnology);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/technology/:id", async (req, res) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.status(200).json("Technology has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Technology
router.get("/technology/:id", async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    res.status(200).json(technology);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL Technology
router.get("/technology", async (req, res) => {
    try {
        const technology = await Technology.find()
        if (!technology) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: technology
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router;