import React , { useState, useEffect,useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  Button,
  ImageBackground,
  Platform
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Block, Text, theme } from "galio-framework";
import {Ionicons} from '@expo/vector-icons';

export default function Details({navigation,route}) {

 const [valor, setValor] = useState('1');
  const [image, setImage] =  useState(null); 
  const [nome_completo, setNome_completo] =  useState(''); 
  const [cidade, setCidade] =  useState(''); 
  const [cep_int, setCep_int] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [bairro, setBairro] = useState(''); 
  const [nro, setNro] =  useState(''); 
  const [lat, setLat] =  useState(''); 
  const [lon, setLon] =  useState(''); 
  const [tel, setTel] =  useState(''); 
  const [material, setMaterial] =  useState(''); 
  const [idade, setIdade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [username, setUsername] = useState('');
  const [igreja_distrito, setIgreja_distrito] = useState('');

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
          setCidade(res.data.result.cidade);
          setEndereco(res.data.result.endereco);
          setBairro(res.data.result.bairro);
          setLat(res.data.result.lat);
          setLon(res.data.result.lon);
          setNro(res.data.result.nro);
          setTel(res.data.result.tel);
          setNro(res.data.result.nro);
          setMaterial(res.data.result.material);
          setIdade(res.data.result.idade);
          setFoto(res.data.result.foto);
          setDescricao(res.data.result.descricao);
          setUsername(res.data.result.username);
          setIgreja_distrito(res.data.result.igreja_distrito);
       

          setValor('2');
      }
  }

 return (
    
 
      <ImageBackground
        source={require('../../../assets/img/BackgroundLogin.png')}
        style={styles.profileContainer}
        imageStyle={styles.profileBackground}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: '25%' }}
        >
          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              <Image
                source={{ uri: image}}
                style={styles.avatar}
              />
                    <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                     {nome_completo},{idade} 
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      {cidade}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  </Block>
                  </Block>
                  <Block
                    row
                    space="between"
                    
                  >
                        <Text bold size={23} color="#32325D" >
                      Sobre:
                    </Text>
                    </Block>
                    <Block >  
                    <Text bold size={16} color="#525F7F" style={{marginTop: 10}}>
                    <Ionicons name="home" color="#50A665" size={20} ></Ionicons> {endereco},N°{nro} - {bairro},{cidade}
                    </Text>

                    
                   
                  </Block>
                
                 
 
                  <Block>  
                    <Text bold size={16} color="#525F7F" style={{marginTop: 5}}>
                    <Ionicons name="book" color="#50A665" size={20} ></Ionicons> {material}
                    </Text>

                    
                   
                  </Block>

                  <Block> 
                    <Text bold size={16} color="#525F7F" style={{marginTop: 10}}>
                    <Ionicons name="information-circle" color="#50A665" size={20} ></Ionicons> {descricao}
                    </Text>

                    
                   
                  </Block>

                  <Block> 
                    <Text bold size={16} color="#525F7F" style={{marginTop: 10}}>
                    <Ionicons name="call" color="#50A665" size={20} ></Ionicons> {tel}
                    </Text>

                    
                   
                  </Block>
                  <Block
                    row
                    space="between"
                    
                  >
                        <Text bold size={23} color="#32325D" style={{marginTop: 10}}>
                      Introduzido por:
                    </Text>
                    </Block>

                  <Block> 
                  <Image
                source={{ uri: foto}}
                style={styles.avatar2}
              />
                    <Text bold size={16} color="#525F7F" style={{top: 10}}>
                  {username} - {igreja_distrito}
                    </Text>

                    
                   
                  </Block>
                  
          </Block>
          
         
        </ScrollView>
      </ImageBackground>

 

  );}
  const styles = StyleSheet.create({
   
    profileContainer: {
      padding: 0,
      flex:1
    
    },
    profileCard: {
      // position: "relative",
      marginTop: 65,
      padding: theme.SIZES.BASE,
     marginHorizontal: theme.SIZES.BASE,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      backgroundColor: theme.COLORS.WHITE,
      shadowRadius: 8,
      shadowOpacity: 0.2,
      zIndex: 2,
      borderRadius:60/2
    },
    info: {
      paddingHorizontal: 40
    },
    avatarContainer: {
      position: "relative",
      marginTop: -80
    },
    avatar: {
      width: 170,
      height: 170,
      borderRadius: 170/2,
      borderWidth: 0,
      marginTop:15
    },
    avatar2: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        borderWidth: 0,
        marginTop:15
      },
    nameInfo: {
      marginTop: 15
    },
    divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF",
      marginTop:8
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: "center",

    }
  });
