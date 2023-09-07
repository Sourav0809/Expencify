import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: { darkmode: false },
    reducers: {
        switchTodark(state) {
            state.darkmode = true
        },
        switchToNormal(state) {
            state.darkmode = false
        }
    }
})