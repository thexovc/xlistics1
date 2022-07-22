import React, { useEffect, useState } from 'react'
import Error from './pages/Error';
import Login from './pages/auth/Login';
import Msg from './pages/Msg';
import Proxy from './pages/auth/proxy'
import CreateBooking from './pages/booking/createBooking'
import { onAuthStateChanged } from 'firebase/auth';
import db, { authentication } from './firebase';
import AcceptOrder from './pages/proxy/AcceptOrder';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { async } from '@firebase/util';
import ProxyLogin from './pages/auth/ProxyLogin';


const App = () => {
  const [user, setUser] = useState(null)
  const [me, setMe] = useState(null)


  useEffect(() => {
    const updateUser = async () => {
      try {
        onAuthStateChanged(authentication, async (fuser) => {
          if (fuser) {
            // const uid = user.uid;
            setUser(fuser)
            // console.log("user id:", user.uid)
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
    <div>
      {user && me ? (
        <>
          {/* <CreateBooking user={user} /> */}
          < AcceptOrder user={user} me={me[0]} />
          {/* <Proxy /> */}
          {/* <ProxyLogin /> */}
          {/* <Login /> */}
          {/* 
       <Msg user={user} />
       <br /> <br /> */}
          {/* <Error /> */}
        </>
      ) : ""}
    </div>
  )
}

export default App