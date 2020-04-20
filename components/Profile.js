import React, { useState, useEffect } from 'react'
import { Text, View , StyleSheet , TextInput , TouchableOpacity , Image, TouchableHighlightBase , Alert ,Button} from 'react-native'
import * as firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons'


export default function Profile({navigation}) {
    const [imageuri,setimageuri] = useState('')

    useEffect(() => {
        isUserHaveImage()
    }, [])
    const signOut = () => {
        firebase.auth().signOut()
    }
    var user = firebase.auth().currentUser.email;
    const cam = async () =>{
        // console.log('cam1')
        let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1,
         });
        //  console.log('cam 2')
       if(!result.cancelled){
        //    console.log('true');
           uploudImage(result.uri,'test1').then(()=>{
               Alert.alert('success')
               isUserHaveImage();
           }).catch(error=>{
               Alert.alert(error)
           })
       }
   }

   const uploudImage = async (uri,imageName) =>{ 
    //    console.log('uplaod1')
       const response = await fetch(uri);
    //    console.log('uplaod2')
       const blob = await response.blob();
    //    console.log('uplaod3')
       var ref = firebase.storage().ref().child("profileImages/"+user);
    //    console.log('uplaod4')
       ref.getDownloadURL().then((d)=>{
           console.log(`download url :${d} `)
       })
    //    console.log('uplaod5')
       return ref.put(blob);
   }
   const isUserHaveImage = async () => {
    var ref = firebase.storage().ref().child("profileImages/"+user);
    
    await ref.getDownloadURL()
    .then((d) =>{
        setimageuri(d);
        // console.log(this.userImageUri);
    })
    .catch(e => {
        console.log(e.message)
    })

   }
    return (
        <View>
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                <TouchableOpacity  onPress={()=>signOut()}>                
                    <Text style={styles.logout}> logout </Text>
                </TouchableOpacity>
                </View>
                <View style ={{marginTop:64}}>
                    <Image source={{uri:imageuri}}
                    style={{width:100,height:100,alignSelf:"center",borderRadius:100/2,}}
                    /> 
                    <TouchableOpacity  onPress={()=>cam()}>
                    <Ionicons name="md-camera" style={{}} size={32} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.header }>{'username = '+ user}</Text>
                </View>

                
            </View>
            <Button title="Go to Login" onPress={() => signOut()}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logout:{
        color:'#5DADE2',
        top:20,
        right:20,
        fontWeight: 'bold',
        fontSize: 25, 
        letterSpacing: 1,
        marginLeft:50
    },
    header:{
        fontWeight:"800",
        fontSize:30,
        color:"#514E5A",
        marginTop:32
    },
  });