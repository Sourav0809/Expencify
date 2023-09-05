import { createSlice } from "@reduxjs/toolkit";

const expenceSlice = createSlice({
    name: "expences",
    initialState: { expences: [], editedExpences: {} },
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

    }
})


export default expenceSlice