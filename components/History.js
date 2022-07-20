import React, { Component } from "react";
import tw from 'twrnc'
import {Text, Image, View, ScrollView} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

class History extends Component {
    state = {
        names: [
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':1},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':2},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':3},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':4},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':5},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':6},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':7},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':8},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':9},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':10},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':11},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':12},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':13},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':14},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':15},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':16},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':17},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':18},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':19},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':20},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':21},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':22},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':23},
            {'profile': 'Amanda Cleverly', 'places':'Lagos - Benin city', 'description':'shoe delivery to client', 'price':'N2,000', 'id':24},
        ]
    }
    render(){
        return(
            <View style={tw`bg-none pt-85`}>
                <ScrollView style={tw` w-full`}>
                    {
                        this.state.names.map((item, index) => (
                            <View style={tw`flex-row bg-gray-50 justify-between my-1 px-2 py-2`} key = { item.id }>
                                <View style={tw`flex-row`}>
                                <View style={tw`items-center`}>
                                <View style={tw`flex-col w-full h-full py-4 pr-2 items-center`}>
                                <View style={tw`h-6 w-6 bg-blue-700 rounded-lg`}></View>
                                <Text style={tw`text-xs `}>{item.profile}</Text>
                                </View>
                                </View>
                                <View style={tw`flex-col`}>
                                <Text style={tw`text-xl `}>{item.places}</Text>
                                <Text style={tw`text-lg `}>{item.description}</Text>
                                <Text style={tw`text-sm `}>{item.price}</Text>
                                </View>
                                </View>
                                <View style={tw`pr-4 py-8`}>
                                    <TouchableOpacity>
                                        <View style={tw`bg-black w-12 h-6 pt-1 items-center text-white`}>
                                            <Text style={tw`text-xs text-white`}>Chat</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}
export default History;