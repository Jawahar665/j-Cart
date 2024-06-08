import {
  loginFail,
  loginRequest,
  loginSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  clearError,
  registerFail,
  registerRequest,
  registerSuccess,
  logoutUserSuccess,
  logoutUserFail,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../slices/authSlice";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`/api/v1/myprofile`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
export const logout = async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFail);
  }
};
export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.put("/api/v1/password/change", formData, config);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/password/forgot",
      formData,
      config
    );
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};
export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      formData,
      config
    );
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};
