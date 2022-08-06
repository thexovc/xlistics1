import React from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import { TailwindProvider } from 'tailwindcss-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const IndexScreen = () => {
    const navigation = useNavigation();

  return (
    <TailwindProvider>
    <SafeAreaView style={tw`flex-1 p-12 bg-white justify-center`}>
    <GestureHandlerRootView>
    <View style={tw`p-2 pt-13 pl-10 w-100 self-start flex-auto`}>
            <Image
                style={{
                    width: 200, 
                    height: 200,
                    resizeMode: "contain"
                }}
                source={require('../assets/top.png')}
            />
            </View>
        <View style={tw`flex-auto pt-.5`}>
        <Image  source={require('../assets/vector.png')} style={tw`w-100 h-100 self-center items-center flex-auto`}/>
      </View>
      <View className='h-16 pt-8  w-80 self-center'>
      <View >
        
      <TouchableOpacity onPress={() => navigation.navigate("SignUp2")} style={tw`h-10 w-80 self-center rounded-md bg-gray-200`}>
          
        <Text style={tw`text-black font-bold underline text-center pt-2.5`}>Sign up with phone number</Text>
      </TouchableOpacity>
      </View>
      <View style={tw`h-16 pt-8  w-80 self-center`}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={tw`h-10 w-full rounded-md bg-black`}>
        <Text style={tw`text-white font-bold text-center pt-2`}>Be a courier/proxy</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={tw`flex-auto items-center mb-10 pt-8`}>
        <Image source={require('../assets/png.png')} style={tw`w-24 object-cover h-6 mt-10`}/>
      </View>
      <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaView>
    </TailwindProvider>
  ); 
}
export default IndexScreen;


