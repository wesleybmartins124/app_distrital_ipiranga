import React, { useState, useEffect , useRef} from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, ImageBackground, Image,Keyboard, ScrollView, Alert, PermissionsAndroid,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios'; // npm i axios
import  '../../config';
import { TextInputMask } from 'react-native-masked-text';
import {Picker} from '@react-native-picker/picker';

export default function Cadastro({navigation}){

  const zip= axios.create({
    baseURL: 'https://viacep.com.br/ws'});

    
    const [state, setState] = useState(null);
    const [cep, setCep] = useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);
    const [fileName, setFileName] = useState('');
    

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
   
   
  
   
 
   
    const mensagemDuplicidade = () =>
    Alert.alert(
      "Erro ao Cadastrar",
      "Dados duplos constando entre o formulário e o DATA_BASE",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );

   
    const mensagemInserir = () =>
    Alert.alert(
      "INFO:",
      "O seu cadastro foi realizado com sucesso!",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );

    
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
    
  
  const [imagea, setImagea] = useState<any>();
  const [nomeImagem, setNomeImagem] = useState("");
  const data = new FormData();

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,

      });
  
      if (result.cancelled) {
          return;
        }

       
      
        let localUri = result.uri;
        let filename:any = localUri.split('/').pop();
        setNomeImagem(filename);
       
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;


      const data = new FormData();
      data.append('data', { uri: localUri, name: filename, type });
       setImagea(result.uri);

       fetch('http://distritalipiranga.website/apidistrital/upload_image.php', {
        method: 'POST',
        body: data,
      },
      
     
       )};

       
        // Create a DB entry for the image
        const dbData = new FormData();
        dbData.append(
          'fileName', fileName,
        );
        dbData.append(
          'uploaderID', '1',
        );
        dbData.append(
          'fileType', 'image',
        );
    




    async function cad (){
      const image = 'http://distritalipiranga.website/apidistrital/photo/'+nomeImagem;
      const endereco_usuario = cepUser.logradouro ; 
      const bairro_usuario = cepUser.bairro ; 
      const cidade_usuario = cepUser.localidade ; 
      const lat = currentLatitude;
      const lon = currentLongitude;
      const obj = {image, nome, sobrenome, idade, username, email,  senha, cep_usuario, endereco_usuario, bairro_usuario, cidade_usuario, lat,lon, nro_residencial_usuario, rg_usuario, nro_celular_usuario, igreja_distrito, nivel};
        
         const res = await axios.post(api + 'cadastrar.php', obj);
         
          if(res.data.success === true){
            //mensagemSalvar();
            mensagemInserir();
            navigation.goBack();
            
          } if(res.data.success === 'Dado já Cadastrado!'){
            mensagemDuplicidade();
            
          }if(res.data.success === 'Preencha todos os campos!'){
            Alert.alert(
              "Atenção",
              "Preencha todos os campos!",
              [
                
                { text: "OK" }
              ],
              { cancelable: true }
            );
           
            
          }
          if(res.data.success === 'Preencha a qual igreja você pertence!'){
            alert('Selecione a igreja que você pertence.');
        }
        if(res.data.success === 'Preencha a opção!'){
          alert('Ops! Selecione a opção.');
      }
      if(res.data.success === 'Selecione foto!'){
        alert('Por favor, selecione uma foto.');
    }
    if(res.data.success === 'CepUser!'){
      alert('Por favor, coloque um endereço válido.');
  }


    }
    function ComeData(){
      callLocation(); 
      buscar();
   }
        return(
         <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.modal1} >
          <View>
   <ScrollView>
        
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius:40 / 2 }}>
      
      {imagea && <Image source={{ uri: imagea }} style={styles.avatar} />}
      < Button color="#004F5B"  top= "-20" title="Escolher  foto" onPress={pickImage} />
 
    </View>


   <TextInput 
          type="text"
        style={styles.input}
        placeholder="Nome"
        value={	nome}
        onChangeText={ (nome) => setNome(nome)}
        />
   
        <TextInput 
          type="text"
        style={styles.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={ (sobrenome) => setSobrenome(sobrenome)}
        />
   
   <TextInputMask 
          type="text"
        style={styles.input}
        placeholder="Idade"
        type={'custom'}
        options={{
          mask: '99'
        }}
        value={idade}
        onChangeText={ (idade) => setIdade(idade)}
        keyboardType="numeric"
        />

   <TextInput 
          type="text"
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={ (username) => setUsername(username)}
        />
   
   <TextInput 
          type="text"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={ (email) => setEmail(email)}
        />
     
     <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        dataCorrect={false}
        value={senha}
        onChangeText={(senha)=> setSenha(senha)}
        ></TextInput>
   <View style={styles.viewSearch}>
   <TextInputMask
        style={styles.input1}
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
   
        
   <TextInputMask 
          type="text"
        style={styles.input}
        placeholder="Número"
        type={'custom'}
        options={{
          mask: '9999'
        }}
        value={nro_residencial_usuario}
        onChangeText={ (nro_residencial_usuario) => setNro_residencial_usuario(nro_residencial_usuario)}
        keyboardType="numeric"
        />
   
   <TextInputMask
          type="text"
        style={styles.input}
        placeholder="RG"
        type={'custom'}
        options={{
          mask: '99.999.999-9'
        }}
        value={rg_usuario}
        onChangeText={ (rg_usuario) => setRg_usuario(rg_usuario)}
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
                   <Picker.Item label="" value="" />
                   <Picker.Item label="Heliopólis" value="Heliopólis" />
                   <Picker.Item label="Ipiranga" value="Ipiranga" />
                   <Picker.Item label="Liviero" value="Liviero" />
                   <Picker.Item label="Moinho Velho" value="Moinho Velho" />
                   <Picker.Item label="São João Clímaco" value="São João Clímaco" />
               </Picker>

      
               <View style={styles.container}>
        <Text
        style={styles.labelContainer}
        > Opção:</Text>
   </View>
   
   <Picker
                   selectedValue={nivel}
                   style={{height: 50}}
                   onValueChange={(nivel) => setNivel(nivel)}
               >
                   <Picker.Item label="" value="" />
                   <Picker.Item label="Básico" value="básico" />
               </Picker>
   
   
     <TouchableOpacity  
        style={styles.botaoModal}
        onPress={cad}
        >
          <Text  style={styles.textoBotaoModal}>Cadastrar</Text>
        </TouchableOpacity>
   
     </ScrollView>
     </View>
     </ImageBackground>
        )
   }
   
   const styles = StyleSheet.create({
       modal:{
           flex: 1,
           backgroundColor:'#e9ecea',
           marginTop:15,
         },
         modal1:{
           flex: 1,
           width: null,
           height: null,
           opacity: 1,
           justifyContent: "flex-start",
         },
         textoModal:{
           
           color: '#FFF',
           marginLeft: 15,
           fontSize:16,
           
           
         },

       
         input:{
           marginTop:13,
           backgroundColor: '#FFF',
           borderRadius: 5,
           margin: 8,
           padding: 8,
           color: '#000',
           fontSize:13
         },
         botaoModal:{
           backgroundColor: '#004F5B',
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
       icon:{
    
        right: 0,
        top: 15,
      },
      icon2:{
        left:8
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
      upload:{
        backgroundColor: '#00335c',
        borderRadius: 5,
        margin: 5,
        padding: 12,
        color: '#FFF',
        alignItems:'center',
        justifyContent:'center',

      },
      avatar:{
        width: 160,
        height: 160,
        borderRadius:80,
        opacity: 0.9,
        marginTop:10,
      },
      plus:{
        zIndex: 9,
        position: 'absolute',
        fontSize: 55,
        color: '#50A665',
        opacity: 0.9,
        left: 190
        
      },
      header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      }
   });
  
  
