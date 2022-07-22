import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import db, { authentication } from '../../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const ProxyLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [me, setMe] = useState(null)
    const [error, setError] = useState("")
    const [success, setSucess] = useState("")


    const handleLogin = async () => {
        try {
            signInWithEmailAndPassword(authentication, email, password)
                .then((fuser) => {
                    if (fuser) {
                        // const uid = user.uid;
                        setUser(fuser.user)
                        // console.log("user id:", user.uid)
                    }

                    const col = collection(db, `proxy`)
                    const q = query(col, where("uid", "==", fuser.user.uid));

                    onSnapshot(q, async (snapshot) => {
                        setMe(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })))
                    })

                    setEmail("")
                    setPassword("")
                    setError("")
                    setSucess("Logged In Sucessfully")

                })
        } catch (error) {
            console.log(error)
            setError("Error occured")
            setSucess("")
        }
    }

    return (
        <div class="container">
            <h1>Login</h1>
            <br />

            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br /> <br />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br /><br />



            {error !== "" ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : ""}

            {success !== "" ? (
                <p style={{ color: "green" }}>{success}</p>
            ) : ""}

            <button onClick={handleLogin}>Login</button>
        </div>

    )
}

export default ProxyLogin