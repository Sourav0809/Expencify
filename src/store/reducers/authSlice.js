import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isAuthenticated: false, idToken: "" },
    reducers: {
        userAuthenticated(state) {
            state.isAuthenticated = true
        },
        userLogOut(state) {
            state.isAuthenticated = false
        },

        setIdToken(state, action) {
            state.idToken = action.payload
        }
    }
})

export default authSlice;