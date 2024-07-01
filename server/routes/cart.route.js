const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const { protect } = require("../middlewares/auth");
const router = express.Router();

// Routes for cart operations
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:id", protect, removeFromCart);

module.exports = router;
