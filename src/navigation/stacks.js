import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/home';
import QRScannerScreen from '../components/home/courses/qrScanner';

export const Stack = createStackNavigator();

export const HomeStack = () => (
    <Stack.Navigator
        initialRouteName="Home_screen"
    >
        <Stack.Screen name="Home_screen" component={HomeScreen}/>
        <Stack.Screen name="QRScanner_screen" component={QRScannerScreen}/>
    </Stack.Navigator>
)