"use client"

import { useContext,createContext,useState } from "react"


const CalenderContext = createContext<any>("")

export const CalenderProvider = ({children}:{children:React.ReactNode}) => {
    const [currDate,setCurrDate] = useState(new Date())
    const [view,setView] = useState("month'view")
    return(
        <CalenderContext.Provider value={{currDate,setCurrDate,view,setView}}>
            {children}
        </CalenderContext.Provider>
    )
}


export const CalenderHook = () => {
    return useContext(CalenderContext)
}