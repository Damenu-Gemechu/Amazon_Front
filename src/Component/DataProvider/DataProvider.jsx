import {createContext,useReducer} from 'react'

export const DataContext=createContext()
// eslint-disable-next-line react/prop-types
export const DataProvider=({ children,reducer,initialState})=>{
return(
     <DataContext.Provider value={useReducer(reducer,initialState)}>
    {children}
    </DataContext.Provider>
    )
}

//  const [state,dispacth]=useReducer(reducer,initialState) 