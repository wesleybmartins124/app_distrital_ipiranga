
import React from 'react';
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity,Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Clipboard from 'expo-clipboard';

const copyToClipboard = () => {
    Clipboard.setString('');
  };

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

function PuxarDireita({progress, eixoX, onPress}){
    const scale = eixoX.interpolate({
        inputRange:[-100, 0],
        outputRange:[1,0],
        extrapolate: 'clamp'
    })
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={styles.editar}>
            <Animated.Text style={[styles.textoList, {transform:[{scale}]}]}>Editar</Animated.Text>
        </View>
        </TouchableOpacity>
    )
}




export default function ListItem({data, deletar, editar}) {
    return (
      <Swipeable
          renderLeftActions={PuxarEsquerda}
          onSwipeableLeftOpen={deletar}
          renderRightActions={(progress, eixoX) => <PuxarDireita progress={progress} eixoX={eixoX} onPress={editar} />}
      >
   
  <View style={[styles.container, styles.viewSearch]}> 

  <Image
                source={{uri: data.image ? data.image : null}}
                style={[styles.imagenphoto]}
                />
               <Text style={[styles.texto]}>{data.nome_completo} - {data.idade} anos</Text>
               <View style={[styles.margin]}>
               <Ionicons name="home" color="#50A665" size={20} ><Text> Residência:</Text> </Ionicons>
               <Text style={styles.texto2}>{data.endereco},N°:{data.nro},{data.bairro}  -  {data.cidade}.</Text>
               </View>
               <View style={[styles.margin]}>
               <Ionicons name="call" color="#50A665" size={20}><Text> Telefone:</Text> </Ionicons> 
               <Text style={styles.texto2} onPress={copyToClipboard}>{data.tel}</Text>
               </View>
               <View style={[styles.margin]}>
               <Ionicons name="book" color="#50A665" size={20} ><Text> Material:</Text> </Ionicons>
               <Text style={[styles.texto2]}>{data.material}</Text>
               </View>
               <View style={[styles.margin]}>
               <Ionicons name="information-circle" color="#50A665" size={20} ><Text> Informações:</Text> </Ionicons>
               <Text style={styles.texto3}>{data.descricao}</Text>
               </View>
         
         
               
 


   </View>
  
 

    </Swipeable>
  );
}


const styles = StyleSheet.create({
    header:{
    flexDirection:'row',
    marginHorizontal:10,
    marginTop:20
    },
    
    container:{
        backgroundColor:'#FFF',
        paddingHorizontal:10,
        paddingVertical:20,

    },

    texto:{
        color:'#000',
        fontSize:20,
        marginHorizontal:15
        
       
    },
    texto2:{
        color:'#222',
        fontSize:17,
        marginBottom:8
       
    },
    texto3:{
        color:'#222',
        fontSize:18,
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
    Hora:{
        flexDirection:'row',
        padding:-50,
        marginRight:25,
    },  input:{
        width: '90%',
        padding: 13,
        paddingLeft: 20,
        fontSize: 17,
      },
   viewSearch:{
        marginTop: 10,
        backgroundColor: '#FFF',
        elevation: 8,
        borderRadius: 5,
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center'
      },
      gridbotaoEditar:{
        position: 'absolute',
        right:40,
        color:'#000',
      },
      imagenphoto:{
        width: 150,
        height: 150,
        borderRadius: 80,
        left:8,
        marginHorizontal:10,
    },
    textoList:{
        color:'#FFF',
        fontSize:19,
        padding:20
    },
    textoList2:{
        color:'#FFF',
        fontSize:19,
        paddingLeft:320,
    },
    margin:{
        marginLeft: 13
    }
});

