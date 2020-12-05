import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
/*import { Avatar } from 'react-native-elements';*/
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

import ARScreen from './components/attendanceReport';
import AuthScreen from './components/auth';
import NotificationScreen from './components/notifications';
import Profile from './components/userProfile';

import { Stack, HomeStack } from './navigation/stacks'

import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserDetails } from './store/login';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Tabber = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={ HomeStack } />
    <Tab.Screen name="Notification" component={ NotificationScreen } />
  </Tab.Navigator>
)

const MainDrawer = () => (
  <Drawer.Navigator
    drawerStyle={ { backgroundColor: '#add8e6' } }
  >
    <Drawer.Screen name="Home" component={ Tabber } />
    <Drawer.Screen name="Attendance Report" component={ ARScreen } />
    <Drawer.Screen name="My Profile" component={ Profile } />
  </Drawer.Navigator>
)

const App = () => {

  const user = useSelector(getLoggedInUserDetails);
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator >
        { user.id ?
          //whole app
          <>
            <Stack.Screen
              name="AMMS-FOS"
              component={ MainDrawer }
              options={ ({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity
                    onPress={ () => navigation.navigate('My Profile') }
                  >
                    <Avatar.Image
                      source={ require('../images/profile2.png') }
                      style={ { marginRight: 20, marginTop: 2 } }
                      size={ 40 }
                    />
                  </TouchableOpacity>
                ),
                headerLeft: () => (
                  <Icon
                    name='menu'
                    size={ 40 }
                    containerStyle={ { marginLeft: 15, marginTop: 2 } }
                    color='#add8e6'
                    onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
                  />
                )
              })
              }
            />
          </>
          :
          //login
          // <Stack.Screen
          //   name="AuthScreen"
          //   component={ AuthScreen }

          // />
          <Stack.Screen name="AuthScreen">
            { props => (<AuthScreen { ...props } dispatch={ dispatch } />) }
          </Stack.Screen>
        }
      </Stack.Navigator>

    </NavigationContainer>

  )

}

export default App;

