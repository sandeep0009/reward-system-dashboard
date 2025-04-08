

import { createSlice } from '@reduxjs/toolkit';

const initialState={
    userInfo:null,
}

export const userSlice=createSlice({
    name:'userInformation',
    initialState,
    reducers:{
        getUserInfo:(state,action)=>{
            state.userInfo=action.payload

        },
        logoutUserInfro:(state)=>{
            state.userInfo=null

        }
    }
});


export const {getUserInfo,logoutUserInfro}=userSlice.actions;
export default userSlice.reducer;

