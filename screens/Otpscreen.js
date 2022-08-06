import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Pressable, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import tw from 'twrnc';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import db, { authentication } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const deviceHeight = Dimensions.get("window").height
const OtpScreen = () => {
    const navigation = useNavigation();
    // const [toggleCheckBox, setToggleCheckBox] = useState(false)


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
                    alert(error)
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
                    alert(error)
                }

            }).catch((error) => {
                // User couldn't sign in (bad verification code?)

            });

        }
    }

    
  return (
    <TailwindProvider> 
      <SafeAreaView style={tw`flex-1 w-full h-full self-center bg-white`}>
      <View style={tw` items-center pt-15`}>
        <Image source={require('../assets/png.png')}  style={tw`w-24 h-6 mb-10 `}/>
      </View>
        <Text style={tw`text-4xl w-100 pl-5 self-center`}>Enter OTP</Text>
        <View
      style={tw`w-10 h-.5 bg-black rounded-lg ml-16 mt-3 mb-4`}/> 
        <Text style={tw`text-center text-lg`}>An OTP is sent to xxxxxxx</Text>
      
       <View style={tw`p-2 mt-10 w-80 border-b self-center`}>
       <TextInput style={tw`h-6 rounded bg-gray-10`} value={otp} onChangeText={setOtp} placeholder='   Verify' />
       <View id="recaptcha" />
       </View>
       
       <View>
       {/* <CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
  /> */}
         <Text style={tw` p-5 text-sm w-80 self-center`}>Resend OTP in xxx</Text>
       </View>
       <View style={tw`pt-5 ml-60 w-30 self-center`}>
       <TouchableOpacity onPress={() => navigation.navigate("SideBar")} style={tw`h-10 w-full rounded-3xl bg-black`}>
          
        <Text style={tw`text-white text-lg text-center pt-1.5`}>Verify OTP</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default OtpScreen;