import React, { useState } from 'react';
import Navigator from './routes/homeStack'
import * as firebase from 'firebase'
import { View , Text, TouchableWithoutFeedback} from 'react-native';
import Profile from './routes/ProfileStack';
import Api from './constants/ApiKeys'
export default function App() {
  if(!firebase.apps.length){
    firebase.initializeApp(Api.firebaseConfig)
}
  firebase.auth().onAuthStateChanged(function (user) {
    setIsAuthenticated(!!user)
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <TouchableWithoutFeedback>
    {(isAuthenticated) ? <Profile /> : <Navigator />}
  </TouchableWithoutFeedback>
  );
}


