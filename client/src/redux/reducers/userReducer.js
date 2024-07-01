const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAdmin", action.payload.user.isAdmin);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "ADMIN_SUCCESS":
      localStorage.setItem("isAdmin", action.payload.user.isAdmin);
      break;
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
