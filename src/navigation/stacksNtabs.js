import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import HomeScreen from '../components/home';
import QRScannerScreen from '../components/home/courses/qrScanner';
import NotificationScreen from '../components/notifications';
import ARScreen from '../components/attendanceReport';
import DetailedReport from '../components/attendanceReport/detailedReport';

export const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Tabber = ({ user }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
        let iconName;
        let iconStyle;

        if (route.name === 'Home') {
            iconName = 'book';
            size = 28;
            iconStyle = focused ? styles.activeTrue : styles.activeFalse;
        } else if (route.name === 'Notification') {
            iconName = focused ? 'bell' : 'bell-o';
            size = 24;
            iconStyle = focused ? styles.activeTrue : styles.activeFalse;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type='font-awesome' size={size} iconStyle={iconStyle} />;
        },
    })}
    tabBarOptions={{
        activeTintColor: '#1e90ff',
        inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen 
        name="Home" 
        component={ HomeScreen }
        options={{
            title: 'My Courses',
        }} 
    />
    <Tab.Screen 
        name="Notification" 
        options={{
            title: 'Notifications',
            tabBarBadge: 1,
          }} 
    >
        {props => (<NotificationScreen {...props} user = {user} />)}
    </Tab.Screen>
  </Tab.Navigator>
)

export const HomeStack = ({user}) => (
    <Stack.Navigator
        initialRouteName="Home_screen"
        mode="modal"
    >
        <Stack.Screen  
            options={
                {headerLeft: null},
                {headerTitle: null},
                {headerShown: false}
            } 
            name="Home_screen"  
        >
            {props => (<Tabber {...props} user = {user} />)}
        </Stack.Screen>
        <Stack.Screen 
            name="QRScanner_screen" 
            component={QRScannerScreen}
            options = {
                {headerTitle: 'Scan the QR code'}
            }
        />
    </Stack.Navigator>
)

export const ARStack = ({user}) => (
    <Stack.Navigator
        initialRouteName="AR_screen"
    >
        <Stack.Screen  
            options={
                {headerLeft: null},
                {headerTitle: null},
                {headerShown: false}
            } 
            name="AR_Screen" 
        >
            {props => (<ARScreen {...props} user = {user} />)}
        </Stack.Screen>
        <Stack.Screen 
            name="DetailedReport_Screen" 
            component={DetailedReport}
        />
    </Stack.Navigator>
)

const styles = StyleSheet.create({

    activeTrue: {
      color: '#6495ed'
    },
    activeFalse: {
        color: 'grey'
    },
  
  });