// users status management 
import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'


const userStore = createSlice({
    name: "user",
    initialState: {
        //response data stracture 
        token: localStorage.getItem('token_key') || ''
         
    },
    // synchronous reducer setUserToken to update the token in the state
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload
            //save token in localStorage
            localStorage.setItem('token_key', action.payload)
        }
    }
})

// This action creator will be used in components or asynchronous functions to dispatch the action that updates the token
const { setUserToken } = userStore.actions
//This is exported as the default and will be registered in the Redux store to handle the updates to the user state slice
const userReducer = userStore.reducer

// asynchronous
const fetchLogin = (loginForm) => {
    return async(dispatch) =>{
        // 1. send asynchronous request
        const res = await request.post('/authorizations', loginForm)
        // 2. submit synchronous action and update token
        dispatch(setUserToken(res.data.token));
    }
}
export { fetchLogin, setUserToken }
export default userReducer