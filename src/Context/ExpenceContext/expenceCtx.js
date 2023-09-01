import React from 'react'
const expenceCtx = React.createContext(
    {
        expenceList: [],
        setExpenceList: () => { },
        onAddExpence: () => { },
        onEditExpence: () => { },
        // clicedkExpenceId: "",
        // setClickedExpenceId: () => { },
        editedExpencesVal: "",

    }
)

export default expenceCtx;