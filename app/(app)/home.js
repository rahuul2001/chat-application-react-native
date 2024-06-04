import { View, Text, Pressable, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext';
import { ActivityIndicator } from 'react-native';
import ChatList from '../../components/ChatList';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { query, collection, where, getDocs } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function home() {

  const {logout, user} = useAuth();
  const [users, setUsers] = useState([])

  useEffect(()=>{
    if(user?.uid){
      getUsers()
    }
  })

  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid))

    const querySnapshot = await getDocs(q);

    let data = []
    querySnapshot.forEach(doc => {
      data.push({...doc.data()})
    })

    setUsers(data)
  }

  const handleLogout = async()=>{
    await logout();
  }
  // console.log(user)


  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light"/>
      {
        users.length>0 ? (
          <ChatList users={users} currentUser={user}/>
        ) : (
          <View className="flex items-center" style={{top: hp(30)}}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
     
    </View>
  )
}