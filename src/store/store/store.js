import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import userProfileSlice from "../reducers/UserProfileSlice";
import expenceSlice from "../reducers/expenceSlice";
import categorySlice from "../reducers/CategorySlice";
import vipUserSlice from "../reducers/vipUserSlice";
import darkModeSlice from "../reducers/darkModeSlice";
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userProfile: userProfileSlice.reducer,
        expences: expenceSlice.reducer,
        darkMode: darkModeSlice.reducer,
        categorys: categorySlice.reducer,
        vipUser: vipUserSlice.reducer,
    }
})

export default store