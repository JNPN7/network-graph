import { configureStore } from "@reduxjs/toolkit";
import personSlice from "./personSlice";

export default configureStore({
  reducer: {
    person: personSlice
  }
})