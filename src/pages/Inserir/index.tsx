import React, { useState, useEffect , useRef} from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, ImageBackground, Image,Keyboard, ScrollView, Linking, Alert, UploadButton, Button, Animated, Plataform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios'; // npm i axios
import  '../../config';
import { TextInputMask } from 'react-native-masked-text';



export default function Inserir({navigation}){

  const zip= axios.create({
    baseURL: 'https://viacep.com.br/ws'});


    const [image, setImage] = useState(null);
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
    const [nome_completo, setNome_completo] =  useState(''); 
    const [nro, setNro] =  useState(''); 
    const [lat, setLat] =  useState(''); 
    const [lon, setLon] =  useState(''); 
    const [tel, setTel] =  useState(''); 
    const [material, setMaterial] =  useState(''); 
    const [idade, setIdade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cep_int, setCep_int] = useState('');
   
   
  
   
 
   
    const mensagemDuplicidade = () =>
    Alert.alert(
      "Erro ao Cadastrar",
      "Email já cadastrado!",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );
   
    const mensagemSucess = () =>
    Alert.alert(
      "Ação realizada com sucesso",
      "Os dados da pessoa interessada foram inseridos com sucesso!",
      [
        
        { text: "OK" }
      ],
      { cancelable: true }
    );

       
    const [postImage, setPostImage] = useState<any>();
    const [fileName, setFileName] = useState('');
    const [nomeImagem, setNomeImagem] = useState("");
    const data = new FormData();
  
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [10, 10],
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
        setPostImage(result.uri);
  
         fetch('http://distritalipiranga.website/apidistrital/upload_int.php', {
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
   
   
    async function cad (){
      const image = 'http://distritalipiranga.website/apidistrital/inter/'+nomeImagem;
      const endereco = cepUser.logradouro ; 
      const bairro = cepUser.bairro ; 
      const cidade = cepUser.localidade ; 
      const username = dados.username;
      const email_usuario = dados.email;
      const foto = dados.image;
      const igreja_distrito = dados.igreja_distrito;
      const obj = {image ,	nome_completo ,	cep_int ,	endereco ,	bairro , cidade , lat, lon,	nro ,	tel, 	material,	idade ,	descricao ,	username ,	email_usuario ,	foto, 	igreja_distrito};
        
         const res = await axios.post(api + 'inserir.php', obj);
         
          if(res.data.success === true){
            //mensagemSalvar();
            mensagemSucess();
            navigation.goBack();
            
          } 
          if(res.data.success === 'Preencha todos os campos!'){
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
        return(
         <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.modal1} >
          <View>
   <ScrollView>
        
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius:40 / 2 }}>
      
      {postImage && <Image source={{ uri: postImage }} style={styles.avatar} />}
      < Button color="#004F5B"  top= "-390" title="Escolher  foto" onPress={pickImage} />
 
    </View>
      


   <TextInput 
          type="text"
        style={styles.input}
        placeholder="Nome Completo"
        value={nome_completo}
        onChangeText={ (nome_completo) => setNome_completo(nome_completo) }
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



     </View>
      }
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
        onPress={cad}
        >
          <Text  style={styles.textoBotaoModal}>Inserir</Text>
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
           borderRadius: 10,
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
        
      }
   });
  

