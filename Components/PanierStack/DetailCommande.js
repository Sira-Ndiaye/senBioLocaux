import React from 'react'
import {Text, View} from 'react-native'


export default function DetailCommande ({params},props) {
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>{params.count}x {params.name} </Text>
            <Text style={{fontWeight:'bold'}}>{params.count * params.price}</Text>
        </View>
        
    )
}
