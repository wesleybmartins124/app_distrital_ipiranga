import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View, ImageBackground, ScrollView, Alert, Button, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios'; // npm i axios
import  '../../config';



export default function addProgramacao({navigation}) {


  const [strData, setStrData] = useState('DATA:');
  const [strHora, setStrHora] = useState('HORA:');

  const [titulo_programacao, setTitulo_programacao] =  useState(''); 
  const [descricao_programacao, setDescricao_programacao] =  useState('');  
  const [local, setLocal] = useState('') ;  




  
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


const [date, setDate] = useState(new Date());
const [dataInserir, setDataInserir] = useState('');
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false); 

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  //setDate(currentDate);

 //alert(currentDate.getMinutes());
  
 var day = currentDate.getDate();
 var month = currentDate.getMonth() + 1;
 var year = currentDate.getFullYear();



 var formatterDay;	
 if (day < 10) {
     formatterDay = '0'+ day;
 } else {
     formatterDay = day;
 }
 
 var formatterMonth;	
 if (month < 10) {
     formatterMonth = '0'+ month;
 } else {
     formatterMonth = month;
 }

 //DATA NO MODELO BRASILEIRO
var dateFormattedBra =  formatterDay +'/'+ formatterMonth +'/'+ year;
 
 //DATA NO MODELO AMERICANO
 var dateFormatted =  year +'-'+ formatterMonth +'-'+ formatterDay;

 setDataInserir(dateFormatted);

 alert(dateFormattedBra);
 setStrData(dateFormattedBra);
};

const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

const [horaInserir, setHoraInserir] = useState('');
const [showHora, setShowHora] = useState(false); 

const onChangeHora = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShowHora(Platform.OS === 'ios');
  //setDate(currentDate);

 //alert(currentDate.getMinutes());
  
 var hors = currentDate.getHours();
 var minut = currentDate.getMinutes() ;

 if (hors < 10) {
  hors = '0'+ hors;
} else {
  hors = hors;
}


if (minut < 10) {
  minut = '0'+ minut;
} else {
  minut = minut;
}

 var horaFormatada =  hors +':'+ minut;

 setHoraInserir(horaFormatada);

 alert(horaFormatada);
 setStrHora(horaFormatada);
};

const showModeHora = (currentMode) => {
  setShowHora(true);
  setMode(currentMode);
}; 

const showDatepickerHora = () => {
  showModeHora('time');
};

const mensagemDuplicidade = () =>
Alert.alert(
  "Erro ao Salvar",
  "Alguma programação já está cadastrada nesse período.",
  [
    
    { text: "OK"}
  ],
  { cancelable: true }
); 



async function add (){
  const nome = dados.nome; 
  const igreja_distrito = dados.igreja_distrito;
  const image = dados.image;
  const obj = {nome, image, titulo_programacao, descricao_programacao, dataInserir,  horaInserir, local, igreja_distrito};
    
     const res = await axios.post(api + 'addProgramacao.php', obj);
     
      if(res.data.success === true){
        //mensagemSalvar();
        navigation.navigate('Programação')
        
      }

      if(res.data.success === 'Programação já Cadastrada!'){
        mensagemDuplicidade();
        
      }
      if(res.data.success === 'Preencha a Data!'){
        alert('Escolha uma Data');
    }

    if(res.data.success === 'Preencha a Hora!'){
      alert('Escolha um Horário');
  }
    
}


  return (
    <ImageBackground source={require('../../../assets/img/BackgroundLogin.png')} style={styles.modal} >
    <View style={styles.modal}>


        <Animatable.View  
          animation="bounceInUp"
        useNativeDriver  >
     <ScrollView>

        <TextInput 
        type="text"
      style={styles.input}
      placeholder="Insira o nome da programação"
      value={	titulo_programacao}
      onChangeText={ (titulo_programacao) => setTitulo_programacao(	titulo_programacao)}
      />

      <TextInput 
      multiline={true}
      style={styles.input}
      placeholder="Insira uma descrição"
      value={descricao_programacao}
      onChangeText={ (descricao_programacao) => setDescricao_programacao(descricao_programacao)}
      />

<TextInput 
      style={styles.input}
      placeholder="Insira o local da programação"
      value={local}
      onChangeText={ (local) => setLocal(local)}
      />

<View style={styles.data}>

<TouchableOpacity 
      style={ styles.areaData}
      onPress={showDatepicker}>
      
      
       <Ionicons name="calendar" color="#000" size={28} />
       <Text> {strData}</Text>
      
     </TouchableOpacity>

     <TouchableOpacity 
      style={ styles.areaHora}
      onPress={showDatepickerHora}>
      
      
       <Ionicons name="time" color="#000" size={28} />
       <Text> {strHora}</Text>
      
     </TouchableOpacity>

   </View>   
 

       
        {show && (
        <DateTimePicker
          locale="pt-br"
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
       {showHora && (
        <DateTimePicker
          locale="pt-br"
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeHora}
        />
      )}

   
   <TouchableOpacity  
      style={styles.botaoModal}
      onPress={add}
      >
        <Text  style={styles.textoBotaoModal}>Inserir</Text>
      </TouchableOpacity>
      </ScrollView>

        </Animatable.View>

       
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
 
  modal:{
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
  },

  textoModal:{
    color: '#FFF',
    
    marginLeft: 15,
    fontSize:25,   
  },

  input:{
    backgroundColor: '#FFF',
    borderRadius: 8,
    margin: 55,
    padding: 10,
    color: '#000',
    fontSize:15
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
data:{
  flexDirection:'row',
  justifyContent:'center',
},
});
