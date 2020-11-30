import React from 'react';
import { ScrollView, Text, Button } from 'react-native';


const Courses = ({ navigation }) => {

    return(
        <ScrollView>
            <Text>Your Courses</Text>
            <Button
                title="Course 1"
                onPress={()=> navigation.navigate('QRScanner_screen')}
            />
            <Button
                title="Course 2"
                onPress={()=> navigation.navigate('QRScanner_screen')}
            />
            <Button
                title="Course 3"
                onPress={()=> navigation.navigate('QRScanner_screen')}
            />
            <Button
                title="Course 4"
                onPress={()=> navigation.navigate('QRScanner_screen')}
            />
        </ScrollView>
    )
}

export default Courses;