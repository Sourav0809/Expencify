import { createSlice } from "@reduxjs/toolkit";

const vipUserSlice = createSlice({
    name: 'vipUser',
    initialState: { isVip: false },
    reducers: {
        setVip(state) {
            state.isVip = true
        },
        fetchVip(state, action) {
            state.isVip = action.payload
        }
    }
})



export default vipUserSlice