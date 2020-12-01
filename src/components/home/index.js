import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Courses from './courses';

const HomeScreen = ({navigation}) => {

    return(
        <View style={styles.mainBody}>
            <Card>
                <Card.FeaturedTitle style={{ color: '#1e90ff' }}>Hello sc/2017/10266 Pabasara</Card.FeaturedTitle>
            </Card>
            <Courses navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({

    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e0ffff',
        alignContent: 'center',
    },
    
});

export default HomeScreen;