import React,{useEffect,useState} from 'react';
import {View,StyleSheet} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs' 
import { createStackNavigator } from '@react-navigation/stack';


import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Home from '../Components/HomeStack/Home'
import Panier from '../Components/PanierStack/Panier'
import LogIn from '../Components/ProfileStack/LogIn'
import SignUp from '../Components/ProfileStack/SignUp'
import Item from '../Components/HomeStack/Item'
import UI from '../Components/ProfileStack/UI';
import HomeAdmin from '../Components/HomeAdminStack/HomeAdmin'
import AjouterProduit from '../Components/HomeAdminStack/AjouterProduit';
import Alert from '../Components/HomeAdminStack/Alert'
import VoirProduit from '../Components/HomeAdminStack/VoirProduit'
import ProduitItem from '../Components/HomeAdminStack/ProduitItem'
import ProduitOptions from '../Components/HomeAdminStack/ProduitOptions'




import {firebase} from '../src/Firebase/config'
import Modifier from '../Components/ProfileStack/Modifier';
import Commande from '../Components/PanierStack/Commande';
import DetailCommande from '../Components/PanierStack/DetailCommande';
import ModifierProduit from '../Components/HomeAdminStack/ModifierProduit';



const Tab=createBottomTabNavigator();
export default function Navigation (){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [data, setData] = useState({})
  

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    }
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if(user){
    const usersRef = firebase.firestore();
        usersRef
            .collection('users')
            .doc(user.uid)
            .collection('Informations')
            .doc('Data')
            .get()
            .then(doc => {
                if(!doc.exists){
                    alert('USER DOES NOT EXIST ANYMORE')
                    return;
                }
                setData(doc.data())
            }) 
  }

    return(
      <View style={style.view}>
        <NavigationContainer>
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Home') { 
                    return(
                        <MaterialCommunityIcons 
                          name= { focused ? 'home' : 'home-outline'} 
                          size= { focused ? 35 : 20} 
                          color={ focused ? '#FF5018' : color}
                        /> )
              } else if (route.name === 'Panier') {
                return(
                    <MaterialCommunityIcons 
                      name= { focused ? 'cart' : 'cart-outline'} 
                      size= { focused ? 35 : 20} 
                      color={ focused ? '#FF5018' : color}
                  /> )
              }else if (route.name==='Profile'){
                return(
                    <FontAwesome5 
                      name= { focused ? 'user-alt' : 'user'} 
                      size= { focused ? 35 : 20} 
                      color={ focused ? '#FF5018' : color}
                  /> )
              }else if (route.name==='Alert'){
                return(
                    <MaterialCommunityIcons 
                      name= { focused ? 'alert-circle' : 'alert-circle-outline'} 
                      size= { focused ? 35 : 20} 
                      color={ focused ? '#FF5018' : color}
                  /> )
              }
            },
          })}
         tabBarOptions={tabBar.tabbar}
        >
          {(function() {
            if(user){
              switch(data.email) {
                case 'admin@gmail.com':
                  return (
                    <>
                    <Tab.Screen name="Home">
                      {props => <HomeAdminStack {...props} extraData={user} />}
                    </Tab.Screen>
                    <Tab.Screen name="Alert" component={Alert}/>
                    <Tab.Screen name="Profile">
                        {props => <UIStack {...props} extraData={user} />}
                      </Tab.Screen>
                    </>
                  )
                default:
                  return (
                    <>
                    <Tab.Screen name="Home">
                      {props => <HomeStack {...props} extraData={user} />}
                    </Tab.Screen>
                    <Tab.Screen name="Panier" >
                      {props => <PanierStack {...props} uid={user.uid} extraData={user}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Profile">
                      {props => <UIStack {...props} extraData={user} />}
                    </Tab.Screen>
                    </>
                  )
              }
            }
            else
              return <Tab.Screen name="Profile" component={ProfileStack}/>
        })()}
        </Tab.Navigator>
        </NavigationContainer>
      </View>
    )
    
}
const Stack = createStackNavigator();

function HomeStack(props) {
  const user=props.extraData
  return (
      <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="Home">
          {props => <Home {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Item">
          {props => <Item {...props} user={user}/>}
        </Stack.Screen>
      </Stack.Navigator>
  );
}


function ProfileStack() {
  return (
      <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp}/>

      </Stack.Navigator>
  );
}

function PanierStack(props) {
  const user=props.extraData
  const uid=props.uid
  return (
      <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="Panier">
          {props => <Panier {...props} uid={uid} />}
        </Stack.Screen>
        <Stack.Screen name="Commande">
          {props => <Commande {...props} uid={uid} />}
        </Stack.Screen>
        <Stack.Screen name="Modifier">
          {props => <Modifier {...props} user={user}/>}
        </Stack.Screen>
        <Stack.Screen name="DetailCommande">
          {props => <DetailCommande {...props} uid={uid}/>}
        </Stack.Screen>
      </Stack.Navigator>
  );
}


function UIStack(props) {
  const user=props.extraData
  return (
      <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="UI">
          {props => <UI {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Modifier">
          {props => <Modifier {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
  );
}


function HomeAdminStack(props) {
  const user=props.extraData
  return (
      <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="HomeAdmin">
          {props => <HomeAdmin {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="AjouterProduit">
          {props => <AjouterProduit {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="VoirProduit">
          {props => <VoirProduit {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="ProduitItem">
          {props => <ProduitItem {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="ProduitOptions">
          {props => <ProduitOptions {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="ModifierProduit">
          {props => <ModifierProduit {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
  );
}

const iconFocusSize=20
const style=StyleSheet.create({
  view:{
    flex:1
  }
})
const tabBar={
  tabbar:{
    activeTintColor: '#000',
    inactiveTintColor: '#000',
    showLabel:true,
    showIcon:true,
    style:{
      backgroundColor:'#FFFFFF',
      height:80,
      borderTopColor:'#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth:1,
      paddingBottom:15
    }
  }
}

