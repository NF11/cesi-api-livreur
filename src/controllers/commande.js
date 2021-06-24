// Imports
const express = require("express");
const model = require("@cesi-project/common");
const route = express.Router();
const cors = require("cors");

route.use(cors());
route.use(express.json());

// Get all Commandes
route.get("/", (req, res) => {
  model.Order.find({
    livreurId: null,
    status: "acceptationCommande",
  })
    .populate("restaurateurId")
    .populate("clientId")
    .populate("productsOrder")
    .populate("menusOrder")
    .then((doc) => {
      res.send(doc);
    })
    .catch((error) => res.status(404).json({ msg: error }));
});

// Get livreur commande
route.get("/livreur/:id", (req, res) => {
  model.Order.find({ livreurId: req.params.id })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((error) => res.status(404).json({ msg: error }));
});

// Update state of Commande
route.patch("/:id", (req, res) => {
  console.log(req.params.id);
  const { status, livreurId } = req.body;
  console.log(status, livreurId);

  model.Order.findOneAndUpdate(
    req.params.id,

    {
      $set: {
        status: status,
        livreurId: livreurId,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => res.status(404).json({ message: error.message }));
});

// Export routes
module.exports = route;
