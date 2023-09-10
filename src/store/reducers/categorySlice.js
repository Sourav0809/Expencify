import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: { categorys: [], loader: false },
    reducers: {
        fetchCatagory(state, action) {
            state.categorys = action.payload
        },
        setCategory(state, action) {
            state.categorys = action.payload
        },
        deleteCategory(state, action) {
            state.categorys = action.payload
        },
        setLoaderTrue(state) {
            state.loader = true
        },
        setLoaderFalse(state) {
            state.loader = false
        },
    }
})

export default categorySlice