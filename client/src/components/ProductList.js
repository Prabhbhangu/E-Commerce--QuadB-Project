import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { becomeAdmin, logout } from "../redux/actions/userActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.user);
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-5">Our Products</h2>
        </div>
        {token ? (
          <div className="flex items-center justify-center gap-3">
            {isAdmin === "true" && (
              <button
                className="bg-blue-500 text-white py-2 px-3 rounded-md"
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
              >
                Admin Panel
              </button>
            )}
            {isAdmin === "false" && (
              <button
                className="bg-blue-500 text-white py-2 px-3 rounded-md"
                onClick={() => {
                  dispatch(becomeAdmin());
                  toast.success(
                    "You are now and Admin. Please Login again to access Admin Features"
                  );
                }}
              >
                Become a Admin
              </button>
            )}
            <button
              className="bg-blue-500 text-white py-2 px-3 rounded-md"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-3 rounded-md"
              onClick={() => {
                dispatch(logout());
                toast.success("Logged Out Successfully");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-500 text-white py-2 px-3 rounded-md"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p>No products available yet.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-contain"
              />
              <div className="p-4 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2 line-clamp-3 overflow-hidden">
                  {product.description}
                </p>
                <p className="text-gray-900 font-bold">${product.price}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="block mt-3 text-sm font-semibold text-blue-500 hover:text-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
