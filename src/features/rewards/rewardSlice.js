
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rewards: [],
  redeemHistory:[]
};

export const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    addRewards: (state, action) => {
      state.rewards.unshift(action.payload);
    },
    getRewards: (state, action) => {
      state.rewards = action.payload;
    },
    updateRewards: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.rewards.findIndex(reward => reward.id === id);
      if (index !== -1) {
        state.rewards[index] = { ...state.rewards[index], ...updatedData };
      }
    },
    deleteReward: (state, action) => {
      const rewardId = action.payload;
      state.rewards = state.rewards.filter(reward => reward.id !== rewardId);
    },
    redeemAward:(state,action)=>{
      const {redeemId,userId,pointsRedeemed}=action.payload;
      state.redeemHistory.unshift({redeemId,userId,pointsRedeemed})

    },
    setRedeemHistory:(state,action)=>{
      state.redeemHistory = action.payload;

    }
  }
});

export const { addRewards, getRewards, updateRewards, deleteReward,redeemAward,setRedeemHistory } = rewardSlice.actions;
export default rewardSlice.reducer;
