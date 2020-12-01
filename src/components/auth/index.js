import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';

const AuthScreen = () => {

    return(
        <TouchableOpacity style={styles.mainBody}>
            <View>
                <Image
                source={require('../../../images/3.png')}
                style={{
                    width: '95%',
                    height: 200,
                    resizeMode: 'contain',
                    margin: 20,
                }}
                />
            </View>
            
            <View  >
                <Input
                placeholder='Username'
                leftIcon={
                    <Icon
                    name='user-o'
                    type='font-awesome'
                    />
                }
                onChangeText={() => console.log('username entered')}
                value= 'sc10266'
                containerStyle={styles.formInput}
                />
                <Input
                placeholder='Password'
                leftIcon={
                    <Icon
                    name='key'
                    type='font-awesome'
                    />
                }
                onChangeText={() => console.log('username entered')}
                value='12345678'
                secureTextEntry
                containerStyle={styles.formInput}
                />
                <View style={styles.formButton}>
                <Button
                    onPress={ () => console.log('handleLogin()') }
                    title='Login'
                    color='#1e90ff'
                />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'yellow',
    },
    formInput: {
      margin: 15,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    formButton: {
      margin: 10
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e0ffff',
        alignContent: 'center',
    },
    
  });
  

export default AuthScreen;