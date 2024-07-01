import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
