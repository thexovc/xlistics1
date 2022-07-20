import React, {useState} from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Pressable, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import {Picker} from '@react-native-picker/picker';
import tw from 'twrnc';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SideBar2 from './SIdeBar2';

// import CheckBox from '@react-native-community/checkbox'

const deviceHeight = Dimensions.get("window").height
const SignUpScreen = () => {
    const navigation = useNavigation();
    const [country, setCountry ] = useState('Unknown');
    const [state, setState] = useState('Unknown');
    const [county, setCounty] = useState('Unknown');

  return (
    <TailwindProvider> 
      <SafeAreaView style={tw`flex-1 w-full h-full justify-center self-center bg-white`}>
      <View style={tw` items-center`}>
        <Image source={require('../assets/png.png')}  style={tw`w-24 h-6 mb-10 `}/>
      </View>
        <Text style={tw`text-4xl w-100 pl-5 self-center`}>Sign up</Text>
        <Text style={tw`text-center text-lg`}>Earn by your delivery service</Text>
       <View style={tw`pb-4 pt-8 w-100 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} placeholder='   FIrst name' />
       </View>
       <View style={tw`pb-4 w-100 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} placeholder='   Last name' />
       </View>
       <View style={tw`pb-4 w-100 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} placeholder='   E-mail' />
       </View>
       <View style={tw`pb-4 w-100 self-center`}>
       <TextInput style={tw`h-6 rounded-md bg-gray-100`} placeholder='   Phone no' />
       </View>
       <View style={tw`flex-initial pb-2`}>
       <Picker
       selectedValue={country}
        onValueChange={(value, index) => setCountry(value)}
       >
           <Picker.Item label="Please select your country" value="Unknown" />
         <Picker.Item label = 'Nigeria' value = 'Nigeria'  />
         <Picker.Item label = 'Ghana' value = 'Ghana'  />
         <Picker.Item label = 'Congo' value = 'Congo'  />
       </Picker>
       </View>
       <View style={tw`flex-initial pb-4`}>
       <Picker
       selectedValue={state}
       onValueChange={(value, index) => setState(value)}
       >
        <Picker.Item label="Please select your state" value="Unknown" />
         <Picker.Item label = 'Lagos' value = 'Lagos'  />
         <Picker.Item label = 'Delta' value = 'Delta'  />
         <Picker.Item label = 'Benin' value = 'Benin'  />
       </Picker>
       </View>
       <View style={tw`flex-initial pb-10`}>
       <Picker
       selectedValue={county}
       onValueChange={(value, index) => setCounty(value)}
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
       <TouchableOpacity onPress={() => navigation.navigate(SideBar2)} style={tw`h-10 w-full rounded-md bg-black`}>
          
        <Text style={tw`text-white text-lg text-center pt-2.5`}>Next</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default SignUpScreen;