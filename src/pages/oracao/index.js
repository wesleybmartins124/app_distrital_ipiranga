import React , {useState,useEffect} from 'react';
import { StyleSheet, View,  Text, TextInput, Image, SafeAreaView,TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios'; // npm i axios
import  '../../config';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

export default function oracao({navigation}) {

  const [oracao, setOracao] =  useState(''); 
  const [assunto, setAssunto] =  useState('');   

    const[dados, setDados] = useState([]);
    
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

  useEffect(()=>{
      getData();

  },[]
  )

  async function pedir (){
    const nome = dados.nome; 
    const image = dados.image; 
    const igreja_distrito = dados.igreja_distrito;
    const obj = {nome, image, assunto, oracao, igreja_distrito};
      
       const res = await axios.post(api + 'oração.php', obj);
       
        if(res.data.success === true){
          navigation.navigate('Pedido');
          
        }
        if(res.data.success === 'Preencha o pedido de oração!'){
          alert('Ops! Parece que você deixou o campo oração vazio');
      }
      if(res.data.success === 'Preencha o assunto!'){
        alert('Ops! Parece que você não preenchou Orar por...');
    }
    }
    
 return (
     <SafeAreaView style={[styles.container]}>
       <ScrollView>
   <View style={styles.viewSearch}>
   <TextInput style={styles.input2}
       maxLength={30}
       value={assunto}
       onChangeText={ (assunto) => setAssunto(assunto)}
       autoCorrect={false}
       placeholder="Orar por..."></TextInput>
       </View>
   <TextInput style={styles.input}
       multiline={true}
       value={oracao}
       onChangeText={ (oracao) => setOracao(oracao)}
       placeholder="Pedido"></TextInput>
        <TouchableOpacity  onPress={pedir}
 style={styles.touch} >
     <Text  style={styles.text}>PEDIR</Text>
     <Image source={require('../../../assets/img/pray.png')}  style={[styles.icon]} />
 </TouchableOpacity>
       </ScrollView>
   </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
   backgroundColor:'#e1e1e1',
   flex:1 
  },
    input:{
       backgroundColor: "transparent",
       fontSize:20,
       margin:10,
       paddingLeft: 20,
    },
   input2:{
      width: '90%',
      padding: 13,
      paddingLeft: 20,
      fontSize: 17,
      backgroundColor:'#FFF',
      borderRadius: 5,
      color:'#000',
      fontWeight: 'bold'  
    },
    header:{
        backgroundColor:'#50A665',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:9,
        borderBottomWidth:2,
        borderBottomColor:'#FFF'
    },
    touch:{
    backgroundColor:'#EDBC29',
    left:275,
    padding: 10,
    borderRadius: 20,
    flexDirection:"row",
    },
    text:{
    color:'#FFF',
    fontWeight: 'bold'    
    },
    viewSearch:{
      marginTop: 10,
      backgroundColor: '#FFF',
      elevation: 8,
      marginVertical: 10,
      width: '95%',
      flexDirection: 'row',
      alignSelf: 'center',
      borderRadius: 5
    },
    icon:{
      padding:13,
      height:16,
      width:16,
      left:8,
      marginTop:-5
    }
  });
  