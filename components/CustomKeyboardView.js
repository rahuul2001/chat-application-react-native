import { View, Text, ScrollView, Platform } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'

const ios = Platform.OS=='ios';

export default function CustomKeyboardView({children, inChat}) {
  let keyConfig = {};
  let scrollViewConfig = {};

  if(inChat){
    keyConfig = {keyboardVerticalOffset: 90};
    scrollViewConfig = {contentContainerStyle: {flex:1}}
  }
  

  return (
    <KeyboardAvoidingView
    behavior={ios ? 'padding' : 'height'}
    keyboardVerticalOffset={90}
    style={{flex:1}}
    {...keyConfig}>
        <ScrollView
        style={{flex:1}}
        contentContainerStyle={{flex:1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}>
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}