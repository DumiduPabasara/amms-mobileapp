import React from 'react';
import { View, Text } from 'react-native';
import AbsentLectures from './absentLectures'


const NotificationScreen = () => {

    return(
        <View>
            <Text>This is Notification Screen</Text>
            <AbsentLectures />
        </View>
    )
}

export default NotificationScreen;