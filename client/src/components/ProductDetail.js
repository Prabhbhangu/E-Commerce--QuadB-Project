import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartAction";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(id, 1));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden sm:flex">
          <div className="sm:w-1/2">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="w-full h-auto sm:h-full object-contain"
            />
          </div>
          <div className="sm:w-1/2 sm:p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              {product?.name}
            </h2>
            <p className="text-lg text-gray-700 mb-4">Rs. {product?.price}</p>
            <p className="text-gray-600 mb-6">{product?.description}</p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add to Cart
            </button>
            <p className="mt-6 text-sm text-gray-500">
              Free shipping on eligible orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
