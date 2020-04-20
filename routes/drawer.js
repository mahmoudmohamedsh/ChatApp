import {createDrawerNavigator,DrawerItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import React from 'react'
import {ScrollView, SafeAreaView, Button, View, TouchableOpacity, Text} from 'react-native'
import ProfileStack from './ProfileStack'
import AuthStack from './AuthStack'
import * as firebase from 'firebase'

const SignOut = () => {
    firebase.auth().signOut()
}
const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AuthStack,
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: () => {
          return {
              drawerLabel: (<View style={{flexDirection: 'row'}}><Button title="SignOut" onPress={() => SignOut()} color="grey"/>
               <Text style={{fontSize: 16, marginLeft: 20}}>Profile</Text></View>)

          }
      }
        
    }
})
const NavigationDrawer = createAppContainer(RootDrawerNavigator);
export default NavigationDrawer;