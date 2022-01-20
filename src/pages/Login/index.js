import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, ImageBackground, Animated,Alert} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // npm i axios
import  '../../config';
export default function Login({navigation}) {


    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');  
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

  async function logar(){
    //navigation.navigate('Home');
    const obj = {email, senha};
    const res = await axios.post(api + 'login.php', obj);
    
    if(res.data.retorno === 'Dados corretos!'){
      if (res.data.obj.nivel === 'máximo'){
        storeData(res.data.obj);
        navigation.navigate('Home',{nome: res.data.obj.nome});
      }else if (res.data.obj.nivel === 'avançado'){
        storeData(res.data.obj);
        navigation.navigate('Avançado',{nome: res.data.obj.nome});
      }else if (res.data.obj.nivel === 'intermediário'){
        storeData(res.data.obj);
        navigation.navigate('Intermediário',{nome: res.data.obj.nome});
      }else if (res.data.obj.nivel === 'básico'){
        storeData(res.data.obj);
        navigation.navigate('Básico',{nome: res.data.obj.nome});
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
    async function logar(){
      const storageUser = await AsyncStorage.getItem(api + 'login.php');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);

    }


    logar();


  }, []);
  
  return (
    <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.imgBg} >
                
    <KeyboardAvoidingView 
    style={styles.background}>
     <View style={styles.logo}>
       <Image style={{width:360}} resizeMode = "contain" source={require('../../../assets/img/simbolo.png')}></Image>
     </View>

    <Animated.View 
    style={[styles.formulario,
      {
        opacity: opac,
        transform: [{translateY: offset.y}]
      }
    
    ]}>
      
      <TextInput 
      style={styles.input}
      placeholder="Insira seu Email"
      type='email'
      dataCorrect={false}
      value={email}
      onChangeText={(email)=> setEmail(email)}
      ></TextInput>

      <TextInput
      style={styles.input}
      placeholder="Senha"
      secureTextEntry={true}
      dataCorrect={false}
      value={senha}
      onChangeText={(senha)=> setSenha(senha)}
      ></TextInput>
      
      <View style={styles.viewBotao}>
      <TouchableOpacity 
        style={styles.botao}
       onPress={() => logar()}>
         <Text style={styles.textoBotao}>Ingressar</Text>
      </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.botaoRecuperar}
       onPress={() => navigation.navigate('Cadastro')}>
         <Text style={styles.textoRecuperar}>Não possui cadastro ? Clique aqui</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.botaoRecuperar}
       onPress={() => navigation.navigate('Recuperacao')}>
         <Text style={styles.textoRecuperar}>Recuperar Senha</Text>
      </TouchableOpacity>



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
    color:'#004F5B',
 
    
  },

  imgBg:{
    flex:1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: '#000'
  },
});
