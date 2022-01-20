import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Animated, Alert,Image, ImageBackground,PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import  '../../config';
import { TextInputMask } from 'react-native-masked-text';
import {Picker} from '@react-native-picker/picker';



export default function editarPerfil({navigation,route}){


  const [valor, setValor] = useState('1');
  const [image, setImage] =  useState(null); 
  const [nome, setNome] =  useState(''); 
  const [sobrenome, setSobrenome] =  useState(''); 
  const [idade, setIdade] =  useState(''); 
  const [username, setUsername] =  useState(''); 
  const [email, setEmail] =  useState(''); 
  const [senha, setSenha] =  useState('');    
  const [cep_usuario, setCep_usuario] = useState('');
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
    const zip= axios.create({
      baseURL: 'https://viacep.com.br/ws'});
  
  
      const [cep, setCep] = useState('');
      const inputRef = useRef(null);
      const [cepUser, setCepUser] = useState(null);
  
      async function buscar(){
        if(cep_usuario == ''){
          alert('Digite um cep válido');
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
    
      function limpar(){
        setCep('');
        inputRef.current.focus();
        setCepUser(null);
      }

      const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [watchID, setWatchID] = useState(0);

  const callLocation = () => {
    if(Platform.OS === 'ios') {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de acesso à localização:",
            message: "O aplicativo necessita saber sua localização.",
            buttonPositive: "OK"
            
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          alert('Permissão de Localização negada');
        }
      };
      requestLocationPermission();
    }
  }
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const watchID = navigator.geolocation.watchPosition((position) => {
      const currentLatitude = JSON.stringify(position.coords.latitude);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      setCurrentLatitude(currentLatitude);
      setCurrentLongitude(currentLongitude);
    });
    setWatchID(watchID);
  }
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


  function ComeData(){
    callLocation(); 
    buscar();
 }

  async function edtMember(){
    const endereco_usuario = cepUser.logradouro ; 
    const bairro_usuario = cepUser.bairro ; 
    const cidade_usuario = cepUser.localidade ; 
    const lat = currentLatitude;
    const lon = currentLongitude;
    const obj = {image, nome, sobrenome, idade, username, email,  senha, cep_usuario, endereco_usuario, bairro_usuario, cidade_usuario, lat,lon, nro_residencial_usuario, rg_usuario, nro_celular_usuario, igreja_distrito, nivel, id};

    
     const res = await axios.post(api + 'editarMembro.php', obj);
     
      if(res.data.success === true){
          //mensagemSalvar();
          mensagemInserir();
          setId('');
          setValor('1');
          navigation.goBack();
      

        
        
      } if(res.data.success === 'Dado já Cadastrado!'){
        mensagemDuplicidade();
        navigation.navigate('Login');
        
      }if(res.data.success === 'Preencha todos os campos!'){
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
            <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.imgBg} >
 
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

<TextInputMask
      style={styles.input}
      placeholder="Idade"
      type={'custom'}
      options={{
        mask:'99' 
      }}
      value={idade} 
      onChangeText={ (idade) => setIdade(idade)}
      keyboardType="numeric"
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
   <View style={styles.viewSearch2}>
   <TextInput
      placeholder="Senha"
      secureTextEntry={hidePass}
      dataCorrect={false}
      value={senha}
      onChangeText={(senha)=> setSenha(senha)}
      ></TextInput>
       <TouchableOpacity style={styles.icon} onPress={()=> SetHidePass(!hidePass)}>
          {hidePass ?
          <Ionicons name="eye" color="#50A665" size={25}/>
          :
          <Ionicons name="eye-off" color="#50A665" size={25}/>
          }
        </TouchableOpacity>
        </View>

        <View >
      <Text style={styles.instrucao}>  * Digite seu atual CEP e confirme-o: </Text>
      </View>

        <View style={styles.viewSearch2}>
   <TextInputMask
        placeholder="Digite seu CEP"
        type={'zip-code'}
        value={cep_usuario}
        onChangeText={ (cep_usuario) => setCep_usuario(cep_usuario) }
        keyboardType="numeric"
        ref={inputRef}
        
        />
           <TouchableOpacity style={styles.icon} onPress={ComeData}>
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



     </View>
      }
   
   <TextInput
      style={styles.input}
      placeholder="Número Residencial"
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

        
             <TouchableOpacity  
    style={styles.botaoModal}
    onPress={edtMember}
    >
      <Text  style={styles.textoBotaoModal}>Editar</Text>
    </TouchableOpacity>
       
    </Animatable.View>
    </ImageBackground>
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
    imgBg:{
      flex:1,
      width: null,
      height: null,
      opacity: 1,
      justifyContent: "flex-start",
      backgroundColor: '#000'
    },
    viewSearch2:{

      backgroundColor: '#FFF',
      borderRadius: 5,
      margin:8,
      flexDirection: 'row',
      alignSelf: 'center',
      padding: 8,
      width:400,
    },
    icon:{
    
      right: 0,
      top: 2,
    },
    instrucao:{
      backgroundColor: 'transparent',
      color:'#000',
      borderRadius:10,
      fontWeight: 'bold',
      marginBottom:5, 
    }
 
});

