import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import db from '../../firebase'

const AcceptOrder = ({ user, me }) => {
    const [interCity, setInterCity] = useState(null)
    const [interState, setInterState] = useState(null)
    const [international, setInternational] = useState(null)
    const [permission, setPermission] = useState(false)


    // const getUserProfile = async () => {

    //     const col = collection(db, `proxy`)
    //     const q = query(col, where("uid", "==", user.uid));

    //     onSnapshot(q, async (snapshot) => {
    //         setMe(snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             data: doc.data()
    //         })))
    //     })
    // }

    const getCity = async () => {

        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("city", "==", me.data.city));

        onSnapshot(q, (snapshot) => {
            setInterCity(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        // console.log(getCity)
    }

    const getState = async () => {

        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("state", "==", me.data.state));

        onSnapshot(q, (snapshot) => {
            setInterState(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        // console.log(getState)
    }

    const getNation = async () => {

        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("country", "==", me.data.country));

        onSnapshot(q, (snapshot) => {
            setInternational(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        // console.log(getNation)
    }

    useEffect(() => {
        const colRef = collection(db, "proxy")
        const q = query(colRef, where("uid", "==", user.uid))
        // getUserProfile()

        onSnapshot(q, (snapshot) => {
            // console.log(snapshot.docs)
            if (snapshot.docs.length !== 0) {
                getCity()
                getState()
                getNation()
            } else {
                console("No Permission")
            }
        })
        // console.log(permission)


    }, [])

    return (
        <div>
            {interCity && interState && international ? (
                <>
                    <h1>Accept Order</h1>
                    <h2>User: {me ? me.data.email : ""}</h2>

                    <h3>InterCity</h3>
                    {interCity.map(({ id, data }) => (
                        <div key={id}>
                            to: {data.to}
                            Amount: {data.amount}
                            desc: {data.desc}
                        </div>
                    ))}

                    <h3>InterState</h3>
                    {interState.map(({ id, data }) => (
                        <div key={id}>
                            to: {data.to}
                            Amount: {data.amount}
                            desc: {data.desc}
                        </div>
                    ))}

                    <h3>InterNational</h3>
                    {international.map(({ id, data }) => (
                        <div key={id}>
                            to: {data.to}
                            Amount: {data.amount}
                            desc: {data.desc}
                        </div>
                    ))}
                </>
            ) : ""}
        </div>
    )
}

export default AcceptOrder