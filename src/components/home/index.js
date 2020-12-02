import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Courses from './courses';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({navigation}) => {

    const stu = { id:'sc/2017/10266', name: 'Pabasara'}

    return(
        <View style={styles.mainBody}>
            <Animatable.View animation="slideInDown" duration={1500} delay={500}>
                <Card>
                    <Card.FeaturedTitle style={{ color: '#1e90ff' }}>Hello {stu.id} {stu.name}</Card.FeaturedTitle>
                </Card>
            </Animatable.View>
            <Animatable.View animation="lightSpeedIn" duration={1500} delay={900}>
                <Courses navigation={navigation}/>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainBody: {
        flex: 1,
        backgroundColor: '#e0ffff',
        alignContent: 'center',
    },
    
});

export default HomeScreen;