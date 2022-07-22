import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, placeholder } from 'react-native';
import React, {useState}  from 'react';
import tw from 'twrnc';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';


const Book = () => {
    const [category, setCategory] = useState('unknown');
    const [text, onChangeText] = React.useState(placeholder);
    const [tet, onChangeTet] = React.useState(placeholder);
    const [txt, onChangeTxt] = React.useState(placeholder);
  const [number, onChangeNumber] = React.useState(placeholder);

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
       onChangeTet={onChangeTet}
       value={tet}
       placeholder="Where-from"
        />
       </View>
       <View style={tw`pb-4 self-center w-90`}>
       <TextInput style={tw`h-10 p-2 border-b border-black`} 
       onChangeTxt={onChangeTxt}
       value={txt}
       placeholder="Where-to"
        />
       </View>
       <View style={tw`pb-4 self-center w-90`}>
       <TextInput style={tw`h-10 p-2 border-b border-black`} 
       onChangeText={onChangeNumber}
       value={number}
       placeholder="Amount"
       keyboardType="numeric"
       />
       </View>
       <View style={tw`pb-10 p-2 w-90 self-center`}>
       <TextInput
        style={tw`h-15 p-2 text-black rounded-md border border-black`}
        onChangeText={onChangeText}
        value={text}
        placeholder="Describe package to courier"
      />
      </View>
       <View style={tw`pt-5`}>
       <TouchableOpacity onPress={() => navigation.navigate("Chat")}  style={tw`h-10 w-80 rounded-md bg-black self-center mb-2`} > 
        <Text style={tw`text-white text-lg text-center pt-2.5`}>Book</Text>
      </TouchableOpacity>
      </View>
       </SafeAreaView>
    </TailwindProvider>
  );
};

export default Book;

const styles = StyleSheet.create({})