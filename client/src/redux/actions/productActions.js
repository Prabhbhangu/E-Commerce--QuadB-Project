import axios from "axios";
import { DOMAIN_URL } from "../../constants/index";

const BASE_URL = DOMAIN_URL;

// Action types for getting products
export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

// Action types for getting a single product
export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "GET_PRODUCT_FAIL";

// Action types for adding a product
export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAIL = "ADD_PRODUCT_FAIL";

// Action types for updating a product
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAIL = "UPDATE_PRODUCT_FAIL";

// Action types for deleting a product
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAIL = "DELETE_PRODUCT_FAIL";

// Action creators for getting all products
export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  try {
    const res = await axios.get(BASE_URL + "/api/products");
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response.data });
  }
};

// Action creators for getting a single product by ID
export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REQUEST });

  try {
    const res = await axios.get(BASE_URL + `/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_FAIL, payload: error.response.data });
  }
};

// Action creators for adding a new product
export const addProduct = (productData, navigate) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(BASE_URL + "/api/products/", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
    navigate(`/admin/dashboard`);
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAIL, payload: error.response.data });
  }
};

// Action creators for updating a product by ID
export const updateProduct = (productId, updatedData, navigate) => async (
  dispatch
) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });

  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      BASE_URL + `/api/products/${productId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
    navigate(`/admin/dashboard`);
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data });
  }
};

// Action creators for deleting a product by ID
export const deleteProduct = (productId, navigate) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });

  try {
    const token = localStorage.getItem("token");
    await axios.delete(BASE_URL + `/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    navigate(`/admin/dashboard`);
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data });
  }
};
