import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import {  createContext, useEffect, useState } from "react";
import db, { authentication } from "../firebase";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)



  useEffect(() => {
    const updateUser = async () => {
      try {
        onAuthStateChanged(authentication, async (fuser) => {
          if (fuser) {
            // const uid = user.uid;
            setUser(fuser)
            // console.log("user id:", user.uid)
          }

         
        });
      } catch (error) {
        console.log(error)
      }
    }

    updateUser()


  }, [])


    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}