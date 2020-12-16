import React, { useEffect } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";

export default function DetailedReport( {navigation, route}) {

    const { courseCode } = route.params;
    const courseId = courseCode.toString();

    useEffect (() => {
        
        navigation.setOptions({ title: `Detailed Report for ${courseId}` })

    }, []);

    const lectures = [
    
        {
          name: 'CSC2122',
          avatar_url: '../../../images/red.jpg',
          subtitle: 'Mobile Development',
          time:'10',
          active: false
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
                            activeScale={0.95} //
                            linearGradientProps={{
                                colors: [ 'green', 'limegreen' ],
                                start: { x: 1, y: 0 },
                                end: { x: 0.2, y: 0 },
                            }}
                            //onPress = {() => this.props.navigation.navigate('DetailedReport_Screen', { courseCode: l.code } )}
                        >

                            <Text style={{ fontSize: 20}} >{l.eligible}%</Text>
                            
                            <ListItem.Content >
                                <ListItem.Title style={{ color: '#faf0e6', fontWeight: 'bold' }}>
                                    { l.code }
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ color: '#ffffe0', flex:1, flexDirection:'row' }}>
                                    { l.name }  
                                </ListItem.Subtitle>
                                
                            </ListItem.Content>
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
  
  });
