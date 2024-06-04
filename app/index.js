import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
// import { ActivityIndicator } from 'react-native-web'

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray"/>
    </View>
  )
}