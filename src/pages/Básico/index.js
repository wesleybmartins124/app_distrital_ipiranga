import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useWindowSize} from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView, TextInput, Image, Animated,Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity,FlatList,PanGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import ListItem from '../../components/List/post';
import axios from 'axios'; // npm i axios
import  '../../config';
import FabButtonbas from  '../../../src/components/FabButtonbas';

export default function Básico({navigation}) {

  const [image, setImage] = useState(null);
  const[dados, setDados] = useState([]);
  const [lista, setLista] = useState([]);
  const [valor, setValor] = useState('1');
  const [buscar, setBuscar] = useState('');
 




async function listarPost(){
  const res = await axios.get(api + 'postagem.php?busca=' + buscar);
  if(res.data.result != '0'){
      setLista(res.data.result);
  }else{
      alert('Ops! Nenhum membro foi encontrado.')
  }
  setValor('2'); 
} 




const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      setDados(JSON.parse(value));
    }
  } catch(e) {
    // error reading value
  }
}
setTimeout(function() {
      
  if(valor === '1'){
   listarPost();
  }
}, 50);
function buscarPost(){
  pesquisaFiltro();
}

async function pesquisaFiltro(){
    
  const res = await axios.get(api + 'postagem.php?busca=' + buscar);
 
  setLista(res.data.result);

  
} 
useEffect(()=>{
    getData();
    listarPost();
},[]
)


const deslogar = () => {
navigation.reset({
  index:0,
  routes:[{name:'Login'}]
})
}

  

  function editar(id){
         
    navigation.navigate('editarPerfil', {id: dados.id});
    
  }
  
    return (
      <SafeAreaView>
      <View>
     </View>
      <ScrollView>
   <View 
   style={styles.header}>
     
     <TouchableOpacity
    
             onPress= {()=> editar(dados.id)}
            
         
       
         
     >

    
    <Image 
source={{uri: dados.image}}
style={[styles.imagenphoto]}
   
    />
     </TouchableOpacity>
   <Text style={{color:'#FFF', fontSize:17}}>Olá {dados.username}</Text>
   <TouchableOpacity
   onPress={() =>deslogar()}
   >
       
       <Ionicons name="ios-exit-outline" size={25} color="#FFF"></Ionicons>
    </TouchableOpacity>
    
   </View>
   
   <View style={styles.viewSearch}>
           <TextInput
             style={styles.input}
             placeholder="Pesquisar publicação..."
             value={buscar}
             onChangeText={ (buscar) => setBuscar(buscar)}
             onChange={buscarPost()}
            />
                <TouchableOpacity style={styles.icon}>
             <Ionicons name="search" color="#000" size={25} />
           </TouchableOpacity>
   </View>
   <FlatList
         data={lista}
         keyExtractor={item => item.id}
         renderItem={({item}) => (
         <ListItem
             data={item}
         />
         )}
         ItemSeparatorComponent={()=><Separator/>}
         
     >
       
   
     </FlatList>
     </ScrollView>
        <FabButtonbas style={{bottom: 100, right:55}}  NewPost={() => navigation.navigate('NewPost')}  oracao={() => navigation.navigate('oracao')}/>
  
  
        </SafeAreaView>
      );
    }
  
    const styles = StyleSheet.create({
      header:{
          backgroundColor:'#50A665',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          padding:9,
          borderBottomWidth:2,
          borderBottomColor:'#FFF'
      },
      input:{
        width: '90%',
        padding: 13,
        paddingLeft: 20,
        fontSize: 17,
      },
      icon:{
      
        right: 0,
        top: 15,
      },    
      viewSearch:{
        marginTop: 10,
        backgroundColor: '#FFF',
        elevation: 8,
        borderRadius: 25,
        marginVertical: 10,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center'
      },
      modal:{
        flex: 1,
        backgroundColor:'#b2b2b2'
        
      },
    
      textoModal:{
        
        color: '#FFF',
        
        marginLeft: 15,
        fontSize:25,
        
        
      },
      textoDadosCliente:{
          
        fontSize:16,
        marginRight:10,
    },
    
      modalHeader:{
        
       marginLeft:10,
       marginTop:20,
       alignItems:'center',
       flexDirection:'row',
       marginBottom:30,
        
      },
    
    
      input2:{
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 8,
        padding: 8,
        color: '#000',
        fontSize:13
      },
      botaoModal:{
        backgroundColor: '#00335c',
        borderRadius: 5,
        margin: 5,
        padding: 12,
        color: '#FFF',
        alignItems:'center',
        justifyContent:'center',
        
      },
      textoBotaoModal:{
        fontSize:16,
        color:'#FFF',
    
      },
      imagenphoto:{
        width: 38,
        height: 38,
        borderRadius: 40,
        marginRight: 6
    }
      
    });
  
    const Separator = () => <View style={{flex:1, backgroundColor:'#50A665'}}></View>
    