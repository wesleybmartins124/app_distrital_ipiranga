import React, {useState, useEffect} from 'react';
import {StyleSheet,Text, View, Dimensions, Image,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios'; // npm i axios
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Mapa({navigation}) {

  

  const[dados, setDados] = useState([]);
  const [lista, setLista] = useState([]);
  const [marker, setMarker] = useState([]);
  const [buscar, setBuscar] = useState('');


  
  useEffect(()=> {
    listarDados();
  },[])

  
  async function listarDados(){
    const res = await axios.get(api + 'maps.php?busca=' + buscar);
    setLista(res.data.result);
    console.log(res.data.result);
    
  }

  useEffect(()=> {
    listarMembros();
  },[])


  async function listarMembros(){
    const res = await axios.get(api + 'listarMembros.php?busca=' + buscar);
    setMarker(res.data.result);
    console.log(res.data.result);
    
  }

  function editar(id){
         
    navigation.navigate('Details', {id: id});
    
  }


return(
 
<View style={styles.container}>
  <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -23.5880611,
            longitude: -46.6040369,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
  <Marker coordinate = {{latitude: -23.6175632,longitude: -46.6046199}}
         pinColor = {"red"} // any color 
         image={('http://distritalipiranga.website/apidistrital/imagens/church.png')}
>
                 <Callout tooltip>
              <View style={styles.calloutContainer}>
              <Text>
      <Image style={{ height: 120, width:120 }} source={{uri:'http://distritalipiranga.website/apidistrital/imagens/iasd-moinho.jpg'}}  />
</Text>

                <Text >IASD Moinho Velho</Text>
                <Text >Endereço: Rua Ribeirão Bonito, 315 - Vila Moinho Velho, São Paulo - SP, 04286-130s</Text>
              </View>
            </Callout>
           </Marker> 
           <Marker coordinate = {{latitude: -23.6494963, longitude: -46.5983990}}
         pinColor = {"red"} // any color 
         image={('http://distritalipiranga.website/apidistrital/imagens/church.png')}
>
                 <Callout tooltip>
              <View style={styles.calloutContainer}>
              <Text>
      <Image style={{ height: 120, width:120 }} source={{uri:'http://distritalipiranga.website/apidistrital/imagens/iasd-liviero.jpg'}}  />
</Text>

                <Text >IASD Vila Liviero</Text>
                <Text >Endereço: Rua Aracatu, 127 - Sacomã, São Paulo - SP, 04187-030</Text>
              </View>
            </Callout>
           </Marker>
           <Marker coordinate = {{latitude: -23.6204661, longitude: -46.5929933}}
         pinColor = {"red"} // any color 
         image={('http://distritalipiranga.website/apidistrital/imagens/church.png')}
>
                 <Callout tooltip>
              <View style={styles.calloutContainer}>
              <Text>
      <Image style={{ height: 120, width:120 }} source={{uri:'http://distritalipiranga.website/apidistrital/imagens/ias-sjs.jpg'}}  />
</Text>

                <Text >IASD São João Clímaco</Text>
                <Text >Endereço: Rua Solemar, 671 - Vila Conde do Pinhal, São Paulo - SP, 04235-275</Text>
              </View>
            </Callout>
           </Marker>
           <Marker coordinate = {{latitude: -23.599300, longitude: -46.603437}}
         pinColor = {"red"} // any color 
         image={('http://distritalipiranga.website/apidistrital/imagens/church.png')}
>
                 <Callout tooltip>
              <View style={styles.calloutContainer}>
              <Text>
      <Image style={{ height: 120, width:120 }} source={{uri:'http://distritalipiranga.website/apidistrital/imagens/iasd-ipi.jpg'}}  />
</Text>

                <Text >IASD Ipiranga</Text>
                <Text >Endereço: Rua do Grito, 152 - Ipiranga, São Paulo - SP, 04217-000</Text>
              </View>
            </Callout>
           </Marker>


           <Marker coordinate = {{latitude: -23.61146, longitude: -46.5922794}}
         pinColor = {"red"} // any color 
         image={('http://distritalipiranga.website/apidistrital/imagens/church.png')}
>
                 <Callout tooltip>
              <View style={styles.calloutContainer}>
              <Text>
      <Image style={{ height: 120, width:120 }} source={{uri:'http://distritalipiranga.website/apidistrital/imagens/iasd-helio.jpeg'}}  />
</Text>

                <Text >IASD Heliopólis</Text>
                <Text >Endereço: Rua Damasco de Heliópolis, 14 - Cidade Nova Heliópolis, São Paulo - SP, 04235-140 </Text>
              </View>
            </Callout>
           </Marker>
        
        

{lista.map((item)=>{
             return (
             <Marker key={item.id}    coordinate={{longitude: Number(item.lon), latitude: Number(item.lat)}}   
        pinColor = {"red"} // any color 
        image={('http://distritalipiranga.website/apidistrital/imagens/info.png')}
        >
            <Callout tooltip  onPress = {()=> editar(item.id)} >
              <View style={styles.calloutContainerint}>
              <Text>
                <Image
                source={{uri: item.image}}
                style={[styles.imagenphoto]}
                />
                </Text>
                <Text style={styles.calloutText}>{item.nome_completo}, {item.idade} anos.</Text>
                <Text style={styles.calloutSmallText}>{item.endereco},n°{item.nro}</Text>
                <Text style={styles.calloutSmallText}>INFO:{item.descricao}</Text>
              </View>
            </Callout>
               </Marker>
             );
           })}

{marker.map((item)=>{
             return (
             <Marker key={item.id}    coordinate={{longitude: Number(item.lon), latitude: Number(item.lat)}}   
        pinColor = {"blue"} // any color 
        image={('http://distritalipiranga.website/apidistrital/imagens/home.png')}
        >
            <Callout tooltip >
              <View style={styles.calloutContainerint}>
              <Text>
                <Image
                source={{uri: item.image}}
                style={[styles.imagenphoto]}
                />
                </Text>
                <Text style={styles.calloutText}>{item.nome} {item.sobrenome}, {item.idade} anos.</Text>
                <Text style={styles.calloutSmallText}>{item.endereco_usuario},n°{item.nro_residencial_usuario}</Text>
                <Text style={styles.calloutSmallText}>Membro da IASD:{item.igreja_distrito}</Text>
              </View>
            </Callout>
               </Marker>
             );
           })}
           
      
 </MapView>
</View>

);
   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
      calloutContainer: {
    width: 180,
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    top:-20
  },
  
  calloutContainerint: {
    width: 160,
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    justifyContent: "center",
    marginTop:-20
  },
  calloutText: {
    color: "#0089a5",
    textDecorationLine: "underline",
    fontSize: 14,
  },

  calloutSmallText: {
    color: "#005555",
    fontSize: 10,
  }, 
  imagenphoto:{
    height:120,
    width:120,
   resizeMode:'contain',
    marginTop:20
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    width: 200,
    color: "#8fa7b3",
  }

  });