const Testimonials = require("../models/Testimonials");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/createTestimonials", (req, res) => {
  const { desc, title, name} = req.body;
  const newTestimonials = new Testimonials({
    desc: desc,
    title: title,
    name: name
  })

  newTestimonials.save((err, data) => {
    if (err) {
      return res.status(404).json({ "error": err})
    }
  })
});

//UPDATE
router.put("/testimonials/:id", async (req, res) => {
  try {
    const updatedTestimonials = await Testimonials.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTestimonials);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/testimonials/:id", async (req, res) => {
  try {
    await Testimonials.findByIdAndDelete(req.params.id);
    res.status(200).json("Testimonials has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Testimonials
router.get("/testimonials/:id", async (req, res) => {
  try {
    const testimonials = await Testimonials.findById(req.params.id);
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL Testimonials
router.get("/testimonials", async (req, res) => {
    try {
        const testimonials = await Testimonials.find()
        if (!testimonials) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: testimonials
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router;