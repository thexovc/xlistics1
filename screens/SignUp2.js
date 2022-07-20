import React, {useState} from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Pressable, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import tw from 'twrnc';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// import CheckBox from '@react-native-community/checkbox'

const deviceHeight = Dimensions.get("window").height
const SignUp2 = () => {
    const navigation = useNavigation();
    
  return (
    <TailwindProvider> 
      <SafeAreaView style={tw`flex-1 w-full h-full self-center bg-white`}>
      <View style={tw` items-center pt-15`}>
        <Image source={require('../assets/png.png')}  style={tw`w-24 h-6 mb-10 `}/>
      </View>
        <Text style={tw`text-4xl w-100 pl-5 self-center`}>Sign up</Text>
        <Text style={tw`text-center text-lg`}>Do your thing X</Text>
      
       <View style={tw`p-2 mt-10 w-90 border-b self-center`}>
       <TextInput style={tw`h-6 rounded bg-gray-10`} placeholder='   Phone no' />
       </View>
       
       <View>
         <Text style={tw` p-2 text-sm w-80 self-center`}>By signing up you agree to our term of services and privacy policy</Text>
       </View>
       <View style={tw`pt-5 ml-60 w-30 self-center`}>
       <TouchableOpacity onPress={() => navigation.navigate("SideBar")} style={tw`h-10 w-full rounded-3xl bg-black`}>
          
        <Text style={tw`text-white text-lg text-center pt-1.5`}>Next</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default SignUp2;