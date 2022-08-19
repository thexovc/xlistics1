import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import db from '../src/firebase'
import { UserContext } from '../context/userContext'

const InterState = () => {
    const [interCity, setInterCity] = useState(null)
    const [go, setGo] = useState(false)
    // const [me, setMe] = useState(null)
    const { user, me } = useContext(UserContext)

    console.log(user.uid)
    console.log(me)

    const getCity = async () => {


        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("category", "==", "Interstate"));
        // console.log(me)

        onSnapshot(q, (snapshot) => {
            setInterCity(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            setGo(true)
        })

        // console.log(interCity)

    }


    useEffect(() => {
        const colRef = collection(db, "proxy")
        const q = query(colRef, where("uid", "==", user.uid))
        // getUserProfile()

        onSnapshot(q, (snapshot) => {
            // console.log(snapshot.docs)
            if (snapshot.docs.length !== 0) {
                getCity()
            } else {
                console("No Permission")
            }
        })


    }, [])

    const handleAccept = async (id) => {
        console.log(id)
        const col = doc(db, `openBookings/${id}`)

        await updateDoc(col, {
            status: "closed",
            proxy: user.uid
        }).then(() => {
            navigation.navigate("Chat", {
                client: client
            })
        })

    }


    return (
        <View>
            {go ? (
                <>
                    {interCity.map(({ id, data }) => (
                        <View key={id}>
                            <Text> to: {data.destination}</Text>
                            <Text>  Amount: {data.amount}</Text>
                            <Text>  desc: {data.desc}</Text>

                            <TouchableOpacity onPress={() => handleAccept(id)} style={tw`h-10 w-80 rounded-md bg-black self-center mb-2`} >
                                <Text style={tw`text-white text-lg text-center pt-2.5`}>Accept Order</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleChat(data.user)} style={tw`h-10 w-80 rounded-md bg-black self-center mb-2`} >
                                <Text style={tw`text-white text-lg text-center pt-2.5`}>chat with client</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            )
                : (
                    <Text>  Wahala </Text>
                )}

        </View>
    )
}

export default InterState

const styles = StyleSheet.create({})