import React,{useState,useEffect} from 'react'
import {Text, View,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {firebase} from '../../src/Firebase/config'


export default function AjouterProduit (){
    const [name, setName] = useState('')
    const [categorie,setCategorie] = useState('')
    const [amount,setAmount] = useState()
    const [description,setDescription] = useState('')
    const [imageSource,setImageSource] = useState('')
    const [price,setPrice] = useState()
    const [count,setCount] = useState(0)


    function onAddPress(){
        if (name.length==0 || categorie.length==0 || amount.length==0 || price.length==0 ) {
            alert("VERIFIER SI TOUS LES CHAMPS SONT BIEN REMPLIS")
            return
        }
        const data ={
            name,
            categorie,
            amount,
            description,
            imageSource,
            price,
            count,
        }
        const usersRef = firebase.firestore();
            usersRef
            .collection('Data')
            .doc(name)
            .set(data)
            .then(alert('Produit Ajouté avec succes!'))
    }


    return(
        <View style={styles.mainView}>
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={{justifyContent:'flex-start',alignContent:'center'}}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                <TextInput
                    style={styles.input}
                    placeholder='Nom Produit'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Categorie'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCategorie(text)}
                    value={categorie}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Adresse Image'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setImageSource(text)}
                    value={imageSource}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Quantité Stock'
                    placeholderTextColor="#aaaaaa"
                    keyboardType="numeric"
                    onChangeText={(text) => setAmount(Number(text))}
                    value={amount}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Description'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prix d'un Kilo"
                    placeholderTextColor="#aaaaaa"
                    keyboardType="numeric"
                    onChangeText={(text) => setPrice(Number(text))}
                    value={price}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                


                <TouchableOpacity
                    style={styles.loginButtonArea}
                    onPress={() => onAddPress()}>
                    <Text style={styles.buttonTitle}>AJOUTER</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}


const styles=StyleSheet.create({
    mainView: {
        flex: 1,
        paddingVertical:'10%',
        paddingHorizontal:'5%',
        backgroundColor:'#FFFFFF'
    },
    scrollView:{
        backgroundColor:'#F8F8F8',
        flex:1,
        borderRadius:50,
        marginVertical:'10%',
        paddingVertical:10,
        paddingHorizontal:5,
        marginHorizontal:5
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#c5c9cc79',
        color:'black',
        margin:10,
        paddingLeft: 16
    },
    loginButtonArea:{
        marginVertical:20,
        width:'40%',
        height:'8%',
        justifyContent:"center",
        alignSelf:"center",
        backgroundColor:'#FF5018',
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6},
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    buttonTitle:{
      fontSize:20,
      fontWeight:'bold',
      color:'white',
      textAlign:'center'
    },
})