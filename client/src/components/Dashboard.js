import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    dispatch(addProduct(formData, navigate));
    clearForm();
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setIsEditing(true);
    setSelectedProductId(product._id);
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct(selectedProductId, formData, navigate));
    clearForm();
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId, navigate));
  };

  const clearForm = () => {
    setIsEditing(false);
    setSelectedProductId(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-[33rem]">
          <h3 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              value={formData.description}
              rows={5}
              cols={5}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Product Price"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Product Image URL"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdateProduct}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => clearForm()}
                    className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddProduct}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Product List</h3>
          <div className="grid gap-6">
            {products.length === 0 && (
              <h3 className="text-xl text-center font-semibold mb-4">
                No Products Yet...
              </h3>
            )}
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-gray-900 font-bold">${product.price}</p>
                  </div>
                </div>
                <div className="flex ">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="ml-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
