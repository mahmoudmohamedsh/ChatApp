import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import Profile from '../components/Profile'
import React from 'react'
import { createAppContainer } from "react-navigation";

const screens = {
    Profile: {
        screen: Profile,
        
    },

}

const ProfileStack = createStackNavigator(screens);

export default createAppContainer(ProfileStack);