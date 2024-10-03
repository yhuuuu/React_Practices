// users status management 
import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/api/user";

const userStore = createSlice({
    name: "user",
    initialState: {
        //response data stracture 
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        // synchronous reducer setUserToken to update the token in the state
        setUserToken(state, action) {
            state.token = action.payload
            //save token in localStorage
            _setToken(action.payload)
        },
        // userInfo
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        //clear user info
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = ''
            removeToken()
        }
    }
})

// This action creator will be used in components or asynchronous functions to dispatch the action that updates the token
const { setUserToken, setUserInfo, clearUserInfo } = userStore.actions
//This is exported as the default and will be registered in the Redux store to handle the updates to the user state slice
const userReducer = userStore.reducer

// Asynchronous login
const fetchLogin = (loginForm) => {
    return async (dispatch) => {

        // 1. send asynchronous request
        const res = await loginAPI(loginForm)
        // 2. submit synchronous action and update token
        dispatch(setUserToken(res.data.token));
    }
}
// Asynchronous fetching of personal information
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data));
    }
}


export { fetchLogin, setUserToken, fetchUserInfo, clearUserInfo }
export default userReducer