import React,{useState,useEffect} from 'react'
import { Text,View,ActivityIndicator,StyleSheet,TouchableOpacity } from 'react-native'
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'; 

import {firebase} from '../../src/Firebase/config'


export default function UI ({navigation,user}){

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    
    //LOADING CONFIGURATION
    function onLoading(){
        if (loading) {
            return  (
                <View style={ {flex:1,backgroundColor: "#FFFFFF",justifyContent: "center",flexDirection: "row", justifyContent: "space-around", padding: 10}}>
                    <ActivityIndicator size="large" color="#FF5018" />
                </View>
            )
        }
    }

    const onLogOutPress = () => {
        firebase
            .auth()
            .signOut()
    }
    useEffect(() => {
        const usersRef = firebase.firestore();
        usersRef
          .collection('users')
          .doc(user.uid)
          .collection('Informations')
          .doc('Data')
          .onSnapshot(documentSnapshot => {
              setData(documentSnapshot.data());
            });

      // Unsubscribe from events when no longer in use
      return () => usersRef;
      }, []);
        return(
            <View style={{flex:1}}>
                <View style={styles.topView}>
                    <View style={styles.options}>
                        <TouchableOpacity>
                            <Text style={styles.textOptions}>Historiques</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Modifier')}>
                            <Text style={styles.textOptions}>Modifier</Text>
                        </TouchableOpacity>
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
                                <Text style={styles.text}>{data.tel}</Text>
                            </View>
                        </View>
                        <View style={styles.elements}>
                            <View style={styles.icons}>
                                <MaterialIcons name="home" size={30} color="black" />
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{data.addr}</Text>
                            </View>
                        </View>
                        
                    </View>
                    <View>
                    <TouchableOpacity
                    style={styles.logOutButtonArea}
                    onPress={() => onLogOutPress()}>
                        <Text style={styles.buttonTitle}>LOG OUT</Text>
                    </TouchableOpacity>
                    </View>
                    {onLoading()}
                </View>
            </View>
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
    logOutButtonArea:{
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