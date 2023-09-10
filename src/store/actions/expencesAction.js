import expenceSlice from "../reducers/expenceSlice"
import axios from "axios"
import formatEmail from "../../Functions/formatEmail"
import authSlice from "../reducers/authSlice"
import toast from "react-hot-toast";

export const setExpence = (newExpence) => {
    return async (dispatch, getState) => {
        const userEmail = getState().auth.userEmail
        console.log(userEmail);
        try {

            if (userEmail) {
                const data = await axios.post(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/Expences/.json`
                    , newExpence)
                const newExpenceObj = { firebaseId: data.name, ...newExpence };

                const allExpencearr = [...getState().expences.expences, newExpenceObj]

                // for sorting the array
                const finalSortarr = allExpencearr.sort((a, b) => {
                    const dateA = new Date(a.expenceDate);
                    const dateB = new Date(b.expenceDate);
                    return dateB - dateA;
                });

                dispatch(expenceSlice.actions.setExpences(finalSortarr))
                toast.success('Transaction Added')
            }
        } catch (error) {
            toast.error('Failed to add ');

        }
    }
}



export const getExpence = () => {
    return async (dispatch, getState) => {
        // setting the loader to true
        dispatch(expenceSlice.actions.setLoaderTrue())

        const userEmail = getState().auth.userEmail

        try {
            if (userEmail) {
                const { data } = await axios.get(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/Expences.json`)

                if (data) {
                    const expenceListArray = Object.keys(data).map((firebaseId) => ({
                        firebaseId,
                        ...data[firebaseId],
                    }));

                    // for sorting the array
                    const sortedExpence = expenceListArray.sort((a, b) => {
                        const dateA = new Date(a.expenceDate);
                        const dateB = new Date(b.expenceDate);
                        return dateB - dateA;
                    });


                    dispatch(expenceSlice.actions.getExpences(sortedExpence))
                }
                else {
                    dispatch(expenceSlice.actions.getExpences([]))
                }
            }
        } catch (error) {
            toast.error(error.response.data.error.message);
        }
        // setting the loader to false
        dispatch(expenceSlice.actions.setLoaderFalse())
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
        // for sorting the array
        const sortedExpence = editedExpence.sort((a, b) => {
            const dateA = new Date(a.expenceDate);
            const dateB = new Date(b.expenceDate);
            return dateB - dateA;
        });
        dispatch(expenceSlice.actions.setExpences(sortedExpence))
    }
}