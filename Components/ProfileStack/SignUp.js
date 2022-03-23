import React, { useState } from 'react'
import { Image, Text,StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {firebase} from '../../src/Firebase/config'

export default function SignUp({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [tel, setTel] = useState('')
    const [addr, setAddr] = useState('')

    const onSignInPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    addr,
                    tel,
                };
                const usersRef = firebase.firestore()
                usersRef
                    .collection('users')
                    .doc(uid)
                    .collection('Informations')
                    .doc('Data')
                    .set(data)
                    .then(() => {
                        navigation.navigate('Profile')
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) =>  {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                } else{
                    alert(error)
                }
            });
            
    }


    return (
        <View style={styles.mainView}>
            <KeyboardAwareScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                <Image
                    style={styles.logo}
                    source={require('../../Images/icon2.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nom Complet'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Numero Téléphone'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTel(text)}
                    value={tel}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Adresse'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAddr(text)}
                    value={addr}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.loginButtonArea}
                    onPress={() => onSignInPress()}>
                    <Text style={styles.buttonTitle}>Sign UP</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={()=>{navigation.navigate('LogIn')}} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    mainView: {
        flex: 1,
        paddingVertical:'10%',
        paddingHorizontal:'5%',
        backgroundColor:'#FFFFFF'
    },
    scrollView:{
        backgroundColor:'#F8F8F8',
        flex:1,
        borderRadius:50
    },
    logo: {
        height : 80,
        width :80,
        alignSelf: "center",
        margin: 10
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#c5c9cc79',
        color:'black',
        margin:10,
        paddingLeft: 16
    },
    loginButtonArea:{
        marginVertical:20,
        width:'40%',
        height:'8%',
        justifyContent:"center",
        alignSelf:"center",
        backgroundColor:'#FF5018',
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6},
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    buttonTitle:{
      fontSize:20,
      fontWeight:'bold',
      color:'white',
      textAlign:'center'
    },
    footerView: {
        height:80,
        alignItems: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#FF5018",
        fontSize: 16
    }
})