import categorySlice from "../reducers/CategorySlice";

export const categoryAction = (newCategory) => {
    return (dispatch, getState) => {
        dispatch(categorySlice.actions.setCategory([...getState().categorys.categorys, newCategory]))
    }
}