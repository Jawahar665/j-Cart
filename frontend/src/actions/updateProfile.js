import { updateProfileFail, updateProfileSuccess,updateProfileRequest } from "../slices/authSlice";
import axios from "axios";

export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch(updateProfileRequest());
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.put("/api/v1/update", userData, config);
      dispatch(updateProfileSuccess(data));
    } catch (error) {
      dispatch(updateProfileFail(error.response.data.message));
    }
  };