const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const technologyRoute = require("./routes/technology");
const testimonialsRoute = require("./routes/testimonials");
const careerRoute = require("./routes/career");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"))
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api", projectRoute);
app.use("/api", technologyRoute);
app.use("/api", testimonialsRoute);
app.use("/api", careerRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});