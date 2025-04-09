

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialState={
    userInfo:JSON.parse(localStorage.getItem('user')) || null,

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
        }
    }
});


export const {getUserInfo,logoutUserInfro}=userSlice.actions;
export default userSlice.reducer;

