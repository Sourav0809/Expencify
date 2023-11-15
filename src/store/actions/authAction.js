import authSlice from "../reducers/authSlice";
import { setUserInfo } from "../reducers/userProfileSlice";
import { setCatagory } from "./categoryAction";
import { userLogOut } from "../reducers/authSlice";
import { setUserEmail } from "../reducers/authSlice";
export const authAction = authSlice.actions

export const userLogOutAction = () => {
    return (dispatch) => {
        dispatch(userLogOut())
        dispatch(setUserInfo(""))
        dispatch(setCatagory([]))
        localStorage.removeItem('idToken')
    }
}

export const setUserEmailAction = (email) => {
    return (dispatch) => {
        dispatch(setUserEmail(email))
    }
};