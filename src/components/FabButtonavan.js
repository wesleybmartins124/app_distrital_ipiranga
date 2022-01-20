import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons';


export default class FabButtonavan extends Component   {

   animation = new Animated.Value(0);
    toggleMenu = () =>{

        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation,{
            toValue,
            friction:3,
        }).start();

        this.open = !this.open;

    }
 render(){

    const pencilStyle = {
        transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -60]
                })
            }
        ]
    }

    const heartStyle = {
        transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -115]
                })
            }
        ]
    }

    const personStyle = {
        transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -170]
                })
            }
        ]
    }


    
    const quadroStyle = {
        transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -170]
                })
            }
        ]
    }


    const interStyle = {
        transform:[
            {scale: this.animation},
            {
                translateY: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -225]
                })
            }
        ]
    }



     const rotation = {
         transform:[
             {
                 rotate:this.animation.interpolate({
                     inputRange: [0,1],
                     outputRange:["0deg","45deg"]
                 })
             }
         ]
     }
  return (
    <View style={[styles.container, this.props.style]}>

<TouchableWithoutFeedback onPress={this.props.Interessados}>
         <Animated.View style={[styles.button, styles.submenu, interStyle]}>
             <Ionicons name="information-circle-outline"  size={25} color="#FFF"/>
         </Animated.View>
     </TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={this.props.NewPost}>
         <Animated.View style={[styles.button, styles.submenu, quadroStyle]}>
             <Ionicons name="easel"  size={25} color="#FFF"/>
         </Animated.View>
     </TouchableWithoutFeedback>


<TouchableWithoutFeedback onPress={this.props.oracao}>
         <Animated.View style={[styles.button, styles.submenu, heartStyle]}>
             <Ionicons name="hand-right"  size={25} color="#FFF"/>
         </Animated.View>
     </TouchableWithoutFeedback>

<TouchableWithoutFeedback  onPress={this.props.pedido}>
         <Animated.View style={[styles.button, styles.submenu, pencilStyle]}>
             <Ionicons name="today-outline"  size={25} color="#FFF"/>
         </Animated.View>
     </TouchableWithoutFeedback>

     <TouchableWithoutFeedback onPress={this.toggleMenu}>
         <Animated.View style={[styles.button, styles.menu, rotation]}>
             <AntDesign name="plus"  size={30} color="#FFF"/>
         </Animated.View>
     </TouchableWithoutFeedback>
    </View>
   );
 }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute'
    },
    button:{
        position:'absolute',
        width: 70,
        height: 70,
        borderRadius: 70/2,
        justifyContent:'center',
        alignItems:'center',
        shadowRadius:10,
        shadowColor: '#50A665',
        shadowOpacity: 0.3,
        shadowOffset:{
            height:10,
        }
    },
    menu:{
        backgroundColor:'#50A665'
    },
    submenu:{
        width: 48,
        height:48,
        borderRadius: 48/2,
        backgroundColor:'#50A665'
    }
})
