const mongoose = require("mongoose")

const CareerSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      require: true
    },
    company: {
      type: String,
      require: false
    },
    desc: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Career", CareerSchema)