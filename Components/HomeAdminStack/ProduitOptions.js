import React,{useState} from 'react'
import {Text, Image,View, Alert,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {firebase} from '../../src/Firebase/config' 
import { ScrollView } from 'react-native-gesture-handler';

export default function ProduitOptions({navigation,route,user},props){
    const params=route.params.params.params

    return(
            <View style={styles.mainView}>
                <View style={styles.imageContainerView}>
                    <View style={styles.headerButtonStyle}>
                            <Button text='<' onPress={()=>{navigation.goBack()}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle} />
                            <Text style={{marginHorizontal:'40%'}}></Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('ModifierProduit')}>
                                <Text style={styles.textOptions}>Modifier</Text>
                            </TouchableOpacity>
                        </View>
                    <Image
                        style={styles.imageContainer}
                        source={{uri:params.imageSource}} 
                    
                    />
                       

                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.categorie}>{params.categorie}</Text>
                    <Text style={styles.name}>{params.name}</Text>
                    <View style={styles.amountChoice}>
                        <Text>Quantité Restante: {params.amount}</Text>
                        <Text>Prix Actuel: {params.price}</Text>
                        <Text style={styles.textOptions}>Status: Activé</Text>
                    </View>
                    <ScrollView style={styles.description}>
                        <Text style={styles.titleDescription}>Description du Produit:</Text>
                        <Text style={styles.descriptionContent}>{params.description}</Text>
                    </ScrollView>
                </View>
                <Button text='Changer Statut' onPress={()=>{}} styleB={styles.logOutButtonArea} styleT={styles.buttonTitle}/>
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
        height:'100%',
        width:'100%',
        backgroundColor:'#FFFFFF'
    },
    imageContainerView:{
        flex:2,
        paddingHorizontal:20,
        width:'100%',
        alignItems:"center",
        borderBottomStartRadius:100,
        borderBottomEndRadius:100,
    },
    imageContainer:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    infoContainer:{
        flex:2,
        paddingTop:20,
        paddingHorizontal:20,
    },
    categorie:{
        fontSize:17,
        color:'#000000'
    },
    name:{
        fontSize:20,
        fontWeight:"bold",
        color:'#000000'
    },
    amountChoice:{
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    amount:{
        paddingHorizontal:'10%',
        
    },
    titleDescription:{
        fontSize:15,
        fontWeight:"bold",
        color:'#000000'
    },
    descriptionContent:{
        marginTop:2,
        fontSize:13,
        color:'gray'
    },
    buttonStyle:{
        height:40,
        width:40,
        borderRadius:7,
        backgroundColor:'#FF5018',
        alignItems:'center',
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
        color:'white'
    },
    headerButtonStyle:{
        flexDirection:'row',
        paddingTop:20,
    },
    logOutButtonArea:{
        marginVertical:20,
        width:'70%',
        height:'7%',
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
      fontSize:15,
      fontWeight:'bold',
      color:'white',
      textAlign:'center'
    },

    textOptions:{
        color:'#FF5018',
        fontWeight:'bold',
    },
})