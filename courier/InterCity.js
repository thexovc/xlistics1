import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import db from '../src/firebase'
import { UserContext } from '../context/userContext'

const InterCity = () => {
    const [interCity, setInterCity] = useState(null)
    const {user} = useContext(UserContext)
    
    const getCity = async () => {

        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("city", "==", me.data.city));

        onSnapshot(q, (snapshot) => {
            setInterCity(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        // console.log(getCity)
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
        // console.log(permission)


    }, [])

  return (
    <View>
         {interCity && (
         <>
          {interCity.map(({ id, data }) => (
                        <View key={id}>
                           <Text> to: {data.to}</Text>
                           <Text>  Amount: {data.amount}</Text>
                           <Text>  desc: {data.desc}</Text>
                           
                           
                        </View>
                    ))}
                </>
         )
          }
      
    </View>
  )
}

export default InterCity

const styles = StyleSheet.create({})