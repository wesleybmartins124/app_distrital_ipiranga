import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Animated, Alert,Image, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import  '../../config';

import {Picker} from '@react-native-picker/picker';



export default function editarPerfil({navigation,route}){

  const zip= axios.create({
    baseURL: 'https://viacep.com.br/ws'});


    const [valor, setValor] = useState('1');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);

    const [image, setImage] =  useState(''); 
    const [nome, setNome] =  useState(''); 
    const [sobrenome, setSobrenome] =  useState(''); 
    const [idade, setIdade] =  useState(''); 
    const [username, setUsername] =  useState(''); 
    const [email, setEmail] =  useState(''); 
    const [senha, setSenha] =  useState('');    
    const [cep_usuario, setCep_usuario] = useState('');
    const [endereco_usuario, setEndereco_usuario] = useState('');
    const [bairro_usuario, setBairro_usuario] = useState('');
    const [cidade_usuario, setCidade_usuario] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [nro_residencial_usuario, setNro_residencial_usuario] =  useState(''); 
    const [rg_usuario, setRg_usuario] =  useState(''); 
    const [nro_celular_usuario, setNro_celular_usuario] =  useState(''); 
    const [igreja_distrito, setIgreja_distrito] = useState('');
    const [nivel, setNivel] = useState('');

    const [id, setId] = useState('');

    const[hidePass, SetHidePass]  = useState(true);

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
      async function buscar(){
        if(cep_usuario == ''){
          alert('Digite um cep valido');
          setCep_usuario('');
          return; //
        } 
    
        try{
          const response = await zip.get(`/${cep_usuario}/json`);
          console.log(response.data);
          setCepUser(response.data);
          Keyboard.dismiss(); //Garantir que o teclado sera fechado!
    
        }catch(error){
          console.log('ERROR: ' + error);
        }
    
    
      }
    
      useEffect(()=> {
        getData();
        setId(route.params?.id);
        recuperarDados(route.params?.id);
      },[])

      setTimeout(function() {
        
        if(valor === '1'){
          
          setId(route.params?.id);
          recuperarDados(id)
        }
      }, 50);
  
      async function recuperarDados(id){
       
        const res = await axios.get(api + 'buscarId.php?busca=' + id);
        //alert(res.data)
        if(res.data.result != '0'){
            
            setImage(res.data.result.image);
            setNome(res.data.result.nome);
            setSobrenome(res.data.result.sobrenome);
            setIdade(res.data.result.idade);
            setUsername(res.data.result.username);
            setEmail(res.data.result.email);
            setCep_usuario(res.data.result.cep_usuario);
            setEndereco_usuario(res.data.result.endereco_usuario);
            setBairro_usuario(res.data.result.bairro_usuario);
            setCidade_usuario(res.data.result.cidade_usuario);
            setLat(res.data.result.lat);
            setLon(res.data.result.lon);
            setNro_residencial_usuario(res.data.result.nro_residencial_usuario);
            setRg_usuario(res.data.result.rg_usuario);
            setNro_celular_usuario(res.data.result.nro_celular_usuario);
            setIgreja_distrito(res.data.result.igreja_distrito);
            setNivel(res.data.result.nivel);
  
            setValor('2');
        }
    }

    const mensagemInserir = () =>
    Alert.alert(
      "INFO:",
      "a sua senha foi redefinida com sucesso!",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );
    const mensagemProblema = () =>
    Alert.alert(
      "INFO:",
      "Por favor valide o seu CEP para a confirmação",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );
  
    async function add(){
    
       
      const obj = {image,nome, sobrenome, idade, username, email,  senha, cep_usuario, endereco_usuario, bairro_usuario, cidade_usuario,lat,lon,nro_residencial_usuario, rg_usuario, nro_celular_usuario, igreja_distrito, nivel, id};
  
      
       const res = await axios.post(api + 'redefinir.php', obj);
       
        if(res.data.success === true){
            //mensagemSalvar();
            mensagemInserir();
            setId('');
            setValor('1');
            navigation.navigate('Login');
        

          
          
        } if(res.data.success === 'Dado já Cadastrado!'){
          mensagemDuplicidade();
          navigation.navigate('Login');
          
        }
        
        if(res.data.success === 'Preencha todos os campos!'){
          Alert.alert(
            "Atenção",
            "O campo senha não pode ser vazio.",
            [
              
              { text: "OK" }
            ],
            { cancelable: true }
          );
         
          
        }



 
  }
      
    return (
      <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.modal1} >


      <ScrollView>
           
      <Animatable.View  
          animation="bounceInUp"
        useNativeDriver="true"  >
          
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius:40 / 2 }}>
          <Image 
 source={{uri: image}}
 style={[styles.avatar]}
 onValueChange={ (image) => setImage(image) }
       />
       </View>

     <View style={styles.viewSearch2}>
     <TextInput
        placeholder="Senha"
        secureTextEntry={hidePass}
        dataCorrect={false}
        value={senha}
        onChangeText={(senha)=> setSenha(senha)}
        />
        <TouchableOpacity style={styles.icon} onPress={()=> SetHidePass(!hidePass)}>
          {hidePass ?
          <Ionicons name="eye" color="#50A665" size={25}/>
          :
          <Ionicons name="eye-off" color="#50A665" size={25}/>
          }
        </TouchableOpacity>
        </View>
   

          
               <TouchableOpacity  
      style={styles.botaoModal}
      onPress={add}
      >
        <Text  style={styles.textoBotaoModal}>Editar</Text>
      </TouchableOpacity>
         
      </Animatable.View>
         
          </ScrollView>  
      
      
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
      modal:{
          flex: 1,
          backgroundColor:'#e9ecea',
          marginTop:15,
        },
      
        textoModal:{
          
          color: '#FFF',
          
          marginLeft: 15,
          fontSize:16,
          
          
        },
      
          
      
        input:{
          backgroundColor: '#FFF',
          borderRadius: 5,
          margin: 8,
          padding: 8,
          color: '#000',
          fontSize:13
        },
        botaoModal:{
          backgroundColor: '#004F5B',
          borderRadius: 205,
          margin: 25,
          padding: 12,
          color: '#FFF',
          alignItems:'center',
          justifyContent:'center',
          
        },
        textoBotaoModal:{
          fontSize:16,
          color:'#FFF',
      
        },
        areaData:{
            flexDirection:'row',
            padding:15,
            marginRight:10,
        },
  
        areaHora:{
          flexDirection:'row',
          padding:15,
          marginRight:10,
      },
      datas:{
          flexDirection:'row',
          justifyContent:'center',
      },
      container: {
        height: 5, 
        position: 'relative',
      },
      labelContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: -20,
        left: -12,
        padding: 18,
        zIndex: 50,
        color:'#000',
        fontWeight: 'bold',
        fontSize:16,
        
      },
      labelContainer2: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: -20,
        left: -2,
        padding: 3,
        zIndex: 50,
        color:'#000',
        borderColor:"#FFF",
        borderWidth:2, 
        borderStyle:'dashed',
        borderRadius:10,
        fontWeight: 'bold',
        fontSize:11,
        marginLeft:4,
        marginTop:20
        
      },
      avatar:{
        width: 280,
        height: 280,
        borderRadius:170,
        opacity: 0.9,
        marginTop:10,
      },
      modal1:{
        flex: 1,
        width: null,
        height: null,
        opacity: 1,
        justifyContent: "flex-start",
      },
      icon:{
    
        right: -15,
        top: 2,
      },
      viewSearch:{

        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
        width:400,
        marginTop:48,
      },
      viewSearch2:{

        backgroundColor: '#FFF',
        borderRadius: 5,
        margin:8,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 8,
        width:400,
      }
  });
  
