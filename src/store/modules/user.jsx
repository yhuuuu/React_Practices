// users status management 
import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import { setToken as _setToken ,getToken,removeToken } from "@//utils";

const userStore = createSlice({
    name: "user",
    initialState: {
        //response data stracture 
        token: getToken() || '',
        userInfo:{}
    },
    // synchronous reducer setUserToken to update the token in the state
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload
            //save token in localStorage
            _setToken(action.payload)
        },
        setUserInfo(state, action){
             state.userInfo = action.payload
        }
    }
})

// This action creator will be used in components or asynchronous functions to dispatch the action that updates the token
const { setUserToken, setUserInfo } = userStore.actions
//This is exported as the default and will be registered in the Redux store to handle the updates to the user state slice
const userReducer = userStore.reducer

// Asynchronous login
const fetchLogin = (loginForm) => {
    return async(dispatch) =>{
        // 1. send asynchronous request
        const res = await request.post('/authorizations', loginForm)
        // 2. submit synchronous action and update token
        dispatch(setUserToken(res.data.token));
    }
}
// Asynchronous fetching of personal information
const fetchUserInfo = () => {
    return async(dispatch) =>{
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data));
}}

export { fetchLogin, setUserToken, fetchUserInfo}
export default userReducer