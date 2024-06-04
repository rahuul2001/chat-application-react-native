import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router';

export default function ChatList({users, currentUser}) {

  const router = useRouter()
  return (
    <GestureHandlerRootView style={{flex: 1}}> 
      <View className="flex-1">
          <FlatList
              data={users}
              contentContainerStyle={{flex: 1, paddingVertical: 25}}
              keyExtractor={item => Math.random()}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index})=>(
                  <ChatItem 
                  item={item}
                  router={router}
                  currentUser={currentUser}
                  noBorder={index+1 == users.length} />
              )}
          />
      </View>
    </GestureHandlerRootView>
  )
}
