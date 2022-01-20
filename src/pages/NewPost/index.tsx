import React , {useState,useEffect} from 'react';
import { StyleSheet, View,  Text, TextInput, Image, SafeAreaView,TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // npm i axios
import  '../../config';

export default function NewPost({navigation}) {

 
    const [post, setPost] =  useState(''); 
    
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
  const [postImage, setPostImage] = useState<any>();
  const [fileName, setFileName] = useState('');
  const [nomeImagem, setNomeImagem] = useState("");
  const data = new FormData();

  const PostImage = async () => {
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

       fetch('http://distritalipiranga.website/apidistrital/upload.php', {
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
    




  useEffect(()=>{
      getData();

  },[]
  )

  async function publicar (){
    const data_post = new Date();
    const nome = dados.username; 
    const image = dados.image; 
    const igreja_distrito = dados.igreja_distrito;
    const postImage = 'http://distritalipiranga.website/apidistrital/pub/'+nomeImagem;
    const obj = {nome, image, igreja_distrito, post, postImage, data_post};
      
       const res = await axios.post(api + 'newpost.php', obj);
       
        if(res.data.success === true){
          navigation.goBack();
          
        }
        if(res.data.success === 'Preencha o Post!'){
          alert('Ops! Parece que você deixou o post vazio');
      }
    }
    
 return (
     <SafeAreaView>
   <View
      style={styles.header}>
 <TouchableOpacity  onPress={publicar}
 style={styles.touch} >
     <Text  style={styles.text}>PUBLICAR</Text>
     <Ionicons name="arrow-forward" color="#FFF" size={20} />
 </TouchableOpacity>
   </View>
   <TextInput style={styles.input}
       multiline={true}
       value={post}
       onChangeText={ (post) => setPost(post)}
       autoCorrect={false}
       placeholder="Publicar para o distrito..."></TextInput>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {postImage && <Image source={{ uri: postImage }} style={styles.avatar}/>}
      </View>
<TouchableOpacity onPress={PostImage}>
<Ionicons name="attach-outline" color="#50A665" size={40} ></Ionicons>
</TouchableOpacity>

   </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    input:{
       backgroundColor: "transparent",
       fontSize:20,
       margin:15
    },
    header:{
        backgroundColor:'#50A665',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:9,
        borderBottomWidth:2,
        borderBottomColor:'#FFF'
    },
    touch:{
    backgroundColor:'#EDBC29',
    left:275,
    padding: 10,
    borderRadius: 20,
    flexDirection:"row",
    },
    text:{
    color:'#FFF',
    fontWeight: 'bold'    
    },
    avatar:{
      width: 360,
      height: 360,
      opacity: 0.9,
      resizeMode:'contain',
      marginTop:390
    }
  });
  