const mongoose = require("mongoose")

const TechnologySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Technology", TechnologySchema)