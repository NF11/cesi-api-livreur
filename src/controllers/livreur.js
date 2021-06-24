// Imports
const express = require("express");
const model = require("@cesi-project/common");
const route = express.Router();
const cors = require("cors");

// Json decryption & header cors reading
route.use(cors());
route.use(express.json());

// Get all Livreur
route.get("/", (req, res) => {
  model.User.find({ role: "livreur" })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get unique Livreur
route.get("/:id", (req, res) => {
  model.User.findById(req.params.id)
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((error) => res.status(404).json({ msg: error }));
});

// Create new Livreur
route.post("/", async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  let livreur = {
    name,
    phone,
    email,
    password,
    role: "livreur",
  };
  let livreurModel = new model.User(livreur);
  livreurModel
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((error) => res.status(404).json({ message: error.message }));
});

// Update Livreur
route.patch("/:id", async (req, res) => {
  console.log(req.params.id);
  const { name, email, phone, password } = req.body;

  try {
    const response = await model.User.findOneAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          email,
          phone,
          password,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const response = await model.User.deleteOne({
      _id: req.params.id,
    });

    res.status(200).send(response);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

// Export routes
module.exports = route;
