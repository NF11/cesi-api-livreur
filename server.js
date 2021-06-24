const mongoose = require("mongoose");
const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const uri = process.env.MONGO_URL + "/" + process.env.MONGO_DB_NAME; // DB uri

// Connect to MongoDB
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

// Deploy express app server
app.listen(process.env.PORT, () => {
  console.log(`running on port ` + process.env.PORT);
});
