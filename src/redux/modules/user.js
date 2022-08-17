import { createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from '../../cookie';

const initialState = {
    loggin: false,
    info: {
        userId: 0,
        nickname: "기본 닉네임",
        MBTI: "MBTI",
        profilePicture: "img/defaultProfile.png"
    }
}

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        checkUser: (state, action) => {
            if(getCookie('token') !== undefined) state.loggin=true;
        },
        signInUser: (state, action) => {
            const token = action.payload.token;
            setCookie("token", token)
            
            state.info = action.payload.info;
            console.log(state.info);
            state.loggin = true;
        },
        signOutUser: (state, action) => {
            deleteCookie('token');
            state.loggin = false;
        }
    }
})

export const { signInUser, signOutUser, checkUser } = userSlice.actions;
export default userSlice.reducer;