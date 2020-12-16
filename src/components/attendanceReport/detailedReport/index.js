import React, { useEffect } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { View } from 'react-native-animatable';

export default function DetailedReport( {navigation, route}) {

    const { courseCode } = route.params;
    const courseId = courseCode.toString();

    useEffect (() => {
        
        navigation.setOptions({ title: `Detailed Report for ${courseId}` })

    }, []);

    const lectures = [
    
        {
          name: 'Lecture 1',
          subtitle: 'Introduction to Programming Languages',
          time:'10.00',
          day: 'Nov 22',
          marked: false
        },

        {
            name: 'Lecture 2',
            subtitle: 'OOP in php',
            time:'10.02',
            day: 'Nov 30',
            marked: true
          },
        
      ]


    return (
        <LinearGradient
            colors={["#e0ffff", "#63a8e6"]}
            start={[0.1, 0.1]}
            style={styles.mainBody}
        >
            <ScrollView>
            {
                    lectures.map((l) => (
                        <ListItem
                            key={l.name}
                            bottomDivider
                            linearGradientProps={{
                                colors: l.marked ? ['#adff2f','#32cd32'] : ['#f08080','#dc143c'],
                                start: { x: 1, y: 0 },
                                end: { x: 0.2, y: 0 },
                            }}
                            //onPress = {() => this.props.navigation.navigate('DetailedReport_Screen', { courseCode: l.code } )}
                        >
                            
                            <ListItem.Content >
                                <ListItem.Title style={{ color: '#faf0e6', fontWeight: 'bold' }}>
                                    { l.name }
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ color: '#ffffe0', flex:1, flexDirection:'row' }}>
                                    { l.subtitle }  
                                </ListItem.Subtitle>  
                            </ListItem.Content>
                            <View>
                                <Text style={styles.timeStyle}>{l.time}</Text>
                                <Text style={styles.timeStyle}>{l.day}</Text>
                            </View>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    mainBody: {
      flex: 1,
      alignContent: 'center',
    },
    timeStyle: {
        fontSize: 20,
        color: '#005e5e',
        textAlign: 'center',
        justifyContent: 'center'
      },
  
  });
