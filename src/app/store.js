import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/users/userSlice";
import activitReducre from "../features/activities/activitiesSlice";
import rewardsReducre from "../features/rewards/rewardSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
    activity:activitReducre,
    rewards:rewardsReducre
  },
})