import axios from "axios";

const baseurl = "https://expense-tracker-devops-4bw1.onrender.com/api/users";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });

  try {
    const res = await axios.post(`${baseurl}/register`, userData);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({
      type: "REGISTER_ERROR",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const res = await axios.post(`${baseurl}/login`, userData);
    sessionStorage.setItem("token", res.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateUserBudget = (data) => async (dispatch) => {
  dispatch({ type: "UPDATE_BUDGET_REQUEST" });

  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.put(`${baseurl}/budget`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "UPDATE_BUDGET_SUCCESS",
      payload: res.data, // { budget: value }
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_BUDGET_ERROR",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};