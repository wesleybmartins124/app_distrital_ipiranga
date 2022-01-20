import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, ImageBackground, Animated,Alert} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // npm i axios
import  '../../config';
import { TextInputMask } from 'react-native-masked-text';
export default function Recuperacao({navigation}) {


    
    const [email, setEmail] = useState('');
    const [rg_usuario, setRg_usuario] = useState('');  
    const [loading, setLoading] = useState(true);

  const[offset] = useState(new Animated.ValueXY({x:0, y:90}));
  const[opac] = useState(new Animated.Value(0));

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const mensagemDadosIncorretos = () =>
   Alert.alert(
      "Erro:",
      "Ops! Os dados inseridos estão incorretos.",
      [
        
        { text: "OK"  }
      ],
      { cancelable: true }
    );   

  async function seguranca(){
    //navigation.navigate('Home');
    const obj = {email, rg_usuario};
    const res = await axios.post(api + 'pesquisaRedefinir.php', obj);
    
    if(res.data.retorno === 'Dados corretos!'){
      if (res.data.obj.id  >= '0'){
        storeData(res.data.obj);
        navigation.navigate('Redefinir',{id: res.data.obj.id});
      }
      }else if (res.data.retorno === 'Dados Incorretos!'){
      mensagemDadosIncorretos();
    
    
    }else{
     alert('Erro ao conectar ao Data_Base')
    }
  }

  useEffect(()=> {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue:0, 
        speed:4,
        bounciness:20
      }),
      Animated.timing(opac, {
        toValue:1,
        duration:1000,
      })
    ]).start();
   
  }, []);

  useEffect(()=> {
    async function Recuperar(){
      const storageUser = await AsyncStorage.getItem(api + 'pesquisaRedefinir.php');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);

    }


    Recuperar();


  }, []);
  
  return (
    <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.imgBg} >
                
    <KeyboardAvoidingView 
    style={styles.background}>


    <Animated.View 
    style={[styles.formulario,
      {
        opacity: opac,
        transform: [{translateY: offset.y}]
      }
    
    ]}>
    
    <View style={{ justifyContent:'center', alignItems:'center'}} >
      <Image resizeMode="contain" source={require('../../../assets/img/padlock.gif')} style={styles.imgGf}></Image>
      <Text style={styles.instrucao}>  * Confirme seu Email e RG para redefinir a senha. </Text>
      </View>

      <TextInput 
      style={styles.input}
      placeholder="Email"
      type='email'
      dataCorrect={false}
      value={email}
      onChangeText={(email)=> setEmail(email)}
      ></TextInput>

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
      
      <View style={styles.viewBotao}>
      <TouchableOpacity 
        style={styles.botao}
       onPress={() => seguranca()}>
         <Text style={styles.textoBotao}>Próximo</Text>
      </TouchableOpacity>
      </View>


    </Animated.View>

     
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    flex: 1,
    
    justifyContent: 'center',
  },

  formulario: {
    flex: 1,
    paddingBottom:30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop:-50
  },

  input: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding:10,
    width: '90%'
  },

  viewBotao:{
    width: '90%',
    borderRadius: 7,
  },

  botao: {
    backgroundColor: '#004F5B',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7,
    padding:10,
    
    
  },
  textoBotao:{
    color:'#FFF',
    fontSize:20
  },

  botaoRecuperar:{
    marginTop:18,
  },

  textoRecuperar:{
    color:'#FFF',
    
  },

  imgBg:{
    flex:1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: '#000'
  },
    imgGf:{
      padding:50,
    width: 350,
    height: 350,
    color:'#fff',
    opacity: 1,
    marginBottom:25,
    backgroundColor:'transparent'

  },
  instrucao:{
    backgroundColor: 'transparent',
    color:'#000',
    borderRadius:10,
    fontWeight: 'bold',
    marginBottom:50, 
  }
});
