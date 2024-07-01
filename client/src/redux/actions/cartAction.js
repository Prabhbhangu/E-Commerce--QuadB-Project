import axios from "axios";
import { DOMAIN_URL } from "../../constants/index";

const BASE_URL = DOMAIN_URL;

export const getCart = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(BASE_URL + "/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch({ type: "GET_CART_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_CART_FAIL", payload: error.response.data });
  }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      BASE_URL + "/api/cart",
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "ADD_TO_CART_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "ADD_TO_CART_FAIL", payload: error.response.data });
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(BASE_URL + `/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: res.data });
    window.location.reload();
  } catch (error) {
    dispatch({ type: "REMOVE_FROM_CART_FAIL", payload: error.response.data });
  }
};
