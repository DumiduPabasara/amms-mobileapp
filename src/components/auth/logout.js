import React from 'react';
import { View, Text, Alert, Button } from 'react-native';


const LogOut = () => {

    return(
        <View>
            <Button
                title="Log Out"
                onPress={ () => Alert.alert('logout') }
             />
        </View>
    )
}

export default LogOut;