import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { ListItem, Avatar, Card} from 'react-native-elements'

/*const list = [
    {
      name: 'CSC1111',
      avatar_url: '../../../images/green.jpg',
      subtitle: 'Programming',
      time:'8-10 AM'
    },
    {
      name: 'CSC2122',
      avatar_url: '../../../images/red.jpg',
      subtitle: 'Mobile Development',
      time:'10-12 AM'
    },
    
  ];*/


const Courses = ({ navigation }) => {

    return(
        <ScrollView>
            <Card>
                <Card.FeaturedSubtitle style={{ color: '#1e90ff', justifyContent: 'center' }}>Your Courses</Card.FeaturedSubtitle>
                <Card.Divider/>
                {
                    /*list.map((l, i) => (*/}
                    <ListItem 
                        bottomDivider
                        onPress={()=> navigation.navigate('QRScanner_screen')}
                    >
                        <Avatar 
                            size={50}
                            overlayContainerStyle={{backgroundColor: 'green'}}
                            rounded title='8' 
                            activeOpacity={0.7}
                        />
                        <ListItem.Content>
                            <ListItem.Title>CSC1111</ListItem.Title>
                            <ListItem.Subtitle>Programming</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem 
                    bottomDivider
                    onPress={()=> navigation.navigate('QRScanner_screen')}
                >
                    <Avatar 
                        size={50}
                        overlayContainerStyle={{backgroundColor: 'red'}}
                        rounded title='10' 
                        activeOpacity={0.7}
                    />
                    <ListItem.Content>
                        <ListItem.Title>CSC1133</ListItem.Title>
                        <ListItem.Subtitle>Mobile Development</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                   {/* ))*/
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

export default Courses;

