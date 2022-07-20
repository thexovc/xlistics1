import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { Provider } from "react-redux";
import React, {useState} from "react";
import SignUpScreen from "./courier/SignUpScreen";
import SignUp2 from "./screens/SignUp2";
import IndexScreen from "./screens/IndexScreen";
// import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import '@expo/match-media';
import SideBar from "./screens/SideBar";
import ChatScreen from "./screens/Chat";
import ToolTips from "./screens/Profile";
import SideBar2 from "./courier/SIdeBar2";




export default function App() {

  const Stack = createNativeStackNavigator();



  return (

    // <Provider store={store}>
      <NavigationContainer>
      <StatusBar  barStyle= "dark-content"/>
        <SafeAreaProvider>
         <Stack.Navigator>
         <Stack.Screen 
            name="IndexScreen" 
            component={IndexScreen}
            options={{
              headerShown: false,
            }}
            />
          <Stack.Screen
            name="Chat" 
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
            />
          <Stack.Screen
            name="SideBar" 
            component={SideBar}
            options={{
              headerShown: false,
            }}
            /> 
            <Stack.Screen
            name="SideBar2" 
            component={SideBar2}
            options={{
              headerShown: false,
            }}
            /> 
            <Stack.Screen 
            name="SignUp2" 
            component={SignUp2}
            options={{
              headerShown: false,
            }}
            />
            <Stack.Screen 
            name="SignUpScreen" 
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
            />
            <Stack.Screen 
            name="Profile" 
            component={ToolTips}
            options={{
              headerShown: true,
            }}
            />
         </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    // </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
