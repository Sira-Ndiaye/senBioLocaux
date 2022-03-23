import React,{useState, useEffect} from 'react'
import {Text, SafeAreaView, ActivityIndicator,View, FlatList,TouchableOpacity,TextInput, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProduitItem from './ProduitItem'
import {firebase} from '../../src/Firebase/config'


export default function VoirProduit ({navigation,user},props) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    
    
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
    

    //FIREBASE CONFIGURATION
    function onError(error) {
        console.error(error);
    }
    useEffect(() => {
        const usersRef = firebase.firestore();
             usersRef
             .collection('Data')
             .onSnapshot(querySnapshot => {
             const data = [];
             querySnapshot.forEach(documentSnapshot => {
               data.push({
                 ...documentSnapshot.data(),
                 key: documentSnapshot.id,
               });
             });
             setData(data)
             setLoading(false)
           },onError);
         // Unsubscribe from events when no longer in use
         return () => usersRef;
       }, []);
       
        return(
            
        <SafeAreaView style={styles.mainView}>
            <View style={{flex:1}}>
                <View style={styles.headerButtonStyle}>
                    <Button text='<' onPress={()=>{navigation.goBack()}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle} />
                        <Text style={styles.headerTitleStyle}>Produits</Text>
                </View>
                <View style={styles.searchView}>
                    <TextInput style={styles.searchInput} placeholder="Produit..." onChangeText={(text) => setText(text)} underlineColorAndroid="transparent"
                    />
                    <Ionicons style={styles.searchIcon} name="ios-search" size={30} color="#000"/>
                </View>
                <FlatList
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.name} 
                    renderItem={({item}) => <ProduitItem {...props} uid={user.uid} navigation={navigation} params={item} />}
                >
                </FlatList>
                {onLoading()}
            </View>
        </SafeAreaView>
            
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
        backgroundColor:'#FFFFFF'   
    },
    headerButtonStyle:{
        flexDirection:'row',
        paddingTop:20,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center'
    },
    headerTitleStyle:{
        marginHorizontal:'30%',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    searchView:{
        marginHorizontal:20,
        marginVertical:18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderWidth:1,
        borderRadius:10,
    },
    searchIcon: {
        paddingRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#000',
        borderRightWidth:0,
        height:50,
        textAlign: 'center'
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
    flatList:{
        flex:1,
        marginHorizontal:20,
    },
    buttonTitle:{
      fontSize:20,
      fontWeight:'bold',
      color:'white',
      textAlign:'center'
    }
})