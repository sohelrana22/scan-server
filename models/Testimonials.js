const mongoose = require("mongoose")

const TestimonialsSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: false,
    },
    title: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Testimonials", TestimonialsSchema)