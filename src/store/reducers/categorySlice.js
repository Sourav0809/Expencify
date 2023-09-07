import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: { categorys: [] },
    reducers: {
        setCategory(state, action) {
            state.categorys = action.payload
        }
    }
})

export default categorySlice