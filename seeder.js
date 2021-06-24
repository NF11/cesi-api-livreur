const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URL + "/" + process.env.MONGO_DB_NAME, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const model = require("@cesi-project/common");

// Read JSON file
const order = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/order.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/user.json`, "utf-8")
);

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/product.json`, "utf-8")
);

const menu = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/menu.json`, "utf-8")
);

// Import data to database
const importData = async () => {
  try {
    console.log("loading ...");
    await model.Order.create(order);
    await model.Product.create(product);
    await model.User.create(users);
    await model.Menu.create(menu);
    console.log("Data Imported...");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

// Delete data from database
const deleteData = async () => {
  try {
    console.log("loading ...");
    await model.Order.deleteMany();
    await model.Product.deleteMany();
    await model.Menu.deleteMany();
    await model.User.deleteMany();
    // await Review.deleteMany();
    console.log("DATA DELETED ...");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
