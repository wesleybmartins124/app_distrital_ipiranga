import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Home from './src/pages/Home';
import NewPost from './src/pages/NewPost';
import Programação from './src/pages/Programação';
import Pedido from './src/pages/Pedido';
import Mapa from './src/pages/Mapa';
import Login from './src/pages/Login';
import Recuperacao from './src/pages/Recuperacao';
import Avançado from './src/pages/Avançado';
import Interessados from './src/pages/Interessados';
import Intermediário from './src/pages/Intermediário';
import Básico from './src/pages/Básico';
import addProgramacao from './src/pages/add-programacao';
import oracao from './src/pages/oracao';
import Details from './src/pages/Details';
import visualizarMembros from './src/pages/visualizarMembros';
import editarMembros from './src/pages/editarMembros';
import editarInt from './src/pages/editarInt';
import editarPerfil from './src/pages/editarPerfil';
import Redefinir from './src/pages/Redefinir';
import Cadastro from './src/pages/Cadastro';
import Inserir from './src/pages/Inserir';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function Tabs() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'ios-map' : 'ios-map';
          }else if (route.name === 'Pedido') {
            iconName = focused ? 'ios-create' : 'ios-create';
          }else if (route.name === 'Programação') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#50A665',
        inactiveTintColor: 'gray',
      }}
      >  
  
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Mapa" component={Mapa} />
        <Tab.Screen name="Pedido" component={Pedido} />
        <Tab.Screen name="Programação" component={Programação} />
      </Tab.Navigator>


  );
}

function Tabs2() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'ios-map' : 'ios-map';
          }else if (route.name === 'Pedido') {
            iconName = focused ? 'ios-create' : 'ios-create';
          }else if (route.name === 'Programação') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#50A665',
        inactiveTintColor: 'gray',
      }}
      >

        <Tab.Screen name="Home" component={Avançado} />
        <Tab.Screen name="Mapa" component={Mapa} />
        <Tab.Screen name="Pedido" component={Pedido} />
        <Tab.Screen name="Programação" component={Programação} />
      </Tab.Navigator>


  );
}


function Tabs3() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'ios-map' : 'ios-map';
          }else if (route.name === 'Pedido') {
            iconName = focused ? 'ios-create' : 'ios-create';
          }else if (route.name === 'Programação') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#50A665',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={Intermediário} />
        <Tab.Screen name="Mapa" component={Mapa} />
        <Tab.Screen name="Pedido" component={Pedido} />
        <Tab.Screen name="Programação" component={Programação} />
      </Tab.Navigator>


  );
}

function Tabs4() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'ios-map' : 'ios-map';
          }else if (route.name === 'Pedido') {
            iconName = focused ? 'ios-create' : 'ios-create';
          }else if (route.name === 'Programação') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar';
          }
          

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#50A665',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={Básico} />
        <Tab.Screen name="Pedido" component={Pedido} />
        <Tab.Screen name="Programação" component={Programação} />
      </Tab.Navigator>


  );
}



export default function App() {

  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        name="Home" 
        component={Tabs}
        options={{
          title:'Distrital',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />
<Stack.Screen 
        name="Login" 
        component={Login}
        options={{headerShown: false}} />

<Stack.Screen 
        name="Details" 
        component={Details}
        options={{headerShown: false}} />

<Stack.Screen 
        name="Inserir" 
        component={Inserir}
        options={{
          title:'Inserir Interessados',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="addProgramacao" 
        component={addProgramacao}
        options={{
          title:'Inserir Programação',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="oracao" 
        component={oracao}
        options={{
          title:'Pedido de oração',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />



<Stack.Screen 
        name="visualizarMembros" 
        component={visualizarMembros}
        options={{
          title:'Membros do Distrito',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="editarMembros" 
        component={editarMembros}
        options={{
          title:'Membro:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="editarInt" 
        component={editarInt}
        options={{
          title:'Editar Interessado:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="editarPerfil" 
        component={editarPerfil}
        options={{
          title:'Editar Perfil:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="NewPost" 
        component={NewPost}
        options={{
          title:'Novo Post:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />
<Stack.Screen 
        name="Cadastro" 
        component={Cadastro}
        options={{
          title:'Cadastro',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

        
        <Stack.Screen 
        name="Avançado" 
        component={Tabs2}
        options={{
          title:'Distrital',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="Intermediário" 
        component={Tabs3}
        options={{
          title:'Distrital',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

        
<Stack.Screen 
        name="Básico" 
        component={Tabs4}
        options={{
          title:'Distrital',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        

        />

<Stack.Screen 
        name="Recuperacao" 
        component={Recuperacao}
        options={{
          title:'Segurança:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="Redefinir" 
        component={Redefinir}
        options={{
          title:'Redefinir Senha:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

<Stack.Screen 
        name="Interessados" 
        component={Interessados}
        options={{
          title:'Interessados:',
          headerStyle:{
            backgroundColor:'#50A665'
          },
          headerTintColor:'#FFF'
        }}
        
        />

        
      </Stack.Navigator>
    

      

     
    </NavigationContainer>
  );
}

