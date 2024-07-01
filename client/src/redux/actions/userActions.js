import axios from "axios";
import { DOMAIN_URL } from "../../constants/index";
import { toast } from "react-toastify";

const BASE_URL = DOMAIN_URL;

export const register = (username, password, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(BASE_URL + "/api/auth/register", {
      username,
      password,
    });
    console.log(res.data);
    // dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    toast.success("Register Success");
    navigate("/auth/login");
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL" });
  }
};

export const login = (username, password, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(BASE_URL + "/api/auth/login", {
      username,
      password,
    });
    console.log(res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    toast.success("Login Success");
    navigate("/");
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    toast.error(error.message);
  }
};

export const becomeAdmin = () => async (dispatch) => {
  try {
    const res = await axios.post(
      BASE_URL + "/api/auth/makeAdmin",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "ADMIN_SUCCESS", payload: res.data });
  } catch (error) {}
};

export const logout = () => ({ type: "LOGOUT" });
