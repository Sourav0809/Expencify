import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: { userInfo: '' },
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        }
    }

})

export const { setUserInfo } = userProfileSlice.actions
export default userProfileSlice