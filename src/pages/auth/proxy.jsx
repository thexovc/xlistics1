import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import db, { authentication } from '../../firebase'

const Proxy = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retype, setRetype] = useState("")
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [error, setError] = useState("")
    const [success, setSucess] = useState("")


    const handleReg = async () => {
        if (password === retype) {
            try {
                await createUserWithEmailAndPassword(authentication, email, password)
                    .catch((err) => console.log(err))

                await updateProfile(authentication.currentUser, {
                    displayName: name,
                })

                await addDoc(collection(db, "proxy"), {
                    uid: authentication.currentUser.uid,
                    name: authentication.currentUser.displayName,
                    email,
                    password,
                    country,
                    state,
                    city
                })

                setCountry("")
                setEmail("")
                setName("")
                setRetype("")
                setPassword("")
                setState("")
                setError("")
                setCity("")
                setSucess("Registered Sucessfully")

            } catch (err) {
                console.log(err)
            }
        } else {
            setError("Password does not match")
            setSucess("")
        }

    }


    return (

        <div class="container">
            <h1>Register</h1>
            <br />
            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <br /> <br />

            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br /> <br />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br /><br />

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" value={retype} onChange={(e) => setRetype(e.target.value)} required />
            <br /><br />

            <label for="country"><b>Country</b></label>
            <input type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            <br /><br />

            <label for="state"><b>State</b></label>
            <input type="text" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} required />
            <br /><br />

            <label for="city"><b>City</b></label>
            <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <br /><br />

            {error !== "" ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : ""}

            {success !== "" ? (
                <p style={{ color: "green" }}>{success}</p>
            ) : ""}

            <button onClick={handleReg}>Register</button>
        </div>


    )
}

export default Proxy