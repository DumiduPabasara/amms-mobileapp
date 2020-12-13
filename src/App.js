import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Icon } from 'react-native-elements';
/*import { Avatar } from 'react-native-elements';*/
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

import ARScreen from './components/attendanceReport';
import AuthScreen from './components/auth';
import NotificationScreen from './components/notifications';
import HomeScreen from './components/home';
import Profile from './components/userProfile';

import { Stack, HomeStack } from './navigation/stacksNtabs'

import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUserDetails } from './store/login';

const Drawer = createDrawerNavigator();

const MainDrawer = ({user}) => (
  <Drawer.Navigator
    drawerStyle={ { backgroundColor: '#add8e6' } }
  >
    <Drawer.Screen name="Home" component={ HomeStack } />
    <Drawer.Screen name="Attendance Report">
      {props => (<ARScreen {...props} user = {user} />)}
    </Drawer.Screen>
    <Drawer.Screen name="My Profile" component={ Profile } />
  </Drawer.Navigator>
)

const App = () => {

  const user = useSelector(getLoggedInUserDetails);
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home_screen"
      >
        { user.id ?
          //whole app
          <>
            <Stack.Screen
              name="AMMS-FOS"
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
            >
              { props => (<MainDrawer {...props} user={user} />) }
            </Stack.Screen>
          </>
          :
          //login
          <Stack.Screen name="AuthScreen">
            { props => (<AuthScreen { ...props } dispatch={ dispatch } />) }
          </Stack.Screen>
        }
      </Stack.Navigator>

    </NavigationContainer>

  )

}

export default App;

