// import { FlatList, TouchableOpacity, TouchableWithoutFeedback, Text, View, Image } from "react-native";
// import React from "react";
// import tw from "twrnc";
// import { Icon } from "react-native-elements/dist/icons/Icon";
// // import { useNavigation } from "@react-navigation/native";
// import { ModalScreen } from "./ModalScreen";


// const data = [
//     {
//         id: "012",
//         title: "Book Courier",
//         image: "./assets/courier.png",
//         // screen: "ModalScreen",
//     },
//     {
//         id: "123",
//         title: "Book Proxy",
//         image: "./assets/proxy.png",
//         // screen: "BookScreen",
//     },
// ];

// const navOptions = () => {
//   // const navigation = useNavigation();
//   let popupRef = React.createRef()
  
//   const onShowPopup = () => {
//     popupRef.show()
//   }

//   return (
//     <TouchableWithoutFeedback>
//     <FlatList
//       data={data}
//       horizontal
//       keyExtractor={(item) => item.id}
//       renderItem={({item}) => (
//         <TouchableOpacity 
//         // onPress={() => navigation.navigate(item.screen)}
//         onPress={onShowPopup}
//         style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
//           <View>
//             <Image
//               style= {{ width: 120, height: 120, resizeMode: "contain" }}
//               Source={item.image}
//             />
//             <Text style={tw`mt-2 text-lg font-semibold pl-2`}>{item.title}</Text>
//             <Icon 
//               style={tw`p-2 bg-black rounded-full w-10 mt-4`}
//               name= "arrowright" color="white" type="antdesign" />
//           </View>
//         </TouchableOpacity>
//         )}
//     />
//     </TouchableWithoutFeedback>

//   );
// };

// export default navOptions

