import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Stack } from 'expo-router';
import { Image } from 'expo-image';

import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
        options={{
            title:'',
            headerShadowVisible: false,
            headerLeft: ()=> (
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Entypo name="chevron-left" size={hp(4)} color="gray" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={user?.profileUrl}
                            style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                        />
                        <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                            {user?.username}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: ()=> (
                <View className="flex-row items-center gap-8">
                    <Ionicons name="call-sharp" size={hp(3)} color="black" />
                    <AntDesign name="videocamera" size={hp(3)} color="black" />
                </View>
            )
        }}
    />
  )
}