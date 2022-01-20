import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, Button, Animated, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import  '../../config';
import {Ionicons} from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';




export default function editarMembros({navigation,route}){

  const zip= axios.create({
    baseURL: 'https://viacep.com.br/ws'});


    const [cep, setCep] = useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);

    async function buscar(){
      if(cep_int == ''){
        alert('Digite um cep válido');
        setCep_int('');
        return; //
      } 
  
      try{
        const response = await zip.get(`/${cep_int}/json`);
        console.log(response.data);
        setCepUser(response.data);
        Keyboard.dismiss(); //Garantir que o teclado sera fechado!
  
      }catch(error){
        console.log('ERROR: ' + error);
      }
  
  
    }
  
    function limpar(){
      setCep('');
      inputRef.current.focus();
      setCepUser(null);
    }

  const [valor, setValor] = useState('1');
  const [image, setImage] =  useState(null); 
  const [nome_completo, setNome_completo] =  useState(''); 
  const [cep_int, setCep_int] = useState(''); 
  const [nro, setNro] =  useState(''); 
  const [lat, setLat] =  useState(''); 
  const [lon, setLon] =  useState(''); 
  const [tel, setTel] =  useState(''); 
  const [material, setMaterial] =  useState(''); 
  const [idade, setIdade] = useState('');
  const [descricao, setDescricao] = useState('');


 
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
     
      const res = await axios.get(api + 'buscarIdInt.php?busca=' + id);
      //alert(res.data)
      if(res.data.result != '0'){
          setImage(res.data.result.image);
          setNome_completo(res.data.result.nome_completo);
          setCep_int(res.data.result.cep_int);
          setNro(res.data.result.nro);
          setTel(res.data.result.tel);
          setNro(res.data.result.nro);
          setMaterial(res.data.result.material);
          setIdade(res.data.result.idade);
          setDescricao(res.data.result.descricao);
       

          setValor('2');
      }
  }

  const mensagemEdtInt = () =>
  Alert.alert(
    "INFO:",
    "A pessoa interessada foi editada com sucesso!",
    [
      
      { text: "OK" }
    ],
    { cancelable: true }
  );


  async function edt(){
     
    const endereco = cepUser.logradouro ; 
    const bairro = cepUser.bairro ; 
    const cidade = cepUser.localidade ; 
    const username = dados.username;
    const email_usuario = dados.email;
    const foto = dados.image;
    const igreja_distrito = dados.igreja_distrito;
    const obj = {image ,	nome_completo ,	cep_int ,	endereco ,	bairro , cidade , lat, lon,	nro ,	tel, 	material,	idade ,	descricao ,	username ,	email_usuario ,	foto, 	igreja_distrito , id};

    
     const res = await axios.post(api + 'editarInt.php', obj);
     
      if(res.data.success === true){
          //mensagemSalvar();
          mensagemEdtInt();
          setId('');
          setValor('1');
          navigation.goBack();
      

        
        
      } if(res.data.success === 'Preencha todos os campos!'){
        Alert.alert(
          "Atenção",
          "Preencha o campo que está vazio!",
          [
            
            { text: "OK" }
          ],
          { cancelable: true }
        );
       
        
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
        value = {nome_completo}
        onChangeText={ (nome_completo) => setNome_completo(nome_completo)}
        /> 
        <View style={styles.viewSearch}>
   <TextInputMask
        style={styles.input1}
        placeholder="Digite seu CEP"
        type={'zip-code'}
        value={cep_int}
        onChangeText={ (cep_int) => setCep_int(cep_int) }
        keyboardType="numeric"
        ref={inputRef}
        
        />
           <TouchableOpacity style={styles.icon} onPress={ buscar }>
                <Ionicons name="arrow-forward" color="#000" size={25} />
              </TouchableOpacity>
</View>
{ cepUser &&
     <View>
       
        <Text
       style={styles.input} > 
       {cepUser.logradouro} </Text>

       <Text
       style={styles.input} > 
       {cepUser.bairro} </Text>

       <Text
        style={styles.input}> 
        {cepUser.localidade} </Text>

        <TextInputMask 
  type="text"
style={styles.input}
placeholder="Latitude"
value={lat}
type={'custom'}
options={{
  mask: '-99.99999999'
}}
onChangeText={ (lat) => setLat(lat) }
keyboardType="numeric"
/>

<TextInputMask 
  type="text"
style={styles.input}
placeholder="Longitude"
value={lon}
type={'custom'}
options={{
  mask: '-99.99999999'
}}
onChangeText={ (lon) => setLon(lon) }
keyboardType="numeric"
/>

     </View>
      }
      
 
 
  

   <TextInputMask 
          type="text"
        style={styles.input}
        placeholder="Número"
        type={'custom'}
        options={{
          mask: '9999'
        }}
        value={nro}
        onChangeText={ (nro) => setNro(nro)}
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
        value={tel}
        onChangeText={ (tel) => setTel(tel)}
        keyboardType="numeric"
        />

<TextInput 
          type="text"
        style={styles.input}
        placeholder="Material que possui"
        value={material}
        multiline={true}
        onChangeText={ (material) => setMaterial(material) }
   
/>


   
   <TextInputMask
          type="text"
        style={styles.input}
        placeholder="Idade"
        type={'custom'}
        options={{
          mask: '999'
        }}
        value={idade}
        onChangeText={ (idade) => setIdade(idade)}
        keyboardType="numeric"
        />
     
     <TextInput 
          type="text"
        style={styles.input}
        placeholder="Observações:"
        value={descricao}
        multiline={true}
        onChangeText={ (descricao) => setDescricao(descricao) }
        />
   
   
               <TouchableOpacity  
      style={styles.botaoModal}
      onPress={edt}
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
      },
      viewSearch:{

        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 5
      },
      input1:{
        width: '90%',
        padding: 13,
        paddingLeft: 10,
        fontSize: 13,
        color:'#000'
      },
      icon:{
    
        right: 0,
        top: 15,
      },
  });