const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const { protect } = require("./middlewares/auth");
const { connectToDatabase } = require("./utils/database");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", protect, cartRoutes);

connectToDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
