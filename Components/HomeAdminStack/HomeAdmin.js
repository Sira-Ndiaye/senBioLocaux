import React,{useState,useEffect} from 'react'
import {Text, TouchableOpacity,View, StyleSheet} from 'react-native'

export default function HomeAdmin ({navigation},props){
    
    return(
       <View style={styles.mainView}>
           <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('AjouterProduit')}
                >
                    <Text style={styles.text}>Ajouter un Produit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('VoirProduit')}
                >
                    <Text style={styles.text}>Voir les Produits</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Voir les Statistiques</Text>
                </TouchableOpacity>
           </View>
       </View>
    )

}

const styles=StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:"#FFFFFF",
    },
    container:{
        flex:1,
        marginVertical:'40%',
        marginHorizontal:20,
        justifyContent:'space-between',
        alignItems:'center'
    },
    text:{
        color:"#FF5018",
        fontSize:20,
        fontWeight:"bold",
    }
})
