import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, placeholder } from 'react-native';
import React, {useState}  from 'react';
import tw from 'twrnc';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import db from '../firebase';


const Book = () => {
  //   const [category, setCategory] = useState('unknown');
  //   const [text, onChangeText] = useState("");
  //   const [tet, onChangeTet] = useState("");
  //   const [txt, onChangeTxt] = useState("");
  // const [number, onChangeNumber] = useState("");

  const user = {
    "uid":"tRwJnykuJef75P8qbeExcHNISYB3"
  }

  // const [country, setCountry] = useState("")
  //   const [state, setState] = useState("")
    // const [city, setCity] = useState("")
    const [category, setCategory] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [amount, setAmount] = useState("")
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
                  category,
                  amount,
                  desc,
                  status: "open"
              })

              setDesc("")
              setAmount("")
              setCategory("")
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


  const navigation = useNavigation();

  return (
    <TailwindProvider>
        <SafeAreaView>
        <View style={tw`flex-initial w-80 self-center h-12 mb-2 `}>
      <Picker 
      itemStyle={{height:45 }}
        selectedValue={category}
        onValueChange={(value, index)  => 
        setCategory(value)
        }>
        <Picker.Item label="Please select your Category" value="Unknown" />
        <Picker.Item label="International" value="International" />
        <Picker.Item label="Interstate" value="Interstate" />
        <Picker.Item label="Intercity" value="Intercity" />
      </Picker>
    </View>
    
     
   <View style={tw`h-10 p-2 border-b border-black pb-4 self-center w-90`}>
   <Entypo style={tw`h-6 w-10 self-start`} name="location-pin" size={24} color="red" />
       <TextInput style={tw`ml-5 `} 
       value={from} onChangeText={setFrom}
       placeholder="Where-from"
        />
       </View>
       <View style={tw`pb-4 self-center w-90`}>
       <TextInput style={tw`h-10 p-2 border-b border-black`} 
       value={to} onChangeText={setTo}
       placeholder="Where-to"
        />
       </View>
       <View style={tw`pb-4 self-center w-90`}>
       <TextInput style={tw`h-10 p-2 border-b border-black`} 
      value={amount} onChangeText={setAmount}
       placeholder="Amount"
       keyboardType="numeric"
       />
       </View>
       <View style={tw`pb-10 p-2 w-90 self-center`}>
       <TextInput
        style={tw`h-15 p-2 text-black rounded-md border border-black`}
        value={desc} onChangeText={setDesc}
        placeholder="Describe package to courier"
      />
      </View>
       <View style={tw`pt-5`}>
       <TouchableOpacity onPress={handleCreate}  style={tw`h-10 w-80 rounded-md bg-black self-center mb-2`} > 
        <Text style={tw`text-white text-lg text-center pt-2.5`}>Book</Text>
      </TouchableOpacity>
      </View>
       </SafeAreaView>
    </TailwindProvider>
  );
};

export default Book;

const styles = StyleSheet.create({})