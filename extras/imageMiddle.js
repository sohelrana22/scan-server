const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "images")
    },
    filename: (req, file, callBack) => {
      callBack(null, file.originalname)
    },
  })

  module.exports = multer({storage: storage})