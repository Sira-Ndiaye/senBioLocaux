import React,{useState, useEffect} from 'react'
import {Text, FlatList,View,TouchableOpacity, StyleSheet} from 'react-native'

import {firebase} from '../../src/Firebase/config'
import DetailCommande from './DetailCommande'

    
export default function Commande ({navigation,uid},props){
    const [dataPerso,setDataPerso] = useState({})
    const [data, setData] = useState()
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const usersRef = firebase.firestore();
        usersRef
            .collection('users')
            .doc(uid)
            .collection('Informations')
            .doc('Data')
            .get()
            .then(doc => {
                if(!doc.exists){
                    alert('USER DOES NOT EXIST ANYMORE')
                    return;
                }
                setDataPerso(doc.data())
            }) 


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
          });

        // Unsubscribe from events when no longer in use
        return () => usersRef;
      }, []);
    
    return(            
            <View style={styles.mainView}>
                <View style={styles.headerButtonStyle}>
                    <Button text='<' onPress={()=>{navigation.goBack()}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle} />
                        <Text style={styles.headerTitleStyle}>Étape Finale</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.perso}>
                         <View style={styles.persoHeader}>
                             <Text style={styles.persoTextHeader}>Adresse</Text>
                             <TouchableOpacity
                                onPress={() => navigation.navigate('Modifier')}>
                                    <Text style={styles.persoTextHeader}>Modifier</Text>
                            </TouchableOpacity>
                         </View>
                         <Text>{dataPerso.fullName}</Text>
                         <Text>{dataPerso.addr}</Text>
                         <Text>{dataPerso.tel}</Text>
                    </View>
                    <View style={styles.livraison}>
                        <Text style={styles.persoTextHeader}>Details de Livraison</Text>
                        <FlatList
                            contentContainerStyle={styles.flatList}
                            showsVerticalScrollIndicator={false}
                            data={data}
                            keyExtractor={(item) => item.name} 
                            renderItem={({item}) => <DetailCommande params={item} />}
                        ></FlatList>
                    
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontWeight:'bold'}}>Total </Text>
                            <Text style={{fontWeight:'bold'}}>{total}</Text>
                        </View>
                        <View style={{marginTop:200,flex:1}}>
                            <Text>La livraison se fait tous les Mercredis et Samedis pour 500Frs</Text>
                            <Text>Pour une livraison express,Veuillez nous contacter SVP!</Text>
                        </View>
                    </View>
                    

                </View>
                <View style={styles.viewChoix}>
                        <TouchableOpacity
                        style={styles.totalButtonArea}
                        onPress={() => alert('Votre Commande a été prise en compte.')}>
                            <Text style={styles.buttonTitle}>Confirmer</Text>
                        </TouchableOpacity>
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
    body:{
        flex:1,
        marginTop:20,
        marginHorizontal:10
    },
    persoHeader:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    persoTextHeader:{
        fontSize:17,
        fontWeight:'bold',
    },
    livraison:{
        marginTop:20,
    },
    flatList:{

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
    viewChoix:{
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