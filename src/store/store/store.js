import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import userProfileSlice from "../reducers/UserProfileSlice";
import expenceSlice from "../reducers/expenceSlice";
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userProfile: userProfileSlice.reducer,
        expences: expenceSlice.reducer,
    }
})

export default store