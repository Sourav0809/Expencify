import categorySlice from "../reducers/CategorySlice";
import formatEmail from "../../Functions/formatEmail";
import axios from "axios";
export const setCatagory = (newCategory) => {
    return async (dispatch, getState) => {


        const userEmail = getState().auth.userEmail


        try {
            if (userEmail) {
                const { data } = await axios.post(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/categorys/.json`
                    , newCategory)

                const newExpenceObj = { firebaseId: data.name, ...newCategory };

                dispatch(categorySlice.actions.setCategory([...getState().categorys.categorys, newExpenceObj]))
            }
        } catch (error) {
            console.log(error);
        }

    }
}



export const fetchCatagory = () => {
    return async (dispatch, getState) => {
        const userEmail = getState().auth.userEmail

        //making the loader true
        dispatch(categorySlice.actions.setLoaderTrue())
        try {
            if (userEmail) {
                const { data } = await axios.get(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/categorys/.json`)
                if (data) {
                    const categorysArray = Object.keys(data).map((firebaseId) => ({
                        firebaseId,
                        ...data[firebaseId],
                    }));

                    dispatch(categorySlice.actions.fetchCatagory(categorysArray))
                }
            }
        } catch (error) {
            console.log(error);
        }
        // making the loader false
        dispatch(categorySlice.actions.setLoaderFalse())
    }
}


export const deleteCategory = (id) => {
    return async (dispatch, getState) => {
        const categorys = getState().categorys.categorys
        const userEmail = getState().auth.userEmail
        let firebaseId = null
        try {
            categorys.forEach((val) => {
                if (val.id === id) {
                    firebaseId = val.firebaseId
                }
            })

            if (firebaseId) {
                const { data } = await axios.delete(`https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(userEmail)}/categorys/${firebaseId}.json`)
                const filteredCat = categorys.filter((val) => {
                    return val.id !== id
                })

                dispatch(categorySlice.actions.deleteCategory(filteredCat))

            }

        } catch (error) {
            console.log(error);
        }


    }
}

