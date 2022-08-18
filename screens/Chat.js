import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Icon from '@expo/vector-icons/AntDesign';
import Iconz from '@expo/vector-icons/FontAwesome'
import Icony from '@expo/vector-icons/Ionicons'
import tw from 'twrnc'
import ProfileP from '../assets/pro.png'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { collection, getDocs, onSnapshot, where } from "firebase/firestore";
import db, { authentication } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


export default function ChatScreen({route}) {
  const { client } = route.params;
  const {user, me} = useContext(UserContext)

  const [msg, setMsg] = useState("") 
  const [allMsg, setAllMsg] = useState([])

  console.log("client", client)

  const getMsg = async () => {
      // const querySnapshot = await getDocs(collection(db, "messages", user, "dm"), where("sender", "==", user));

      const userID = client
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

  
  const sendMsg = async () => {
    try {
        const docRef = await addDoc(collection(db, "messages", user, "dm"), {
            sender: user.uid,
            receiver: client,
            msg,
            timestamp: serverTimestamp()
        })
    } catch (error) {
        console.log(error)
    }
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




  return (
   <SafeAreaView style={tw`bg-blue-900 py-6 h-full`}>
     {/* Header */}
     <View style={tw`px-8 pb-4 pt-8 justify-between flex-row`}>
       <View style={tw`flex-row`}>
       <Icon style={tw`-pl-4 pr-4`} name="arrowleft" size={28} color="white"/>
       <View style={tw`w-12 h-12 rounded-lg`}>
       <Image source={ProfileP} style={tw`w-full h-full rounded-lg`}/>
         <View style={tw`pt-9 absolute pl-9`}>
         <View style={tw`bg-green-500 rounded-full w-3 h-3`}></View>
         </View> 
       </View>
       <View style={tw`flex-col`}>
       <Text style={tw`text-white text-lg pl-3`}>Emerson Herwitz</Text>
       <View style={tw`flex-row`}>
       <Text style={tw`text-white pl-3 texl-md`}>Courier</Text>
       <Text style={tw`text-gray-300 pl-3 texl-md`}>Online</Text>
       </View>
       </View>
       </View>
       <Iconz style={tw``} name="phone" size={32} color="black"/>
     </View>
     <View style={tw`bg-red-600 h-6 w-full text-center`}>
       <TouchableOpacity>
       <Text style={tw`text-white`}>Accept Package</Text>
       </TouchableOpacity>
     </View>

     {/* chatviews */}
     <ScrollView style={tw` bg-white h-3/4 w-full`}>
     </ScrollView>
     {/* TextInput */}
     <View style={tw`items-center flex-row pl-4 pt-5`}>
     <Icony style={tw`pr-4 -pl-4`} name="attach" size={28} color="black"/>
     <TextInput style={tw`bg-white text-lg rounded-lg h-12 w-3/4`} placeholder='  Type something'/>
     </View>
   </SafeAreaView>
  );
}