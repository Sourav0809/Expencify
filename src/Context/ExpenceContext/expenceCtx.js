import React from 'react'
const expenceCtx = React.createContext(
    {
        expenceList: [],
        setExpenceList: () => { },
        onAddExpence: () => { }

    }
)

export default expenceCtx;