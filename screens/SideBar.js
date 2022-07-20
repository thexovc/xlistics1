import { StyleSheet, TouchableOpacity, Text, Image, Title, View } from 'react-native'
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import History from "../components/History";
import Help from "../components/Help";
import About from "../components/About";
import HomeScreen from "../screens/HomeScreen";
import tw from 'twrnc';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';




const Drawer = createDrawerNavigator();

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
    return (
        <View style={{flex: 1}}>
            <UserView/>
            <DrawerContentScrollView>
                <DrawerItemList {...props}
                activeTintColor={Colors.black}
                />
            </DrawerContentScrollView>
            <DrawerItem label="Logout"
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
      <Drawer.Screen name="Home" component={HomeScreen}
      options={{
        drawerIcon: ({size, color}) => (
            <Feather name="home" color={color} size={size}/>
        )
      }}
      />
      <Drawer.Screen name="History" component={History}
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

const SideBar = () => {
  return (
       <MyDrawer/>
  )
}

export default SideBar

const styles = StyleSheet.create({})