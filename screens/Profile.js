import React, { Component } from "react";
import tw from 'twrnc'
import {Text, Image, View, ScrollView, SafeAreaView} from 'react-native'
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";


class ToolTips extends Component {
    state = {
        names: [
            {'bar': 'Amanda Cleverly', 'descr':'Account name', 'id':1},
            {'bar': 'DownTown, TX', 'descr':'Address', 'id':2},
            {'bar': '+23480123456789', 'descr':'Phone number', 'id':3},
            {'bar': 'j2bxy@mail.com', 'descr':'Email address', 'id':4},
            {'bar': 'ID card', 'descr':'Identification', 'id':5},
            ]
    }
    render(){
        return(
                <SafeAreaView style={tw`bg-white p-4 justify-start h-full w-full`}>
                    <View style={tw`bg-gray-100 h-50 pt-10 justify-center mb-4 items-center `}>
            <Image style={tw`w-30 h-30 rounded-full border-blue-400	border-2`}/>
            <Text style={tw`p-1 text-2xl font-semibold text-center`}> Jane doe</Text>
        </View>
                    {
                        this.state.names.map((item, index) => (     
                            <TouchableOpacity>
                            <View style={tw`mb-2 flex-row bg-gray-100 pt-4 w-90 self-center justify-between my-1 px-2`} key = { item.id }>
                                <View style={tw`flex-auto`}>
                                <View style={tw`flex-col`}>
                                <Text style={tw`text-2xl font-bold`}>{item.bar}</Text>
                                <Text style={tw`text-lg text-gray-400`}>{item.descr}</Text>
                                </View>
                                </View>
                                <View style={tw`pr-4`}>
                                 <AntDesign style={tw`-pl-4 pr-4`} name="right" size={28} color="black"/>
                                </View>
                            </View>
                            </TouchableOpacity>
                        ))
                    }
                </SafeAreaView>
           )
    }
}
export default ToolTips