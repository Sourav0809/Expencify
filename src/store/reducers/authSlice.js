import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isAuthenticated: false, idToken: "", userEmail: '', },
    reducers: {
        userAuthenticated(state) {
            state.isAuthenticated = true
        },
        userLogOut(state) {
            state.isAuthenticated = false
        },

        setIdToken(state, action) {
            state.idToken = action.payload
        },

        setUserEmail(state, action) {
            state.userEmail = action.payload
        },

    }
})

export default authSlice;