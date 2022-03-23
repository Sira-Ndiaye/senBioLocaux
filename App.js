import React from 'react'
import { StatusBar, View, StyleSheet } from 'react-native'
import Navigation from './Navigation/Navigation'

export default function App (){
    return(
      <View style={style.View}>
        <StatusBar hidden={true}/>
        <Navigation/>
      </View>  
    )
  }
const style=StyleSheet.create({
  View:{
    flex:1
  }
})
