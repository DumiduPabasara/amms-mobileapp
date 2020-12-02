import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import LogOut from '../auth/logout';
import { Card } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';


const Profile = () => {

    const users = {
        id: 'sc10266',
        firstName: 'SC/2017/10266',
        username: 'Pabasara',
        cityOrTown: 'Galle',
        country: 'Sri lanka',
        role: 'student',
        password: '12345678',
        courses: ['CSC2233', 'CSC2263', 'CSC2272']
      }

    return(
        <ScrollView >
            <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
                <Card 
                    containerStyle={{ backgroundColor: '#e0ffff'}}
                >
                    <Avatar.Image
                        source={require('../../../images/profile2.png')}
                        size={210}
                        style={{ alignSelf: 'center', margin: 10 }}
                    /> 
                    <Card.Divider/>
                    <Text style={{ flexDirection: 'row', flex: 1, margin: 10, fontWeight: "bold", fontSize: 20 }}>My sc number : </Text>
                    <Text style={{ flexDirection: 'row', flex: 2, marginLeft: 10, color: 'black'}}>{users.firstName} </Text>

                    <Text style={{margin: 10, fontWeight: "bold", fontSize: 20 }}>My username : </Text>
                    <Text style={{marginLeft: 10}}>{users.username} </Text>  

                    <Text style={{margin: 10, fontWeight: "bold", fontSize: 20 }}>My role : </Text>
                    <Text style={{marginLeft: 10}}>{users.role} </Text>  

                    <Text style={{margin: 10, fontWeight: "bold", fontSize: 20 }}>I'm from : </Text>
                    <Text style={{marginLeft: 10, marginBottom: 10}}>{users.cityOrTown}, {users.country} </Text> 

                    <Card.Divider/> 
                    <Animatable.View animation="bounce" duration={1000} delay={1000}>
                        <LogOut />
                    </Animatable.View>     
                </Card>
            </Animatable.View>
            
         </ScrollView>
            
        
    )
}

export default Profile;