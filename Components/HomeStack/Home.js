import React,{useState,useEffect} from 'react'
import {Text,ActivityIndicator , ScrollView,FlatList,SafeAreaView, TouchableOpacity,TextInput, View, StyleSheet, SectionList} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import {firebase} from '../../src/Firebase/config'

//import {data} from '../Data'
import HomeItem from './HomeItem'
export default function Home ({navigation,user},props) {
    const [text, setText] = useState()
    const [data, setData] = useState()
    const [dataAll, setDataAll] = useState()
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
             setDataAll(data)
             setLoading(false)
           },onError);
         // Unsubscribe from events when no longer in use
         return () => usersRef;
       }, []);

       function onCategoriePress (categorie){
            if (categorie!='All'){
                const usersRef = firebase.firestore();
                usersRef
                    .collection('Data')
                    .where('categorie', '==',categorie)
                    .onSnapshot(querySnapshot => {
                    const data = [];
                    querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    });
                    setData(data);
                    setLoading(false);
                });
            }else
                setData(dataAll)
        }
       


        return(
        <SafeAreaView style={style.mainScroll}>
            <View style={style.mainView}>
                <View style={style.header}>
                    <Text style={style.headerTitle}>SEN'BIO-LOCAUX SHOP!</Text>
                    <TouchableOpacity 
                        style={style.headerOther}
                        onPress={()=> navigation.navigate('Profile')}
                    >
                        <FontAwesome5 name='user-alt' size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={style.searchView}>
                    <TextInput style={style.searchInput} placeholder="Légumes,Épices,Fruits..." onChangeText={(text) => setText(text)} underlineColorAndroid="transparent"
                    />
                    <Ionicons style={style.searchIcon} name="ios-search" size={30} color="#000"/>
                </View>
                <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={style.scrollList}
                >
                    <TouchableOpacity 
                        onPress={() => onCategoriePress('All') } 
                        style={style.scrollListTextArea,{marginLeft:0}}
                    >
                        <Text style={style.scrollListText} >All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => onCategoriePress('Legumes') } 
                        style={style.scrollListTextArea}
                    >
                        <Text style={style.scrollListText} >Légumes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                        onPress={() => onCategoriePress('Epices') }  
                        style={style.scrollListTextArea}
                    >
                        <Text style={style.scrollListText}>Épices</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                        onPress={() => onCategoriePress('Fruit')}
                        style={style.scrollListTextArea}
                    >
                        <Text style={style.scrollListText}>Fruits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => onCategoriePress('Plantes')}  
                        style={style.scrollListTextArea}
                    >
                        <Text style={style.scrollListText} >Plantes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {onCategoriePress('Autres')}} style={style.scrollListTextArea}>
                        <Text style={style.scrollListText} >Autres</Text>
                    </TouchableOpacity>
                </ScrollView>

                <FlatList
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    numColumns={2}
                    contentContainerStyle={style.flatList}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.name} 
                    renderItem={({item}) => <HomeItem params={item} user={user} navigation={navigation}/>}
                >

                </FlatList>
                {onLoading()}
            </View>
        </SafeAreaView>
        )
    }
    


const style=StyleSheet.create({
    mainScroll:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    mainView:{
        flex:1,
        marginTop:20,
        marginHorizontal:20
    },
    header:{
        flexDirection:'row'
    },
    headerTitle:{
        flex:3,
        fontSize:25
    },
    headerOther:{
        justifyContent:"center",
        marginRight:10
    },
    searchView:{
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
    scrollList:{
        paddingTop:0,
        marginBottom:10,
        flexDirection:"row",
        height:20
    },
    scrollListTextArea:{
        marginLeft:30
    },
    scrollListText:{
        color:'grey'
    },
    flatList:{
        width:'100%',
    }
})
