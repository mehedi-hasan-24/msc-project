import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { COMPLETED, FAILED, IDLE, PENDING } from "./requestStatusType";
export const fetchUserInfo = createAsyncThunk(
  "/Auth/fetchUserInfo",
  async (userInfo) => {
    const { email, password } = userInfo;
    let result = await axios.post("http://localhost:3001/user/login", {
      email,
      password,
    });
    return result.data;
  }
);

const initialState = {
  isAuthenticated: null,
  status: IDLE,
  email: "",
  class_roll: 0,
  registration: 0,
  session: "",
  dept: "",
  name: "",
  signature: "",
  public_key: "",
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  extraReducers: {
    [fetchUserInfo.pending]: (state, action) => {
      return {
        ...initialState,
        status: PENDING,
      };
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        isAuthenticated: true,
        status: COMPLETED,
        email: action.payload.email,
        class_roll: action.payload.class_roll,
        dept: action.payload.dept,
        registration: action.payload.registration,
        session: action.payload.session,
        name: action.payload.name,
        signature: action.payload.signature,
        public_key: action.payload.public_key,
      };
    },
    [fetchUserInfo.rejected]: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        status: FAILED,
      };
    },
  },
});

export default AuthSlice.reducer;
