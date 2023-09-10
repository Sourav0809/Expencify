import { createSlice } from "@reduxjs/toolkit";

const expenceSlice = createSlice({
    name: "expences",
    initialState: { expences: [], editedExpences: {}, loader: false },
    reducers: {
        setExpences(state, action) {
            state.expences = action.payload
        },
        getExpences(state, action) {

            state.expences = action.payload
        },
        editExpence(state, action) {
            state.editedExpences = action.payload
        },
        setLoaderTrue(state) {
            state.loader = true
        },
        setLoaderFalse(state) {
            state.loader = false
        }
    }
})


export default expenceSlice