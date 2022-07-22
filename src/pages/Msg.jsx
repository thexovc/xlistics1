import { async } from '@firebase/util'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db, { authentication } from '../firebase'

const Msg = () => {
    const [msg, setMsg] = useState("")
    const [user, setUser] = useState("")
    const [allMsg, setAllMsg] = useState([])

    const getMsg = async () => {
        // const querySnapshot = await getDocs(collection(db, "messages", user, "dm"), where("sender", "==", user));

        const userID = "tRwJnykuJef75P8qbeExcHNISYB3"
        const col = await collection(db, `messages/${userID}/dm`)
        // const q = col
        const q = query(col, where("sender", "==", user));

        const qSnap = await getDocs(q)
        // console.log(qSnap)
        // console.log(qSnap.docs.map(d => ({ id: d.id, ...d.data() })))

        onSnapshot(q, (snapshot) => {
            setAllMsg(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }


    useEffect(() => {
        onAuthStateChanged(authentication, (userP) => {
            if (userP) {
                setUser(userP.uid)
                // console.log("Sign-in provider: " + userP.providerId);

                getMsg()

                // console.log(allMsg)
            } else {
                setUser("No user")
            }
        })


    }, [allMsg])






    const sendMsg = async () => {
        try {
            const docRef = await addDoc(collection(db, "messages", user, "dm"), {
                sender: user,
                receiver: "Nameabcd",
                msg,
                timestamp: serverTimestamp()
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            {allMsg && (
                <>

                    <br />
                    <h1>User: {user}</h1>

                    <br />
                    {allMsg.map(({ id, data }) => (
                        <li key={id}> MSG: {data.msg} sender: {data.sender} Born: {data.receiver}</li>

                    ))}

                    <br /><br />
                    <input type="text" onChange={(e) => { setMsg(e.target.value) }} placeholder='type a message' />
                    <br /><br />
                    <button onClick={sendMsg}>Send a Message</button>
                </>
            )}
        </div>
    )
}

export default Msg