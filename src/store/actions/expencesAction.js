import expenceSlice from "../reducers/expenceSlice"
import axios from "axios"



export const setExpence = (newExpence) => {
    return async (dispatch, getState) => {
        try {
            const data = await axios.post("https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences.json", newExpence)
            const newExpenceObj = { firebaseId: data.name, ...newExpence };
            dispatch(expenceSlice.actions.setExpences([...getState().expences.expences, newExpenceObj]))
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}



export const getExpence = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/Expences.json")
            if (data) {
                const expenceListArray = Object.keys(data).map((firebaseId) => ({
                    firebaseId,
                    ...data[firebaseId],
                }));


                dispatch(expenceSlice.actions.getExpences(expenceListArray))
            }

        } catch (error) {
            console.log(error);
        }
    }
}


export const editExpence = (id) => {
    return (dispatch, getState) => {
        const editedExpenceArr = getState().expences.expences.filter((expences) => {
            return expences.id === id
        })
        dispatch(expenceSlice.actions.editExpence(editedExpenceArr[0]))
    }
}


export const setEditedExpence = (editedExpence) => {
    return (dispatch) => {
        dispatch(expenceSlice.actions.setExpences(editedExpence))
    }
}