import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import db from '../src/firebase'
import { UserContext } from '../context/userContext'

const InterState = () => {
    const [interCity, setInterCity] = useState(null)
    const [go, setGo] = useState(false)
    // const [me, setMe] = useState(null)
    const {user, me} = useContext(UserContext)

    console.log(user.uid)
    console.log(me)
    
    const getCity = async () => {


        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("category", "==","Interstate"));
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

  return (
    <View>
         {go ? (
         <>
          {interCity.map(({ id, data }) => (
                        <View key={id}>
                           <Text> to: {data.destination}</Text>
                           <Text>  Amount: {data.amount}</Text>
                           <Text>  desc: {data.desc}</Text>
                           <Button>Chat with Client</Button>   
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