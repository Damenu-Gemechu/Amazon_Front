
import React, { useContext, useEffect } from "react"
import Routing from "./Router"
import { DataContext } from "./Component/DataProvider/DataProvider"
import {Type} from "./Utility/actiontype.js"
import {auth} from "./Utility/firebase.js"
const App = () => {
const [{user},dispatch]=useContext(DataContext)

  useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //console.log(authUser)
      dispatch({
         type: Type.SET_USER , 
         user : authUser
        });
    }else{
      dispatch({
        type: Type.SET_USER, 
        user : null
      });
     }
  });
  },[])
  return (
    <div>
   <Routing/>
    </div>
  )
}

export default App
