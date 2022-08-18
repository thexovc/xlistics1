import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import {  createContext, useEffect, useState } from "react";
import db, { authentication } from "../firebase";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [me, setMe] = useState(null)


  useEffect(() => {
    const updateUser = async () => {
      try {
        onAuthStateChanged(authentication, async (fuser) => {
          if (fuser) {
            setUser(fuser)
          }

          const col = collection(db, `proxy`)
          const q = query(col, where("uid", "==", fuser.uid));

          onSnapshot(q, async (snapshot) => {
            setMe(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          })
        });
      } catch (error) {
        console.log(error)
      }
    }

    updateUser()


  }, [])



    return (
        <UserContext.Provider value={{user, me}}>
            {children}
        </UserContext.Provider>
    )
}