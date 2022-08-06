import {FlatList, StyleSheet, TouchableOpacity, View, Text, SafeAreaView, Image} from "react-native";
import React, {useContext, useState} from "react";
import tw from "twrnc";
// import NavOptions from "../components/NavOptions";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FontAwesome5 } from '@expo/vector-icons';
import { UserContext } from "../context/userContext";


const data = ([
  {
      id: "012",
      title: "Intercity",
      image: require("../assets/city.png"),
      screen: "InterCity",
  },
  {
      id: "123",
      title: "Interstate",
      image: require("../assets/state.png"),
      screen: "InterState",
  },
  {
    id: "235",
    title: "International",
    image: require("../assets/international.png"),
    screen: "International",
},
]);

const HomeScreen2 = ({navigation}) => {

  const { user} = useContext(UserContext)
  
  return (
    
    <TailwindProvider>
     <SafeAreaView style={tw`bg-white h-full self-auto pt-2`}>
      <View style={tw`p-7`}>
        <Image
            style={{ 
                width: 60, 
                height: 60,
                resizeMode: "contain"
            }}
            source={require('../assets/icon.png')}
        />

        {/* <NavOptions /> */}
        <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity 
        onPress={() => navigation.navigate(item.screen)}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-35`}>
          <View style={tw`w-150 h-30`}>
            <Image
              style= {{ width: 40, height: 50, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold pl-2`}>{item.title}</Text>
            <Icon 
              style={tw`p-1 bg-black rounded-full w-8 mt-4`}
              name= "arrowright" color="white" type="antdesign" />
          </View>
        </TouchableOpacity>
        )}
    />
      </View>
      
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginLeft: 200, marginTop: -290}}>
        <Text style={{fontSize: 20}}
        >{user.displayName} Welcome</Text>
      </View>

      <View
      style={tw`items-center bg-gray-200 mt-1 w-15 justify-end p-2 rounded-l-lg ml-90`}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} >
          <FontAwesome5 name="bars" size={24} color="black"  />
        </TouchableOpacity>
      </View>
      
      </SafeAreaView>
    </TailwindProvider>
  );
};


export default HomeScreen2

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})