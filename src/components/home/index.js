import React from 'react';
import { View, Text } from 'react-native';
import Courses from './courses';

const HomeScreen = ({navigation}) => {

    return(
        <View>
            <Text>Hello sc/2017/10266 Pabasara</Text>
            <Courses navigation={navigation}/>
        </View>
    )
}

export default HomeScreen;