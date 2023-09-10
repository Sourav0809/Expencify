import axios from "axios";
import vipUserSlice from "../reducers/vipUserSlice";
import formatEmail from "../../Functions/formatEmail";
import toast from "react-hot-toast";

export const setVip = () => {
    return async (dispatch, getState) => {
        const userEmail = getState().auth.userEmail
        try {
            const { data } = await axios.put(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/vipMember/.json`,
                { isVip: true })

            dispatch(vipUserSlice.actions.setVip())
            toast.success('Vip Activated !')
        } catch (error) {
            toast.error("Error Occurred ! ")
        }
    }
}

export const fetchVip = () => {
    return async (dispatch, getState) => {
        const userEmail = getState().auth.userEmail
        try {

            const { data } = await axios.get(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/vipMember/.json`)
            if (data) {
                dispatch(vipUserSlice.actions.fetchVip(data.isVip))
            }


        } catch (error) {
            toast.error('Error in Fetch Your Data')
        }
    }
}