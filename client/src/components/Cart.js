import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, removeFromCart } from "../redux/actions/cartAction";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart); // Accessing cart state

  useEffect(() => {
    dispatch(getCart()); // Dispatching action to get cart data
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatching action to remove item from cart
  };
  const calculateTotalPrice = () => {
    if (!cart || !cart.products) return 0;
    return cart.products.reduce(
      (acc, curr) => acc + curr.productId.price * curr.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5">Your Cart</h2>
      {cart && cart?.products.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Cart Items</h3>
            {cart &&
              cart?.products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-gray-700">
                        ${item.productId.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={() => console.log()}
                      className="w-16 p-2 border rounded-lg text-center"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.productId._id)}
                      className="ml-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total Items:</span>
              <span>
                {cart &&
                  cart.products.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total Price:</span>
              <span>
                Rs.
                {calculateTotalPrice().toFixed(2)}
              </span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
