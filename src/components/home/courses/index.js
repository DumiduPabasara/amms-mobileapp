import React from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Card} from 'react-native-elements';

const Courses = ({ navigation }) => {

    const list = [
        {
          name: 'CSC1111',
          avatar_url: '../../../images/green.jpg',
          subtitle: 'Programming',
          time:'8',
          active: true
        },
        {
          name: 'CSC2122',
          avatar_url: '../../../images/red.jpg',
          subtitle: 'Mobile Development',
          time:'10',
          active: false
        },
        
      ]

    return(
        <ScrollView>
            <Card>
                <Card.FeaturedSubtitle style={{ color: '#1e90ff', justifyContent: 'center' }}>Your Courses</Card.FeaturedSubtitle>
                <Card.Divider/>
                {
                    list.map((l) => (
                    <ListItem 
                        key={l.name}
                        bottomDivider
                        onPress={l.active ? ()=> navigation.navigate('QRScanner_screen') : () => Alert.alert('Course did not started yet')}
                    >
                        <Avatar 
                            size={50}
                            overlayContainerStyle= { l.active ? styles.activeTrue : styles.activeFalse}
                            rounded title={l.time}
                            activeOpacity={0.7}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                   ))
                }
            </Card>
        </ScrollView>
    )
}


/*const Courses = ({ navigation }) => {

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
}*/

const styles = StyleSheet.create({

    activeTrue: {
        backgroundColor: 'green'
    },
    activeFalse: {
        backgroundColor: 'red'
    },
    
});

export default Courses;

