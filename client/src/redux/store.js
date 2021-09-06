import { configureStore } from "@reduxjs/toolkit";
import Auth from "./AuthSlice";
export default configureStore({
  reducer: { Auth },
});
