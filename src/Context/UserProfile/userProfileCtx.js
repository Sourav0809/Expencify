import React, { useState } from 'react'
const userProfileCtx = React.createContext({
    userInfo: "",
    setUserInfo: () => { },
})


export default userProfileCtx