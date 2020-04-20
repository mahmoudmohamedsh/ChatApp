import React, { useState } from 'react'
import { Text, View , StyleSheet , TextInput , TouchableOpacity , Image, TouchableHighlightBase , Alert } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
// import {ImagePicker} from 'expo'
import * as firebase from 'firebase'
import Api from '../constants/ApiKeys'
import * as ImagePicker from 'expo-image-picker';

export default function Home({navigation}) {
    
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')

    if(!firebase.apps.length){
        firebase.initializeApp(Api.firebaseConfig)
    }
    
    const OnLoginPress = () => {
        console.log('in login function')
        
        firebase.auth().signInWithEmailAndPassword(name,password)
        .then(() => {
            console.log('true')
            
            }, (error) => {

                if (name == '' && password == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                }
                }

            )
    }
    return (
        // <View>
        //     <Text>This is Home</Text>
        //     <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')}/>
        // </View>
        <View style={styles.container}>
                <View style ={styles.circle}/>
                <View style ={styles.circle2}/>

                <View style ={{marginTop:64}}>
                    <Image source={require('../assets/chat.png') }
                    style={{width:100,height:100,alignSelf:"center",borderRadius:100/2,}}
                    /> 
                </View>
                
                <View style={{marginHorizontal:32}}>
                    <Text style={styles.header }>User Name</Text>
                    <TextInput style={styles.input} 
                    splaceholder="user name" 
                    onChangeText={(text) => {setname(text)}}
                    value={name}/>  

                    <Text style={styles.header }>password</Text>
                    <TextInput style={styles.input} 
                    splaceholder="user name" 
                    onChangeText={(text) => {setpassword(text)}}
                    value={password}
                    secureTextEntry={true}/>  

                    <View style={{alignItems:"flex-end",marginTop:64}} >
                        <TouchableOpacity style={styles.continue} onPress={()=>OnLoginPress()}>
                            <Ionicons name="md-arrow-round-forward"  size={24} color="#FFF"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F7',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle:{
        width:400,
        height:400,
        borderRadius:400/2,
        backgroundColor:"#FFF",
        position:"absolute",
        left:-120,
        top:-20
    },
    circle2:{
        width:200,
        height:200,
        borderRadius:200/2,
        backgroundColor:"#FFF",
        position:"absolute",
        left:200,
        top:300
    },
    header:{
        fontWeight:"800",
        fontSize:30,
        color:"#514E5A",
        marginTop:32
    },
    input:{
        marginTop:30,
        height:50,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:"#BAB7C3",
        borderRadius:30,
        borderWidth:3,
        paddingHorizontal:16,
        color:"#514E5A",
        fontweight:"600",
        backgroundColor:"#F4F5F7"

    },
    continue:{
        width:70,
        height:70,
        borderRadius:70/2,
        backgroundColor:"#9075E3",
        alignItems:"center",
        justifyContent:"center"
    }
  });
  