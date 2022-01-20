
import React , {useState,useRef} from 'react';
import { StyleSheet, Text, View, Modal, Image, Animated,Alert,Pressable,SafeAreaView, } from 'react-native';
import Autolink from 'react-native-autolink';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Ionicons} from '@expo/vector-icons';



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
    const[modalVisible, setModalVisible] = useState(false);
  return (
    <Swipeable
        renderLeftActions={PuxarEsquerda}
        onSwipeableLeftOpen={deletar}
    
    >
 
  <SafeAreaView style={[styles.container, styles.viewSearch]}> 
                
 <View    style={styles.header}>
                <Image
                source={{uri: data.image ? data.image : null}}
                style={[styles.imagenphoto]}
                />
               <Text style={[styles.texto2]}> {data.nome} - {data.igreja_distrito} </Text>
               </View>
               <Autolink style={[styles.texto]} text={data.post} url={true} /> 
               <TouchableOpacity onPress={() => {setModalVisible(true)}}>
               <Text style={styles.textcont}>
                    <Ionicons name="eye" color="#50A665" size={20} ></Ionicons> Ver se há conteúdo em anexo.
                    </Text>
                </TouchableOpacity>
   </SafeAreaView>
   <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
            <Ionicons name="close-outline" color="#FFF" size={30} ></Ionicons>
            </Pressable>
          <Image
                source={{uri: data.image ? data.image : null}}
                style={[styles.imagenphoto]}
                />
            <Text style={[styles.texto2]}> {data.nome} - {data.igreja_distrito} </Text>
            <Autolink style={styles.modalText} text={data.post} url={true}/>
            <Image
                source={{uri: data.postImage ? data.postImage : null}}
                style={[styles.imagenpost]}
                />
          </View>
        </View>
      </Modal>
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
        fontSize:15,
        marginBottom:10,
        marginTop:11,
       
    },
    texto2:{
        color:'#222',
        fontSize:19,
        fontWeight: 'bold',
        flexDirection:'row',
       
    },
    texto3:{
        paddingHorizontal:10,
        paddingVertical:20,
        color:'#000',
        fontSize:20,
        alignContent:'center'
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
    textoList2:{
        color:'#FFF',
        fontSize:19,
        paddingLeft:320,
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
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 6
},
imagenpost:{
    width: 290,
    height: 295,
    marginRight: 10,
    marginTop:-10,
    opacity: 0.9,
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
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop:0,
    elevation: 5,
    marginRight:-255

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#004F5B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textcont:{
    color: "#0089a5",
    fontSize: 14,
  }
 
});

