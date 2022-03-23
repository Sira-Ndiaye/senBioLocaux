import React,{useState, useEffect} from 'react'
import {Text, Image,View, StyleSheet,TouchableOpacity, Modal} from 'react-native'
import {firebase} from '../../src/Firebase/config'

export default function PanierItem ({params,uid},props){
    const [modalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(params.count);
        const onPress = (op) => {
            setCount(op==='plus' ? count + 1 : count - 1)
        }
        const usersRef = firebase.firestore()
                usersRef
                    .collection('users')
                    .doc(uid)
                    .collection('PanierItem')
                    .doc(params.name)
                    .update({
                        count:count
                })
    
        const deleteProduit = () => {
            usersRef
                .collection('users')
                .doc(uid)
                .collection('PanierItem')
                .doc(params.name)
                .delete()
                .then(() => {
                    setModalVisible(!modalVisible);
                });
        }
        return(
            <View style={{flex:1}}>
                <TouchableOpacity 
                    style={styles.mainView}
                    onPress={()=>{setModalVisible(true)}}
                >
                    <View style={styles.imageContainerView}>
                        <Image
                                style={styles.imageContainer}
                                source={{uri:params.imageSource}} 
                            
                            />
                    </View>      
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{params.name}</Text>
                        <Text style={styles.categorie}>{params.categorie}</Text>
                        <Text style={styles.price}>{params.price * count} <Text style={{color:'#FF5018',fontSize:15,fontWeight:'normal'}}>Frs</Text></Text>
                    </View>
                    <View style={styles.amountChoice}>
                            <Button text='-' onPress={()=>{onPress('moins')}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle}/>
                                <Text style={styles.amount}>{count >= 1 && count<=params.amount? count : count>=params.amount? setCount(params.amount):setCount(1)} Kg</Text>
                            <Button text='+' onPress={()=>{onPress('plus')}} styleB={styles.buttonStyle} styleT={styles.textButtonStyle}/>
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Button text='Annuler' onPress={()=>setModalVisible(!modalVisible)} styleB={{ ...styles.openButton, backgroundColor: "#FF5018" }} styleT={styles.textStyle}/>
                        <Button text='Supprimer' onPress={()=>deleteProduit()} styleB={{ ...styles.openButton, backgroundColor: "#FF5018" }} styleT={styles.textStyle}/>
                    </View>
                    </View>
                </Modal>
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
        flexDirection:'row',
        width:'100%',
        height:100,
        backgroundColor:'#F8F8F8',
        marginTop:20,
    },
    imageContainerView:{
        flex:2,
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
        flex:3,
        paddingTop:2,
        paddingHorizontal:15,
        justifyContent:'space-between'
    },
    categorie:{
        fontSize:13,
        color:'gray'
    },
    name:{
        fontSize:18,
        fontWeight:"bold",
        color:'#000000'
    },
    amountChoice:{
        flex:1,
        justifyContent:'space-between'
    },
    price:{
        fontSize:20,
        color:'#000000',
    },
    amount:{
        paddingVertical:'15%',
        fontWeight:'bold'
        
    },
    buttonStyle:{
        height:30,
        width:30,
        borderRadius:7,
        backgroundColor:'#FFFFFF',
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
        color:'#FF5018'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#FF5018",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin:5,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})