import React,{useState,Component} from 'react';
import { YellowBox,StyleSheet, View, Image, TextInput,TouchableOpacity,Text, Dimensions, Button, Alert } from 'react-native';

import logo from '../../Images/icon2.png'
import {firebase} from '../../src/Firebase/config'

YellowBox.ignoreWarnings(['Setting a timer']);
const { width: WIDTH} =Dimensions.get('window')

export default function LogIn ({navigation}) {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onLoginPress = () => {
      firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(error => {
            alert(error)
          })
          
  }

    return (
        <View style={styles.mainView}>
            <View style={styles.loginContainer}>
                <View style={styles.loginBox}>
                    <View style={styles.logoContainer}>
                        <Image source={logo}  style={styles.logo}/>
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='Email'
                            placeholderTextColor='grey'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <TextInput
                            secureTextEntry
                            style={styles.inputPass}
                            placeholder='Password'
                            placeholderTextColor='grey'
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                        />
                    
                    </View>
                </View>
            </View>
            
            <View style={styles.loginForgetPassArea}>
              <TouchableOpacity onPress={() => {}} >
                <Text style={styles.textForgetArea}>Forget Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {navigation.navigate('SignUp')}}>
                <Text style={styles.textForgetArea}>Don't have an account?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.loginButtonArea}
              onPress={() => onLoginPress()}>
                <Text style={styles.buttonTitle}>LOG IN</Text>
            </TouchableOpacity>
        </View>
    );
  }

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor:'#FFFFFF'
    },
    loginContainer:{
        height:'75%',
        margin:0,
        backgroundColor:'#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius:50,
        borderBottomStartRadius:50
    },
    loginBox:{
      backgroundColor:'white',
      shadowColor: '#000',
      shadowOffset: {width:5,height:5},
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation:12,
      borderRadius:20,
      paddingTop: 40,
      paddingBottom: 40,
    },
    logoContainer:{
      alignItems:'center'
    },
    logo:{
      height : 80,
      width :80
    },
    inputEmail:{
      width: WIDTH - 100,
      height:45,
      borderRadius: 15,
      fontSize:16,
      paddingLeft: 15,
      backgroundColor:'#c5c9cc79',
      color:'black',
      marginHorizontal: 25,
    },
    inputPass:{
      width: WIDTH - 100,
      height:45,
      borderRadius: 15,
      fontSize:16,
      paddingLeft: 15,
      backgroundColor:'#c5c9cc79',
      color:'black',
      marginHorizontal: 25,
      marginTop:20
    },
    loginForgetPassArea:{
        flex:1,
        marginTop:10,
        alignItems:'flex-end',
        justifyContent:'space-evenly'
      },
    textForgetArea:{
        textDecorationLine:'underline',
        color:'#2A2A2F'
    },
    loginButtonArea:{
        marginVertical:20,
        width:'30%',
        height:'8%',
        justifyContent:"center",
        alignSelf:"center",
        backgroundColor:'#FF5018',
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    buttonTitle:{
      fontSize:20,
      fontWeight:'bold',
      color:'white',
      textAlign:'center'
    }
});