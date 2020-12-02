import React from 'react';
import { View, Text } from 'react-native';
import LogOut from '../auth/logout';


const Profile = () => {

    return(
        <View>
            <Text>This is User Profile</Text>
            <LogOut />
        </View>
    )
}

export default Profile;