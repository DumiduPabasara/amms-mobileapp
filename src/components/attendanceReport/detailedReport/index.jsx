import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { View } from 'react-native-animatable';
import { isMarked } from '../../common/scripts';
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../../../api';

export default function DetailedReport( {navigation, route}) {

    const { courseCode, userId } = route.params;
    const courseId = courseCode.toString();

    const [attendanceData, setAttendnceData] = useState([]);
    const [courseData, setCourseData] = useState('');

    useEffect (() => {
        
        navigation.setOptions({ title: `Detailed Report for ${courseId}` });

        const fetchCourseData = async () => {

            try {

                const { data } = await axios.get(`${baseUrl}/api/courses/${courseCode}`);

                const course = {
                    id: data._id,
                };

                setCourseData(data);

                fetchAttendanceData(course);

            } catch (err) {
                console.error(err.message);
                return false;
            }

        };

        const fetchAttendanceData = async (course) => {

            const attendance = [];
            try {

                const { data } = await axios.get(
                    `${baseUrl}/api/attendance/${userId}/${course.id}`
                );

                attendance.push(data);
                
                //console.log(data);
                setAttendnceData(...attendanceData, attendance);
                
            } catch (err) {
                console.error(err.message);
                return false;
            }
        }

        console.log(fetchCourseData());
        fetchCourseData();                  

    }, [courseCode,userId]);

    

    /*const lectures = [
    
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
        
    ]*/

    const chooseDay = (day) => {
       return moment(day, 'YYYY:MM:DD HH:mm:ss').format('MMM Do')
    }

    const chooseTime = (time) => {
       return moment(time, 'YYYY:MM:DD HH:mm:ss').format('h:mm a')
    }

    return (
    
        <LinearGradient
            colors={["#e0ffff", "#63a8e6"]}
            start={[0.1, 0.1]}
            style={styles.mainBody}
        >
            <View>{console.log(attendanceData)}</View>
            { attendanceData && courseData ?
                <ScrollView>
                {
                    courseData.map((l, index) => (
                        <ListItem
                            key={l._id}
                            bottomDivider
                            linearGradientProps={{
                                colors: isMarked(l.student, l.course) ? ['#adff2f','#32cd32'] : ['#f08080','#dc143c'],
                                start: { x: 1, y: 0 },
                                end: { x: 0.2, y: 0 },
                            }}
                            //onPress = {() => this.props.navigation.navigate('DetailedReport_Screen', { courseCode: l.code } )}
                        >
                            
                            <ListItem.Content >
                                <ListItem.Title style={{ color: '#faf0e6', fontWeight: 'bold' }}>
                                    Lecture 1
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ color: '#ffffe0', flex:1, flexDirection:'row' }}>
                                    Introduction 
                                </ListItem.Subtitle>  
                            </ListItem.Content>
                            <View>
                                <Text style={styles.timeStyle}>{chooseDay(l.timestamp)}</Text>
                                <Text style={styles.timeStyle}>{chooseTime(l.timestamp)}</Text>
                            </View>
                        </ListItem>
                    ))
                }
                </ScrollView>
            
            :

                <View>
                    <Text>No Records Available Yet !</Text>
                </View>
            
            }
            
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
