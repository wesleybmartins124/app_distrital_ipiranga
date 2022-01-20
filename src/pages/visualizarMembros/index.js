import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useRef} from 'react';
import {Modal, StyleSheet, Button, TextInput , Text, View, SafeAreaView, Alert, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../../components/List/membros';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios'; // npm i axios
import * as Animatable from 'react-native-animatable';
import  '../../config';

export default function visualizarMembros({navigation}) {


  const [valor, setValor] = useState('1');
  const [lista, setLista] = useState([]);
  const [buscar, setBuscar] = useState('');

    const [dados, setDados] = useState([]);
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



  async function listarDados(){
    const res = await axios.get(api + 'listarMembros.php?busca=' + buscar);
    if(res.data.result != '0'){
        setLista(res.data.result);
    }else{
        alert('Ops! Nenhum membro foi encontrado.')
    }
    setValor('2'); 
  } 

  setTimeout(function() {
        
    if(valor === '1'){
     listarDados();
    }
  }, 50);



  

    function buscarDados(){
      buscarNome();
    }

    async function buscarNome(){
        
      const res = await axios.get(api + 'listarMembros.php?busca=' + buscar);
     
      setLista(res.data.result);
    
      
    } 
  useEffect(()=>{
      getData();
      listarDados();
  },[]
  )

function mensagemDelete(id){
    if (dados.nivel === 'máximo'){
    Alert.alert(
      "Excluir Registro",
      "Deseja EXCLUIR este Registro?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deletar(id) }
      ],
      { cancelable: true }
    );

  }else{
  alert('Ops! Você não tem permissão para fazer isso.')
}


async function deletar(id){
         
  const res = await axios.get(api + 'excluirMembros.php?id=' + id);
  listarDados();
}

}
function editar(id){
         
  navigation.navigate('editarMembros', {id: id});
  
}
    return (
      <ScrollView>
      <SafeAreaView>
      <View style={styles.viewSearch}>
              <TextInput
                style={styles.input}
                placeholder="Pesquisar..."
                value={buscar}
                onChangeText={ (buscar) => setBuscar(buscar)}
                onChange={buscarDados()}
               />


              <TouchableOpacity style={styles.icon}>
                <Ionicons name="search" color="#000" size={25} />
              </TouchableOpacity>
            </View>
      <View>
      <FlatList
            data={lista}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
            <ListItem
                data={item}
                deletar = {()=> mensagemDelete(item.id)}
                editar = {()=> editar(item.id)}
            />
            )}
            ItemSeparatorComponent={()=><Separator/>}
            
        >

        </FlatList>
          </View>
        
            </SafeAreaView>
            </ScrollView>
    
    
    
          );
        }
  
  
  const styles = StyleSheet.create({
    header:{
        backgroundColor:'#50A665',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        borderBottomColor:'#FFF'
    },
    buscarData:{
      backgroundColor:'#e1e1e1',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      padding:5,

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
  input1:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize:13
  }
   
  });
  
  const Separator = () => <View style={{flex:1, backgroundColor:'#50A665'}}></View>

    