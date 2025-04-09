

import { createSlice } from '@reduxjs/toolkit';

const initialState={
    userInfo:JSON.parse(localStorage.getItem('user')) || null,
    leaderboard:[]

}


export const userSlice=createSlice({
    name:'userInformation',
    initialState,
    reducers:{
        getUserInfo:(state,action)=>{
            state.userInfo=action.payload

        },
        logoutUserInfro:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('user');
        },
        setLeaderboard: (state, action) => {
            state.leaderboard = action.payload;
        },
        updateUserPoints: (state, action) => {
            const { id, newPoints } = action.payload;
            const user = state.users.find(user => user.id === id);
            if (user) user.points = newPoints;
            const lbUser = state.leaderboard.find(user => user.id === id);
            if (lbUser) lbUser.points = newPoints;
            state.leaderboard.sort((a, b) => b.points - a.points);
          }
    }
});


export const {getUserInfo,logoutUserInfro,updateUserPoints,setLeaderboard}=userSlice.actions;
export default userSlice.reducer;

