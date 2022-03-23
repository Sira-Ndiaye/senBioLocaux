import React from 'react'
import {View, Alert,TouchableOpacity, StyleSheet,Text, Image} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {firebase} from '../../src/Firebase/config'

export default function HomeItem ({navigation,params,user},props){

    const onAddItemPress = () =>{
    const usersRef = firebase.firestore()
        usersRef
            .collection('users')
            .doc(user.uid)
            .collection('PanierItem')
            .doc(params.name)
            .set(params)
            .then(() => {
                Alert.alert('Votre Produit a été ajoutée à la liste dans Panier!')
            })
    }

    return(  
        <TouchableOpacity
            onPress={()=> navigation.navigate('Item',{screen:'Item', params:{params:params,uid:user.uid}})}
        >
            <View style={styles.cardContainer}>
                <View style={styles.imageContainerView}>
                    <View style={{flexDirection:'row',flex:1,width:'100%'}}>
                        <Image  
                            style={styles.imageContainer}
                            source={{uri:params.imageSource}}
                        />
                        <View style={styles.cartContainer}>
                            <TouchableOpacity onPress={()=>{ onAddItemPress() }} >
                                <MaterialCommunityIcons name= 'cart' size={30} color='#FFFFFF' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitleContainer}>{params.name}</Text>
                    <Text style={styles.infoCategorieContainer}>{params.categorie}</Text>
                    <Text style={styles.infoPriceContainer}>{params.price}  <Text style={styles.infoCategorieContainer}>1Kg FCFA</Text></Text>
                </View>        
            </View>
        </TouchableOpacity>
    )
}


const styles=StyleSheet.create({
    cardContainer:{
        flex:1,
        padding:5,
        width:160,
        height:200,
        backgroundColor:'#F8F8F8',
        marginBottom:10,
        borderRadius:20,
    },
    imageContainerView:{
        flex:2,
        marginLeft:5,
        alignItems:'center',
        justifyContent:'center',
        height:'100%'

    },
    imageContainer:{
        flex:4,
        marginTop:20,
        width:'80%',
        height:'80%',
        resizeMode:'contain'
    },
    cartContainer:{
        flex:1.2,
        height:40,
        width:'100%',
        paddingRight:0,
        borderRadius:7,
        backgroundColor:'#FF5018',
        shadowColor: '#FFBB90',
        shadowOffset: {width:5,height:5},
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation:1,
        alignItems:'center',
        justifyContent:'center'
    },
    infoContainer:{
        flex:1.2,
        paddingLeft:5
    },
    infoTitleContainer:{
        fontSize:17,
        color:'#000000'
    },
    infoCategorieContainer:{
        fontSize:12,
        color:'gray',
    },
    infoPriceContainer:{
        fontSize:20,
        color:'#000000'
    },
})