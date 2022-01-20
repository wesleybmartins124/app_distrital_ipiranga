import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import  '../../config';
import { TextInputMask } from 'react-native-masked-text';
import {Picker} from '@react-native-picker/picker';



export default function editarMembros({navigation,route}){

    const [valor, setValor] = useState('1');
    const [image, setImage] =  useState(null); 
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
            setSenha(res.data.result.senha);
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
      "O usuário foi editado com sucesso!",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );

  
    async function edtMem(){
       
      const obj = {image, nome, sobrenome, idade, username, email,  senha, cep_usuario, endereco_usuario, bairro_usuario, cidade_usuario, lat,lon, nro_residencial_usuario, rg_usuario, nro_celular_usuario, igreja_distrito, nivel, id};
  
      
       const res = await axios.post(api + 'editarMembro.php', obj);
       
        if(res.data.success === true){
            //mensagemSalvar();
            mensagemInserir();
            setId('');
            setValor('1');
            navigation.navigate('visualizarMembros');
        

          
          
        } if(res.data.success === 'Preencha todos os campos!'){
          Alert.alert(
            "Atenção",
            "Preencha o campo que está vazio!",
            [
              
              { text: "OK" }
            ],
            { cancelable: true }
          );
         
          
        }if(res.data.success === 'Dado já Cadastrado!'){
          mensagemDuplicidade();
          navigation.navigate('Login');
          
        }



 
  }
      
    return (

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
          
          <TextInput 
          type="text"
        style={styles.input}
        placeholder="Nome"
        value = {nome}
        onChangeText={ (nome) => setNome(nome)}
        editable = {false}
        /> 
 

        <TextInput 
        style={styles.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={ (sobrenome) => setSobrenome(sobrenome)}

        />
  
  <TextInput 
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={ (username) => setUsername(username)}
        editable = {false}
        />

<TextInput 
          type="text"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={ (email) => setEmail(email)}
        editable = {false}
        />
     
   <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep_usuario}
        onChangeText={ (cep_usuario) => setCep_usuario(cep_usuario) }
        editable = {false}
       
        
        />
         <TextInput 
        style={styles.input}
        placeholder="..."
        value={endereco_usuario}
        onChangeText={ (endereco_usuario) => setEndereco_usuario(endereco_usuario)}
        editable = {false}
        />
          <TextInput 
        style={styles.input}
        placeholder="..."
        value={bairro_usuario}
        onChangeText={ (bairro_usuario) => setBairro_usuario(bairro_usuario)}
         editable = {false}
        />
           <TextInput 
        style={styles.input}
        placeholder="..."
        value={cidade_usuario}
        onChangeText={ (cidade_usuario) => setCidade_usuario(cidade_usuario)}
        editable = {false}
        />
     <TextInput
        style={styles.input}
        placeholder="..."
        value={nro_residencial_usuario}
        onChangeText={ (nro_residencial_usuario) => setNro_residencial_usuario(nro_residencial_usuario) }
        keyboardType="numeric"
        
        />
         <TextInputMask 
          type="text"
        style={styles.input}
        placeholder="Celular"
        type={'cel-phone'}
        options={{
          maskType:'BRL',
          withDDD: true,
          dddMask:'(99) '
        }}
        value={nro_celular_usuario}
        onChangeText={ (nro_celular_usuario) => setNro_celular_usuario(nro_celular_usuario)}
        keyboardType="numeric"
        />

<View style={styles.container}>
        <Text
        style={styles.labelContainer}
        > Selecione a igreja que você pertence:</Text>
   </View>
   
   <Picker
                   selectedValue={igreja_distrito}
                   style={{height: 50}}
                   onValueChange={(igreja_distrito) => setIgreja_distrito(igreja_distrito)}
               >
                   <Picker.Item label="Heliopólis" value="Heliopólis" />
                   <Picker.Item label="Ipiranga" value="Ipiranga" />
                   <Picker.Item label="Liviero" value="Liviero" />
                   <Picker.Item label="Moinho Velho" value="Moinho Velho" />
                   <Picker.Item label="São João Clímaco" value="São João Clímaco" />
               </Picker>

<View style={styles.container}>
        <Text
        style={styles.labelContainer}
        > Mudar o nível para:</Text>
   </View>
   <Picker
                   selectedValue={nivel}
                   style={{height: 50}}
                   onValueChange={(nivel) => setNivel(nivel)}
               >
                   <Picker.Item label="Máximo" value="máximo" />
                   <Picker.Item label="Avançado" value="avançado" />
                   <Picker.Item label="Intermediário" value="intermediário" />
                   <Picker.Item label="Básico" value="básico" />
               </Picker>
          
               <TouchableOpacity  
      style={styles.botaoModal}
      onPress={edtMem}
      >
        <Text  style={styles.textoBotaoModal}>Editar</Text>
      </TouchableOpacity>
         
      </Animatable.View>
         
          </ScrollView>  
         
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
      avatar:{
        width: 160,
        height: 160,
        borderRadius:80,
        opacity: 0.9,
        marginTop:10,
      }
  });
  
