import React,{useState} from 'react'
import {Text, Image,View, Alert,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {firebase} from '../src/Firebase/config' 

export default function Item({navigation,route,user},props){
    const params=route.params.params.params
    const [count, setCount] = useState(1);
    const onPress = (op) => {
        setCount(op==='plus' ? count + 1 : count - 1)
        //params.count=count;
    }
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
            <View style={styles.mainView}>
                <View style={styles.imageContainerView}>
                    <View style={styles.headerButtonStyle}>
                            <Button text='<' onPress={()=>{navigation.goBack()}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle} />
                            <Text style={{marginHorizontal:'40%'}}></Text>
                            <TouchableOpacity
                                    onPress={()=>onAddItemPress()}
                                    style={styles.buttonStyle}
                                >
                                    <MaterialCommunityIcons name= 'cart' size={30} color='#FFFFFF' />
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
                        <Button text='-' onPress={()=>{onPress('moins')}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle}/>
                            <Text style={styles.amount}>{count >= 1 && count<=params.amount? count : count>=params.amount? setCount(params.amount):setCount(1)} Kg</Text>
                        <Button text='+' onPress={()=>{onPress('plus')}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle}/>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.titleDescription}>Description du Produit:</Text>
                        <Text style={styles.descriptionContent}>{params.description}</Text>
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
        height:'100%',
        width:'100%',
        backgroundColor:'#FFFFFF'
    },
    imageContainerView:{
        flex:2.5,
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
        fontSize:25,
        color:'#000000'
    },
    name:{
        fontSize:25,
        fontWeight:"bold",
        color:'#000000'
    },
    amountChoice:{
        marginVertical:20,
        flexDirection:'row',
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
    }
})