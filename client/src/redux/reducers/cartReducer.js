const initialState = {
  cart: {
    products: [],
  },
  loading: true,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_SUCCESS": {
      return { ...state, cart: action.payload, loading: false };
    }
    case "GET_CART_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADD_TO_CART_SUCCESS":
      return { ...state, cart: action.payload, loading: false };
    case "ADD_TO_CART_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "REMOVE_FROM_CART_SUCCESS":
      return { ...state, cart: action.payload, loading: false };
    case "REMOVE_FROM_CART_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
