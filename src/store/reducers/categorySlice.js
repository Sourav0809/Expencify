import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: { categorys: [] },
    reducers: {
        fetchCatagory(state, action) {
            state.categorys = action.payload
        },
        setCategory(state, action) {
            state.categorys = action.payload
        },
        deleteCategory(state, action) {
            state.categorys = action.payload
        }
    }
})

export default categorySlice