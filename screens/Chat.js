import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Icon from '@expo/vector-icons/AntDesign';
import Iconz from '@expo/vector-icons/FontAwesome'
import Icony from '@expo/vector-icons/Ionicons'
import tw from 'twrnc'
import ProfileP from '../assets/pro.png'


export default function ChatScreen() {
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