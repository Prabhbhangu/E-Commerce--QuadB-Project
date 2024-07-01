const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate(
      "products.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) cart = new Cart({ userId: req.user.userId, products: [] });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== req.params.id
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};
