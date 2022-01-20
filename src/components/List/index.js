
import React from 'react';
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity, Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Autolink from 'react-native-autolink';

function PuxarEsquerda(progress, eixoX){
    const scale = eixoX.interpolate({
        inputRange:[0, 100],
        outputRange:[0,1],
        extrapolate: 'clamp'
    })
    return(
        <View style={styles.deletar}>
            <Animated.Text style={[styles.textoList, {transform:[{scale}]}]}>Deletar</Animated.Text>
        </View>
    )
}



export default function ListItem({data, deletar}) {
  return (
    <Swipeable
        renderLeftActions={PuxarEsquerda}
        onSwipeableLeftOpen={deletar}
    
    >
   
  <View style={[styles.container, styles.header]}>
    <Ionicons name="square" color="#50A665" size={25} />
 <Text style ={[styles.texto]}> {data.titulo_programacao} </Text> 
  </View>
  <View style={[styles.container]}>
  <Text style={[styles.texto, styles.header]}>Descrição: </Text>
  <Autolink style={[styles.texto2]} text={data.descricao_programacao} url={true} /> 
  <Text style= {[styles.texto]}>
  <Ionicons name="location-outline" color="#50A665" size={23} /> 
  <Text style={styles.texto2}>Local: {data.local}</Text>
  </Text>
  </View>
  <View style={[styles.container, styles.header]}>
  <Ionicons  name="calendar-outline" color="#50A665" size={25} /> 
  <Text style ={[styles.texto2]}> DATA :  {data.data} </Text> 
  <View style={[styles.container, styles.header]}>
  </View>
<Text>
  <Ionicons name="time-outline" color="#50A665" size={25} /> 
  <Text style={styles.texto2}> HORA:  {data.hora}</Text>
  </Text>
  </View>
  <View style={[styles.container]}>
  <View style={[styles.header]}>
  <Image
                source={{uri: data.image ? data.image : null}}
                style={[styles.imagenphoto]}
                />
                  <Text style={[styles.texto2, styles.header]}>
                {data.nome} - {data.igreja_distrito}</Text>
                </View>
               
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
        fontSize:17,
       
    },
    deletar:{
        backgroundColor:'#d62525',
        justifyContent:'center',
        flex:1
       
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
    imagenphoto:{
        width: 45,
        height: 45,
        borderRadius: 80,
        marginRight: 6
    }
});

