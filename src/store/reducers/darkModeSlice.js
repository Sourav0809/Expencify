import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: { darkMode: false },
    reducers: {
        switchTodark(state) {
            state.darkMode = true
        },
        switchToNormal(state) {
            state.darkMode = false
        }
    }
})

export default darkModeSlice