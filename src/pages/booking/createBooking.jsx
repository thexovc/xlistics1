import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db, { authentication } from '../../firebase'

const CreateBooking = ({ user }) => {
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [amount, setAmount] = useState(0)
    const [desc, setDesc] = useState("")
    const [error, setError] = useState("")
    const [success, setSucess] = useState("")

    const [permission, setPermission] = useState(false)



    const handleCreate = async () => {

        try {
            // `openBookings/open/${user.uid}`

            const colRef = collection(db, "users")
            const q = query(colRef, where("uid", "==", user.uid))

            onSnapshot(q, (snapshot) => {
                // console.log(snapshot.docs)
                if (snapshot.docs.length !== 0) {
                    setPermission(true)
                } else {
                    setPermission(false)
                }
            })
            // console.log(permission)

            if (permission) {
                await addDoc(collection(db, `openBookings`), {
                    user: user.uid,
                    destination: to,
                    where: from,
                    country,
                    state,
                    city,
                    amount,
                    desc,
                    status: "open"
                })

                setDesc("")
                setAmount(0)
                setCity("")
                setCountry("")
                setState("")
                setTo("")
                setFrom("")

                setSucess("Booked Successfully")
                setError("")

            } else {

                setError("You are not authorized")
                setSucess("")
            }

        } catch (err) {
            console.log(err)
            setError("An Error Occured")
            setSucess("")
        }
    }

    return (




        <div class="container" >
            <h1>Create a Booking</h1>

            <h2>User: {user?.uid}</h2>
            <br />
            <label for="name"><b>from</b></label>
            <input type="text" placeholder="From Where" value={from} onChange={(e) => setFrom(e.target.value)} required />
            <br /> <br />

            <label for="state"><b>to</b></label>
            <input type="text" placeholder="Destination" value={to} onChange={(e) => setTo(e.target.value)} required />
            <br /><br />

            <label for="country"><b>Country</b></label>
            <input type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            <br /><br />

            <label for="state"><b>State</b></label>
            <input type="text" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} required />
            <br /><br />

            <label for="country"><b>City</b></label>
            <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <br /><br />

            <label for="state"><b>Amount</b></label>
            <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <br /><br />

            <label for="state"><b>Description</b></label>
            <input type="text" placeholder="Enter Desc" value={desc} onChange={(e) => setDesc(e.target.value)} required />
            <br /><br />



            {
                error !== "" ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : ""
            }

            {
                success !== "" ? (
                    <p style={{ color: "green" }}>{success}</p>
                ) : ""
            }

            {user ? (
                <button onClick={handleCreate}>Create a Booking</button>
            ) : (
                <button onClick={handleCreate}>Create a Booking</button>
            )}
        </div>
    )
}

export default CreateBooking