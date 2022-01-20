
import React from 'react';
import { StyleSheet, Text, View, Button, Animated,Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function PuxarEsquerda(progress, eixoX){
    const scale = eixoX.interpolate({
        inputRange:[0, 100],
        outputRange:[0,1],
        extrapolate: 'clamp'
    })
    return(
        <View style={styles.deletar}>
            <Animated.Text style={[styles.textoList, {transform:[{scale}]}]}>Já oramos!</Animated.Text>
        </View>
        
    )
}



export default function ListItem({data, deletar}) {
  return (
    <Swipeable
        renderLeftActions={PuxarEsquerda}
        onSwipeableLeftOpen={deletar}
    
    >
   
  <View style={[styles.container]}>
      <View style={[styles.header]}>
  <Image
                source={{uri: data.image ? data.image : null}}
                style={[styles.imagenphoto]}
                />
                 <Text style ={[styles.texto2]}>{data.nome}- {data.igreja_distrito}  </Text> 
                </View>
<Text style ={[styles.texto2]}>{data.assunto} </Text>
 <Text style ={[styles.texto]}>{data.oracao} </Text> 
 </View>

    </Swipeable>
  );
}


const styles = StyleSheet.create({
    header:{
    flexDirection:'row',
    },
    
    container:{
        backgroundColor:'#FFF',
        paddingHorizontal:10,
        paddingVertical:20,

    },

    texto:{
        color:'#000',
        fontSize:20,
       
    },
    texto2:{
        color:'#222',
        fontSize:19,
        fontWeight:'bold',
        marginTop:10
       
    },
    deletar:{
        backgroundColor:'#EDBC29',
        justifyContent:'center',
        flex:1,

       
    },
    imagenphoto:{
        width: 60,
        height: 60,
        borderRadius: 40,
        marginRight: 6
    },
    editar:{
        backgroundColor:'#1f8cb6',
        justifyContent:'center',
        flex:1
        
       
    },
    textoList:{
        color:'#FFF',
        fontSize:19,
        padding:20
    },
    Hora:{
        flexDirection:'row',
        padding:-50,
        marginRight:25,
    },
    icon:{
        padding:13,
        height:16,
        width:16,
        left:8,
        marginTop:-5
      }
});
