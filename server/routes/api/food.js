const router = require("express").Router();
const foodController = require("../../controllers/foodController");

// Matches with "/api/food"
router.route("/")
  .get(foodController.findAll);

// Matches with "/api/food/:id"
router
  .route("/:id")
  .get(foodController.findById);

module.exports = router;
