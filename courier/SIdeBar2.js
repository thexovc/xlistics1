import { StyleSheet, TouchableOpacity, Text, Image, Title, View } from 'react-native'
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import History2 from "./History2";
import Help from "../components/Help";
import About from "../components/About";
import HomeScreen2 from "./HomeScreen2";
import tw from 'twrnc';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { authentication } from '../firebase';




const Drawer = createDrawerNavigator();

const logout = (navigation) => {
  

  signOut(authentication)
      .then(() => {
          console.log("user has signed out")
          navigation.navigate("Login")
      })
      .catch((err) => {
          console.log(err)
      })
}


const UserView = () => {
  const navigation = useNavigation();

    return (
        <View style={tw`bg-gray-100 h-50 pt-10 justify-center	items-center `}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image style={tw`w-30 h-30 rounded-full border-blue-400	border-2`}/>
            <Text style={tw`p-1 text-2xl font-semibold text-center`}> Jane doe</Text>
            </TouchableOpacity>
        </View>
    );
}

const CustomDrawer = (props) => {
  const navigation = useNavigation();
    return (
        <View style={{flex: 1}}>
            <UserView/>
            <DrawerContentScrollView>
                <DrawerItemList {...props}
                activeTintColor={Colors.black}
                />
            </DrawerContentScrollView>
            <DrawerItem label="Logout"
            onPress={() => logout(navigation)}
            icon={({size, color}) => (
                <MaterialIcons name="logout" size={size} color={color}/>
            )}
            />
        </View>
    )
}

function MyDrawer() {
  
  return (
    <Drawer.Navigator
    drawerStyle={{borderRadius: 30, width: 100}}
    useLegacyImplementation={true}
    screenOptions={{
        headerShown: false, drawerPosition: 'right',
        labelStyle: { fontSize: 40, fontWeight: 'bold'}
      }}
      drawerContent={(props) => <CustomDrawer {...props}/>}
    >
      <Drawer.Screen name="Home" component={HomeScreen2}
      options={{
        drawerIcon: ({size, color}) => (
            <Feather name="home" color={color} size={size}/>
        )
      }}
      />
      <Drawer.Screen name="History" component={History2}
      options={{
        drawerIcon: ({size, color}) => (
            <Feather name="edit" color={color} size={size}/>
        )
      }}
      />
      <Drawer.Screen name="Help" component={Help} 
      options={{
        drawerIcon: ({size, color}) => (
            <Feather name="compass" color={color} size={size}/>
        )
      }}
      />
      <Drawer.Screen name="About" component={About}
      options={{
        drawerIcon: ({size, color}) => (
            <Feather name="info" color={color} size={size}/>
        )
      }}
      />
    </Drawer.Navigator>
  );
}

const SideBar2 = ({navigate}) => {
 

  return (
       <MyDrawer/>
  )
}

export default SideBar2

const styles = StyleSheet.create({})