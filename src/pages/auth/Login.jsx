import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import db, { authentication } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { async } from '@firebase/util';

const Login = () => {
    const [phone, setPhone] = useState("+234")

    const [otp, setOtp] = useState('')
    const [user, setUser] = useState("")

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                setUser(user.uid)
                console.log("Sign-in provider: " + user.providerId);


            } else {
                setUser("No user")
            }
        })
    }, [])



    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication)
    }

    const handleOTP = async () => {
        if (phone.length >= 12) {
            generateRecaptha()
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phone, appVerifier)
                .then((confirmationResult) => {

                    window.confirmationResult = confirmationResult
                })
                .catch((error) => {
                    console.log(error)
                })

        } else {
            alert("invalid phone number")
        }
    }

    const verifyOTP = async () => {
        if (otp.length === 6) {
            console.log(otp)
            let confirmationResult = window.confirmationResult

            confirmationResult.confirm(otp).then(async (result) => {
                // User signed in successfully.
                console.log(result.user);
                setUser(result.user.uid)
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        uid: result.user.uid,
                        name: "unnamed",
                        age: "",
                        location: ""
                    })

                } catch (error) {
                    console.log(error)
                }

            }).catch((error) => {
                // User couldn't sign in (bad verification code?)

            });

        }
    }

    const logout = () => {
        signOut(authentication)
            .then(() => {
                console.log("user has signed out")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>

            <h2>User: {user}</h2>
            <br /><br />
            PHONE:
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder='phone' />
            <br />
            OPT:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Opt' />
            <br />
            <div id="recaptcha"></div>
            <br />
            <button onClick={handleOTP}>Send OTP</button>
            <br /> <br />
            <button onClick={verifyOTP}>Verify OTP</button>
            <br /><br />
            <button onClick={logout}>LOGOUT</button>
        </div>
    )
}

export default Login