import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import ARScreen from './components/attendanceReport';
import HomeScreen from './components/home';
import AuthScreen from './components/auth';
import NotificationScreen from './components/notifications';
import LogOut from './components/auth/logout';

import { Stack, HomeStack } from './navigation/stacks'
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Tabber = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStack}/>
    <Tab.Screen name="Notification" component={NotificationScreen}/>
  </Tab.Navigator>
)

const MainDrawer = () => (
  <Drawer.Navigator 
    drawerStyle={{ backgroundColor: '#add8e6' }} 
  >
    <Drawer.Screen name="Home" component={Tabber}/>
    <Drawer.Screen name="Attendance Report" component={ARScreen}/>
    <Drawer.Screen name="Log Out" component={LogOut}/>
  </Drawer.Navigator>
)

class App extends Component {

  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          { this.props.auth.isAuth ?
            //whole app
            <>
              <Stack.Screen
                name="AMMS-FOS" 
                component={MainDrawer}
              />
            </>
            :
            //login
            <Stack.Screen
              name="AuthScreen" 
              component={AuthScreen}
            />
          }
        </Stack.Navigator>

      </NavigationContainer>

    )
  }

}

const mapStateToProps = state => ({ auth : state.auth })

export default connect(mapStateToProps)(App);

