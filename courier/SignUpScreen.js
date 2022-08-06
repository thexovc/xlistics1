import React, {useState} from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Pressable, TextInput, Alert } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import {Picker} from '@react-native-picker/picker';
import tw from 'twrnc';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import db, { authentication } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'


// import CheckBox from '@react-native-community/checkbox'

const deviceHeight = Dimensions.get("window").height
const SignUpScreen = ({navigate}) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retype, setRetype] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [phone, setPhone] = useState("")
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
                  displayName: fName,
              })

              await addDoc(collection(db, "proxy"), {
                  uid: authentication.currentUser.uid,
                  fName: authentication.currentUser.displayName,
                  lName,
                  phone,
                  email,
                  password,
                  country,
                  state,
                  city
              })

              setCountry("")
              setEmail("")
              setFName("")
              setLName("")
              setPhone("")
              setRetype("")
              setPassword("")
              setState("")
              setError("")
              setCity("")
              setSucess("Registered Sucessfully")

              navigation.navigate('Login')
             

          } catch (err) {
            Alert.alert('Alert Title', 'Firebase Error', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log(err) },
            ]);
          }
      } else {
          setError("Password does not match")
          setSucess("")
      }

  }



  return (
    <TailwindProvider> 
      <SafeAreaView style={tw`flex-1 w-full self-center bg-white`}>
      <View style={tw`justify-start  mt-8 items-center`}>
        <Image source={require('../assets/png.png')}  style={tw`w-24 h-6 mb-10 `}/>
      </View>
        <Text style={tw`text-4xl w-100 pl-5 self-center`}>Sign up</Text>
      <View
      style={tw`w-10 h-.5 bg-black rounded-lg ml-16 mt-3 mb-4`}/>
        <Text style={tw`text-center text-lg`}>Earn by your delivery service</Text>
       <View style={tw`pb-4 pt-8 w-90 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} value={fName} onChangeText={setFName} placeholder='   FIrst name' />
       </View>
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} value={lName} onChangeText={setLName} placeholder='   Last name' />
       </View>
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`}  value={email} onChangeText={setEmail} placeholder='   E-mail' />
       </View>
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} value={password} onChangeText={setPassword}  placeholder='   Password' />
       </View>
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} value={retype} onChangeText={setRetype} placeholder='   Retype Password' />
       </View>
       <View style={tw`pb-4 w-90 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} value={phone} onChangeText={setPhone} placeholder='   Phone no' />
       </View>
       <View style={tw`flex-initial self-center w-90 pb-2`}>
       <Picker
       itemStyle={{height:50}}
       selectedValue={country}
        onValueChange={(value, index) => setCountry(value)}
       >
           <Picker.Item label="Please select your country" value="Unknown" />
         <Picker.Item label = 'Nigeria' value = 'Nigeria'  />
         <Picker.Item label = 'Ghana' value = 'Ghana'  />
         <Picker.Item label = 'Congo' value = 'Congo'  />
       </Picker>
       </View>
       <View style={tw`flex-initial self-center w-90 pb-4`}>
       <Picker
       itemStyle={{height:50}}
       selectedValue={state}
       onValueChange={(value, index) => setState(value)}
       >
        <Picker.Item label="Please select your state" value="Unknown" />
         <Picker.Item label = 'Lagos' value = 'Lagos'  />
         <Picker.Item label = 'Delta' value = 'Delta'  />
         <Picker.Item label = 'Benin' value = 'Benin'  />
       </Picker>
       </View>
       <View style={tw`flex-initial self-center w-90 pb-10`}>
       <Picker
       itemStyle={{height:50}}
       selectedValue={city}
       onValueChange={(value, index) => setCity(value)}
       >
        <Picker.Item label="Please select your city" value="Unknown" />
         <Picker.Item label = 'Lagos' value = 'Lagos'  />
         <Picker.Item label = 'Warri' value = 'Warri'  />
         <Picker.Item label = 'Ugbowo' value = 'Ugbowo'  />
       </Picker>
       </View> 
       <View>
         <Text style={tw`text-sm p-2 w-80 self-center`}>By signing up you agree to our term of services and privacy policy</Text>
       </View>
       <View style={tw`pt-5  w-90 self-center`}>
       <TouchableOpacity onPress={handleReg} style={tw`h-10 w-full rounded-md bg-black`}>
          
          <Text style={tw`text-white text-lg text-center pt-2.5`}>Next</Text>
        </TouchableOpacity>
        
      </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default SignUpScreen;