import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import {Modal, StyleSheet, Button, TextInput , Text, View, SafeAreaView, Alert, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../../components/List';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios'; // npm i axios
import  '../../config';
export default function Programação({navigation}) {



  
  const [strDate, setStrDate] = useState('PESQUISAR DATA');

  const [date, setDate] = useState(new Date());
  const [dataBuscar, setDataBuscar] = useState('');
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

   setDataBuscar(dateFormatted);
   setStrDate(dateFormattedBra);
   buscar(dateFormatted);
  // alert(dateFormatted);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const [lista, setLista] = useState([]);

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


  async function listarDados(){
    const res = await axios.get(api + 'listarProgramacao.php?busca=' + dataBuscar);
    setLista(res.data.result);
  //  alert(res.data.result.titulo);
    //console.log(res.data.result);
    
  }
 async function buscar(busca) {
  const res = await axios.get(api + 'listarProgramacao.php?busca=' + busca);
  if(res.data.result != '0'){
    setLista(res.data.result);
}else{
    alert('Nenhuma programação está marcada para esta data!')
}
}


  useEffect(()=>{
      getData();
      listarDados();
  },[]
  )


function mensagemDelete(id){
    if (dados.nivel === 'máximo'){
    Alert.alert(
      "Excluir Registro",
      "Deseja Excluir este Registro?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deletar(id) }
      ],
      { cancelable: true }
    );

  }
 else if (dados.nivel === 'avançado'){
    Alert.alert(
      "Excluir Registro",
      "Deseja Excluir este Registro?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deletar(id) }
      ],
      { cancelable: true }
    );
  }else{
    Alert.alert(
      "Atenção",
      "Você não pode deletar a programação",
      [
        
        { text: "TUDO BEM!" }
      ],
      { cancelable: true }
    );
   
}


async function deletar(id){
         
  const res = await axios.get(api + 'excluirProgramacao.php?id=' + id);
  listarDados();
}
  
}
    return (
      <ScrollView>
      <SafeAreaView>
      <View>
      <TouchableOpacity 
      style={ styles.buscarData}
      onPress={showDatepicker}>
      
      
       <Ionicons name="calendar" color="#000" size={25} />
        <Text>{strDate}</Text>
        <Ionicons name="search-circle" color="#000" size={25} />
      
     </TouchableOpacity>

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
    </View>
      <View>
        <FlatList
            data={lista}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
            <ListItem
                data={item}
                deletar = {()=> mensagemDelete(item.id)}
                editar = {()=> edit()}
            />
            )}
            ItemSeparatorComponent={()=><Separator/>}
            
        >

        </FlatList>
    </View>
    
  


      </SafeAreaView>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    header:{
        backgroundColor:'#50A665',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:19,
        borderBottomColor:'#FFF'
    },
    buscarData:{
      backgroundColor:'#e1e1e1',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      padding:5,

  }
   
  });
  
  const Separator = () => <View style={{flex:1, height:5, backgroundColor:'#50A665'}}></View>

    