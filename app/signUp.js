import { View, Text, Image, StatusBar, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AntDesign from '@expo/vector-icons/AntDesign';
import { useSegments, useRouter } from 'expo-router';
import Loading from '../components/Loading';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';



export default function signUp() {

  const router = useRouter()

  const {register} = useAuth()

  const [loading, setLoading] = useState(false)

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const profileRef = useRef("")
  const usernameRef = useRef("")

  const handleRegister = async () => { 
    if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current){
      Alert.alert('Sign Up', "Please fill in all the fields!")
      return;
    }

    // register process
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current)
    setLoading(false)

    console.log('Response is: ', response)

    if(!response.success){
      Alert.alert('Sign Up', response.msg)
    }else {
      // Handle successful registration
      Alert.alert('Sign Up Success', 'You have successfully registered!');
    }
    

  }

  return (
    <CustomKeyboardView>
      <StatusBar style="dark"/>
      <View style={{paddingTop: hp(7), paddingHorizontal: wp(25)}} className="flex-1 gap-12">
        <View className="items-center">
          <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/register.png')} />
          <View className="gap-5">
            <Text style={{fontSize: hp(4)}} className="font-bold text-center tracking-wider text-neutral-800 pt-5">Sign Up</Text>

            {/* form for adding inputs */}

            <View style={{height: hp(7), width: '100%'}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <AntDesign name="user" size={hp(2.7)} color="gray" />
              <TextInput 
              onChangeText={(value)=>{
                usernameRef.current = value
              }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Username" 
              placeholderTextColor={'gray'}/>
            </View>

            <View style={{height: hp(7), width: '100%'}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <AntDesign name="mail" size={hp(2.7)} color="gray" />
              <TextInput 
              onChangeText={(value)=>{
                emailRef.current = value
              }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Email Address" 
              placeholderTextColor={'gray'}/>
            </View>

            
            <View style={{height: hp(7), width: '100%'}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <AntDesign name="lock" size={hp(2.7)} color="gray" />
              <TextInput 
              onChangeText={(value)=>{
                passwordRef.current = value
              }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Password" 
              secureTextEntry
              placeholderTextColor={'gray'}/>
              
            </View>

            <View style={{height: hp(7), width: '100%'}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <MaterialCommunityIcons name="face-man-profile" size={hp(2.7)} color="gray" />
              <TextInput 
              onChangeText={(value)=>{
                profileRef.current = value
              }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Profile Picture URL" 
              placeholderTextColor={'gray'}/>
            </View>

            {/* sign in button button */}

            <View>
              {
                loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(15)}/>
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleRegister} style={{height:hp(6.5)}} className="bg-indigo-500 rounded-xl justify-center items-center">
                    <Text style={{fontSize: hp(1.8)}} className="text-white font-bold tracking-wider">Sign Up</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            

            {/* sign up button */}
            <View className="flex-row justify-center">
              <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an account? </Text>
              <Pressable onPress={()=>{
                router.push('signIn')
              }}>
                <Text style={{fontSize: hp(1.8)}} className="font-bold text-indigo-500">Sign in!</Text>
              </Pressable>
              
            </View>

          </View>
        </View>

        
      </View>
    </CustomKeyboardView>
  )
}
