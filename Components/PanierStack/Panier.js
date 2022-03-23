import React,{useState, useEffect} from 'react'
import {Text, SafeAreaView, ActivityIndicator,View, FlatList,TouchableOpacity, StyleSheet} from 'react-native'

import PanierItem from './PanierItem'
import {firebase} from '../../src/Firebase/config'


export default function Panier ({navigation,uid},props) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true); 
    const [total, setTotal] = useState(0);

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
    const confirmerCommande = () => {
        navigation.navigate('Commande')
    }


    //FIREBASE CONFIGURATION
    function onError(error) {
        console.error(error);
    }
    
    useEffect(() => {
            const usersRef = firebase.firestore();
            usersRef
                .collection('users')
                .doc(uid)
                .collection('PanierItem')
                .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                  data.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                  });
                });
                setData(data);
                let initialTotal=0;
                data.forEach(function(obj){
                    initialTotal+= obj.count * obj.price;
                })
                setTotal(initialTotal);
                setLoading(false);
              },onError);
            // Unsubscribe from events when no longer in use
            return () => usersRef;
          }, []);
       
        return(
            
        <SafeAreaView style={styles.mainView}>
            <View style={{flex:1}}>
                <View style={styles.headerButtonStyle}>
                    <Button text='<' onPress={()=>{navigation.goBack()}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle} />
                        <Text style={styles.headerTitleStyle}>Panier</Text>
                    <Button text='x' onPress={()=> deleteAll()} styleB={styles.buttonStyle} styleT={styles.textButtonStyle}/>
                </View>
                <FlatList
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.name} 
                    renderItem={({item}) => <PanierItem {...props} uid={uid} params={item} />}
                >
                </FlatList>
                <View style={styles.viewTotal}>
                <TouchableOpacity
                    style={styles.totalButtonArea}
                    onPress={() => confirmerCommande()}>
                        <Text style={styles.buttonTitle}>TOTAL: {total}</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop:'10%',
    },
    viewTotal:{
        flex:0.125,
        paddingVertical:20,
        justifyContent:'flex-end',
        alignContent:'center'
    },
    totalButtonArea:{
        flex:1,
        width:'70%',
        height:'30%',
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