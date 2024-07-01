const initialState = {
  products: [],
  product: null,
  loading: true,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "GET_PRODUCTS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "GET_PRODUCT_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "GET_PRODUCT_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
