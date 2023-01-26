const Project = require("../models/Project");
const imageMiddle = require('./../extras/imageMiddle')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/createProject", imageMiddle.single('photo'), (req, res) => {
  const {title, subtitle, desc, url} = req.body;
  const newProject = new Project({
    title: title,
    subtitle: subtitle,
    desc: desc,
    url: url,
    photo: req.file.destination + "/" + req.file.filename
  })

  newProject.save((err, data) => {
    if (err) {
      return res.status(404).json({ "error": err})
    }
  })
});

//UPDATE
router.put("/project/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/project/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json("Project has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Project
router.get("/project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Project
router.get("/projects", async (req, res) => {
    try {
        const project = await Project.find()
        if (!project) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: project
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router;