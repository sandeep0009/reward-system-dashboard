import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/users/userSlice";
import activitReducre from "../features/activities/activitiesSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
    activity:activitReducre
  },
})