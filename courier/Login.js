import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Pressable, TextInput, Alert } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import {Picker} from '@react-native-picker/picker';
import tw from 'twrnc';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import db, { authentication } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";



// import CheckBox from '@react-native-community/checkbox'

const deviceHeight = Dimensions.get("window").height
const Login = ({navigate}) => {
    const navigation = useNavigation();


    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [me, setMe] = useState(null)
    const [error, setError] = useState("")
    const [success, setSucess] = useState("")


    useEffect(() => {
      onAuthStateChanged(authentication, (user) => {
          if (user) {
             
            navigation.navigate("SideBar2")

          } else {
              console.log("No user")
          }
      })
  })



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

                navigation.navigate("SideBar2")

                })
        } catch (error) {
            alert("error")
            console.log(error)
            setError("Error occured")
            setSucess("")
        }
    }

 
  return (
    <TailwindProvider> 
      <SafeAreaView style={tw`flex-1 w-full self-center bg-white`}>
    
        <Text style={tw`text-4xl p-10  justify-start w-100 pl-40 self-center`}>Login</Text>
      
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-14 rounded-md bg-gray-100`}  value={email} onChangeText={setEmail} placeholder='   E-mail' />
       </View>
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-14 rounded-md bg-gray-100`} value={password} onChangeText={setPassword}  placeholder='   Password' />
       </View>
       
       <TouchableOpacity>
         <Text style={tw`text-sm p-2 w-80 self-center`}>Forgot Password</Text>
       </TouchableOpacity>
       <View style={tw`pt-5  w-90 self-center`}>
       <TouchableOpacity onPress={handleLogin} style={tw`h-10 w-60 rounded-3xl self-center bg-black`}>
          
          <Text style={tw`text-white text-lg text-center pt-2`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")} style={tw`h-10 w-60 mt-2 mt-110 rounded-md self-center `}>
          
          <Text style={tw`text-black text-lg underline text-center pt-2`}>Not a user, Sign Up</Text>
        </TouchableOpacity>
       
      </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default Login;