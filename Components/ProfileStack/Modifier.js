import React,{useState,useEffect} from 'react'
import { Text,View,ActivityIndicator,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'; 

import {firebase} from '../../src/Firebase/config'



export default function Modifier ({user,navigation}){


    const [data, setData] = useState({})
    const [tel , setTel] = useState('')
    const [addr, setAddr] = useState('')
    const [email, setEmail] = useState('')
    
    useEffect(() => {
        const usersRef = firebase.firestore();
        usersRef
            .collection('users')
            .doc(user.uid)
            .collection('Informations')
            .doc('Data')
            .get()
            .then(doc => {
                if(!doc.exists){
                    alert('USER DOES NOT EXIST ANYMORE')
                    return;
                }
                setData(doc.data())
            }) 

        // Unsubscribe from events when no longer in use
        return () => usersRef;
      }, []);

    const modifierPress = () => {
        const usersRef = firebase.firestore();
        addr.trim()=="" ? setAddr(data.addr) : console.log('not null');
        tel.trim()=="" ? setTel(data.tel) : console.log('not null');
        email.trim()=="" ? setEmail(data.email) : console.log('not null');

        
        usersRef
            .collection('users')
            .doc(user.uid)
            .collection('Informations')
            .doc('Data')
            .update({
                addr:addr,
                tel:tel,
            })
            .then( alert('Modification Réussie!'))
        }

        
            


        return(
            <View style={{flex:1}}>
                <View style={styles.topView}>
                    <View style={styles.options}>
                     <Button text='<' onPress={()=>{navigation.goBack()}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle} />
                    </View>
                    <View style={styles.iconView}>
                        <FontAwesome5 name='user-alt' size={100}/>
                        <Text>{data.fullName}</Text>
                    </View>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.detailViewContainer}>
                        <View style={styles.elements}>
                            <View style={styles.icons}>
                                <MaterialIcons name="email" size={30} color="black" />
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{data.email}</Text>
                            </View>
                        </View>
                        <View style={styles.elements}>
                            <View style={styles.icons}>
                                <MaterialIcons name="smartphone" size={30} color="black" />
                            </View>
                            <View style={styles.textView}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Numero Téléphone'
                                    placeholderTextColor="#aaaaaa"
                                    onChangeText={(text) => setTel(text)}
                                    value={tel}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                
                            </View>
                        </View>
                        <View style={styles.elements}>
                            <View style={styles.icons}>
                                <MaterialIcons name="home" size={30} color="black" />
                            </View>
                            <View style={styles.textView}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Adresse'
                                    placeholderTextColor="#aaaaaa"
                                    onChangeText={(text) => setAddr(text)}
                                    value={addr}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                        
                    </View>
                    <View>
                    <TouchableOpacity
                    style={styles.modifierButtonArea}
                    onPress={() => modifierPress()}>
                        <Text style={styles.buttonTitle}>Modifier</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    
}
function Button({text,onPress,styleB,styleT}){
    return(
        <TouchableOpacity 
            style={styleB}
            onPress={onPress}
        >
            <Text style={styleT}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    topView:{
        flex:1,
        backgroundColor:'#F8F8F8',
    },
    iconView:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
        alignContent:'flex-end',
    },
    buttonStyle:{
        height:40,
        width:40,
        borderRadius:7,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    textButtonStyle:{
        color:'#FF5018',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
        
    },
    options:{
        flexDirection:"row",
        marginTop:10,
        marginHorizontal:15,
        justifyContent:'space-between',
    },
    textOptions:{
        color:'#FF5018',
        fontWeight:'bold',
    },
    detailView:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    detailViewContainer:{
        paddingVertical:40,
        paddingHorizontal:60,
    },
    elements:{
        flexDirection:'row',
        paddingVertical:10
    },
    icons:{
        flex:1,
    },
    textView:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        textAlign:"center",
    },
    modifierButtonArea:{
        marginVertical:20,
        width:'30%',
        height:'35%',
        justifyContent:"center",
        alignSelf:"center",
        alignItems:'center',
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
})