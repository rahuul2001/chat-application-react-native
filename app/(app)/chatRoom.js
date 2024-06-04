import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { StatusBar } from 'expo-status-bar';
import MessageList from '../../components/MessageList';

import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '../../context/authContext';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

import CustomKeyboardView from '../../components/CustomKeyboardView';
import { getRoomId } from '../../utils/common';
import { db } from '../../firebaseConfig';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useRef } from 'react';


export default function ChatRoom() {
    const item = useLocalSearchParams(); // user from chatlist
    const { user } = useAuth() // logged in user
    const router=useRouter()
    // console.log('got item data: ', item?.username);
    const [messages, setMessages] = useState([])

    // state for message text
    const textRef = useRef('')

    // for clearing input after sending:
    const inputRef = useRef(null)

    const scrollViewRef = useRef(null)

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId)
        const docRef = doc(db, "rooms", roomId)
        const messageRef = collection(docRef, "messages")
        const q = query(messageRef, orderBy('createdAt', 'asc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data()
            })

            setMessages([...allMessages])
        })

        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        }

    },[])

    useEffect(()=>{
        updateScrollView()
    }, [messages])


    const updateScrollView = () => {
        setTimeout(()=>{
            scrollViewRef?.current?.scrollToEnd({animated: true})
        }, 100)
    }


    const createRoomIfNotExists = async () => {
        // get the roomId
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSend = async () => {
        let message = textRef.current.trim()

        if(!message){
            return;
        }
        try{
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);

            const messageRef = collection(docRef, "messages")

            textRef.current = ""
            if(inputRef) {
                inputRef?.current?.clear();
            }

            const newDoc = await addDoc(messageRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })

            console.log("NEW MESSAGE ID IS: ", newDoc.id)
        }
        catch{
            Alert.alert('Error Sending Message', err.message)
        }
    } 

    console.log("MESSAGES ARE: \n", messages)

  return (
    <CustomKeyboardView inChat={true}>

    
        <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router}/>
        <View className="h-3 border-b border-neutral-300"></View>
        

        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
            <View className="flex-1">
                <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
            </View>

            <View className="pt-2" style={{marginBottom: hp(2.8)}}>
                    <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                        <TextInput
                            ref={inputRef}
                            placeholder='Type message'
                            className="flex-1 mr-2"
                            style={{fontSize: hp(2)}}
                            onChangeText={value=> textRef.current= value}
                        />
                        <TouchableOpacity onPress={handleSend} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                            <FontAwesome name="send" size={hp(3)} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>

        </View>

        </View>
    </CustomKeyboardView>
  )
}