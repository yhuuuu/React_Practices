// users status management 
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: "user",
    initialState: {
        //response data stracture 
        token: ''
    },
    // synchronous reducer setUserToken to update the token in the state
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload
        }
    }
})

// This action creator will be used in components or asynchronous functions to dispatch the action that updates the token
const { setUserToken } = userStore.actions


//This is exported as the default and will be registered in the Redux store to handle the updates to the user state slice
const userReducer = userStore.reducer

export { setUserToken }
export default userReducer