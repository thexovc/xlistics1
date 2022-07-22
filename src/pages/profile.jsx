import React, { useEffect, useState } from 'react'
import db from '../firebase.js'
import { collection, onSnapshot, setDoc, doc, addDoc, query, where, getDoc, updateDoc } from 'firebase/firestore'
import { async } from '@firebase/util'

function Profile() {
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [born, setBorn] = useState(0)
  const [f, setF] = useState("")
  const [l, setL] = useState("")
  const [b, setB] = useState(0)
  const [profile, setProfile] = useState([])
  const [me, setMe] = useState({
    id: "",
    data: {}
  })

  // GET ALL DOCUMENT
  useEffect(() => {
    const col = collection(db, "profile")
    const q = col
    // const q = query(col, where("born", "==", "2001"));

    onSnapshot(q, (snapshot) => {
      setProfile(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

    getADoc()

  }, [])

  // EDIT A SINGLE DOCUMENT

  const editProfile = async (id) => {
    const docRef = doc(db, "profile", "KRKuXZHPTvK5Rz3BCbp5")

    updateDoc(docRef, {
      first: f,
      last: l,
      born: b
    }).then(
      console.log("edited sucessful")
    )

  }


  // GET A SINGLE DOCUMENT
  const getADoc = async () => {
    const docRef = doc(db, "profile", "KRKuXZHPTvK5Rz3BCbp5");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setMe({
        id: docSnap.id,
        data: docSnap.data()
      })
      console.log(me.id)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // ADD A DOCUMENT
  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "profile"), {
        first,
        last,
        born
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input type="text" onChange={(e) => setFirst(e.target.value)} placeholder='first' />
      <input type="text" onChange={(e) => setLast(e.target.value)} placeholder='last' />
      <input type="number" onChange={(e) => setBorn(e.target.value)} placeholder='born' />
      <button onClick={handleSave}>Save</button>
      <br />

      <h2>List of profiles</h2>
      <ul>
        {profile.map(({ id, data }) => (
          <li key={id}> First: {data.first} Last: {data.last} Born: {data.born}</li>

        ))}

      </ul>

      <h2>Edit My Profile</h2>
      <ul>

        <div>
          <input type="text" placeholder={me.data.first} onChange={(e) => setF(e.target.value)} />
          <input type="text" placeholder={me.data.last} onChange={(e) => setL(e.target.value)} />
          <input type="number" placeholder={me.data.born} onChange={(e) => setB(e.target.value)} />
          <button onClick={() => editProfile(me.id)}>Edit</button>
          <br />
        </div>


      </ul>

    </div>
  )
}

export default Profile